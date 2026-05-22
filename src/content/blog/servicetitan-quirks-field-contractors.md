---
title: "ServiceTitan API Quirks Field Contractors Should Know"
description: "I built automated QC on top of the ServiceTitan API and hit every sharp edge twice. Here are the specific gotchas — business unit filtering, custom fields, invoice timing, estimate-to-job linkage — that the docs don't warn you about."
date: 2026-05-04
readTime: "6 min read"
tags: ["servicetitan", "contracting", "api"]
---

I've been running automated QC against the ServiceTitan API for a couple of years. Nightly jobs, audit checks, report pulls. The API works — it's a real REST API with decent coverage. But it has quirks that will burn you if you don't know about them, and most of them aren't in the documentation.

These are the ones I hit most often, written for field contractors who are building on top of ST for the first time.

### Business unit filtering is not automatic

If your tenant has multiple business units, most API endpoints do not automatically filter to your tenant's active BUs. You have to pass the `businessUnitIds` parameter explicitly, or you'll get back records from across the entire tenant structure — including BUs that may be inactive or that you don't operate out of.

This matters more than it sounds. If you're pulling jobs to run QC checks, and your query doesn't filter by BU, you may be running your checks against jobs from divisions that have different compliance requirements, different custom field schemas, or different invoice workflows. Your check logic will either produce false positives or silently miss real problems.

The fix is simple: maintain a list of the BU IDs you care about, pass them in every relevant query, and document why. When ST adds a new BU for your tenant — say you spin up a new trade division — remember to add the new ID to your list.

### Custom field IDs are environment-specific

ServiceTitan custom fields are configured per-tenant and the IDs are not stable across environments. Your sandbox tenant and your production tenant will have different custom field IDs for the same named field, even if the fields were created identically.

This means any code that references a custom field by ID will break when you move it from dev to prod. The right pattern is to query the custom field definitions at startup and build a map from field name to field ID, then reference fields by name in your business logic.

There's a secondary issue: custom field value schemas differ by field type in ways the API docs understate. A dropdown custom field returns a value that is the option label, not the option ID. A free-text field returns a string. A date field returns an ISO 8601 string. A checkbox field can return a boolean or a string depending on how old the field configuration is. You have to test each field type you're relying on to know what you'll actually get back.

### Invoice timing lags job completion

When a tech marks a job complete in the mobile app, the job status in the API updates quickly — typically within a few minutes. But the invoice record may not be fully updated for 15–30 minutes, sometimes longer if there's a sync queue backed up.

If you're running QC checks that look for $0 invoices as a red flag (which is a real and common issue — jobs that close without revenue being posted), you need to add a buffer. A check that runs immediately after job completion will produce false positives for invoice value. The pattern I use: pull jobs that completed more than 60 minutes ago but have not yet been flagged. That window catches the real $0 issues without noise from jobs where the invoice is just in-flight.

The flip side: don't assume an invoice you saw 6 hours ago is final. Invoices can be edited, voided, and re-created. If your QC logic archives the invoice state when it first checks, you may be looking at stale data. Either re-pull at check time or cache with a short TTL.

### Estimate-to-job linkage is not always clean

In a typical ServiceTitan workflow, an estimate is created, approved, and then converted to a job. The job record has a field for the originating estimate ID. This seems clean until you hit the edge cases:

**Multi-estimate jobs.** A job that required a revised estimate before approval may have multiple estimates in the "approved" state. The job's primary estimate pointer may or may not reflect the estimate the customer actually signed.

**Manually created jobs.** If a dispatcher creates a job directly without going through the estimate workflow, the estimate link is null. Any logic that assumes a job has an estimate will fail silently here.

**Estimate status after job creation.** After a job is created from an estimate, the estimate status doesn't always immediately update to "converted." There's a delay, and there are edge cases where it stays in a transitional state. If you're syncing estimate statuses, you need to reconcile against job records rather than trusting the estimate status alone.

**Multi-location estimates.** For larger jobs with work at multiple locations under one customer, the estimate-to-job model gets complicated fast. ServiceTitan's data model supports this, but the linkage fields are not always populated consistently.

The practical upshot: don't treat estimate-job linkage as a reliable FK relationship. Treat it as a hint, and build your QC logic to handle the null case gracefully.

### The `pageSize` default is too small for real pulls

Most list endpoints default to a page size of 50 and max out at 500. If you're pulling all jobs for a date range and you have more than 500 that day — which happens on large tenants with multiple BUs — you'll silently miss records if you're not paginating. The API returns a `hasMore` flag and a `page` cursor. Use them.

The issue I've seen in home-rolled integrations: someone writes a "pull today's jobs" query, tests it on a day with 30 jobs, it works fine, and then it silently misses jobs on busy days with 600+. The test data didn't surface the bug. Build pagination in from the start, not as an afterthought.

### Status codes are sometimes wrong

ServiceTitan occasionally returns a 200 with an error message in the response body instead of a proper 4xx. This is not common, but it happens on certain endpoints when you pass an invalid filter combination. A bare `response.ok` check will pass and your code will try to parse the error message as a job list.

Always check both the HTTP status and the response body shape. If the response doesn't have the fields you expect, treat it as an error regardless of status code.

### Rate limits are real but undocumented

The ServiceTitan API has rate limits. They're not publicly documented in a way that gives you specific numbers. What I've found in practice: if you're running parallel requests at scale — say pulling custom field values for 500 jobs in parallel — you will hit 429s. The headers include retry-after guidance when this happens, but the limit thresholds appear to vary by tenant tier.

For overnight batch jobs, the safe pattern is sequential or low-concurrency (2–3 parallel requests max) with exponential backoff on 429. This runs slower but doesn't randomly fail. For real-time automation where latency matters, you'll need to tune and test against your specific tenant's limits.

### Last thing

None of these are blocking issues. The ServiceTitan API is usable and well-structured compared to a lot of field service software. But if you're building something that runs unattended overnight and you don't know these quirks, you'll spend debugging time you didn't budget for. Hit them in development, not production.
