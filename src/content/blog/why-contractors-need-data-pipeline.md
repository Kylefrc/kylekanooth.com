---
title: "Why Every Contractor Needs a Data Pipeline"
description: "Most contractors are sitting on data that could run their business better — it's all trapped in their field management software. Here's what we found when we started actually looking: $0 invoices on completed jobs, $30K+ in stale estimates, and compliance gaps that would have cost us rebates."
date: 2025-03-20
readTime: "7 min read"
tags: ["data", "contractors", "servicetitan", "business"]
---

If you run a contracting business — HVAC, plumbing, electrical, it doesn't matter — you probably use some kind of field service management software. ServiceTitan, Jobber, Housecall Pro, something. You use it to dispatch techs, write estimates, generate invoices, and collect payment. And at the end of every day, you close your laptop and assume the data is fine.

It's not fine. I promise you it's not fine.

### What we found when we actually looked

When I first connected an automated audit to our ServiceTitan data, I expected to find a few small issues. What I found instead:

- $0 invoices on three completed jobs in the previous 30 days. The tech marked the job done. Nobody generated an invoice. The customer never got billed.
- $31,400 in estimates sitting in "pending" status for more than 90 days. Some of those customers had already hired someone else. We had no idea.
- Four jobs that closed without the required utility rebate compliance photos. Each of those jobs was eligible for $1,200–$2,400 in rebates. Without the photos, we couldn't submit.
- Two jobs where the invoice line items didn't match the estimate — equipment substitutions made in the field that never got properly documented.

None of this was fraud. It was just the normal chaos of running a field operation where people are busy, distracted, and doing five things at once. The data existed — it was all in ServiceTitan — but nobody was looking at it systematically.

### What a data pipeline actually is

I want to be direct here because "data pipeline" sounds like enterprise tech that costs $50k and takes six months to implement. That's not what I'm talking about.

At the simplest level, a data pipeline for a contractor is just: pull your data every night, check it against a list of rules, and tell someone when something's wrong. The rules look like: every job that's marked "complete" should have a non-zero invoice. Every estimate older than 60 days with no activity should be flagged for follow-up. Every job type that requires compliance photos should have at least one photo attached before it can be invoiced.

You can start with three rules and a daily email. That's a data pipeline. It doesn't need to be complicated.

### Revenue attribution: who's actually selling?

The second thing a pipeline gives you is attribution — connecting revenue to the people and activities that generated it. Which technician's jobs have the highest close rate on same-day adds? Which lead source produces customers with the highest lifetime value? Which estimator's proposals convert at the highest rate?

Most contractors answer these questions by feel. "Dave's our best upseller." Maybe. Or maybe Dave works the neighborhoods with higher household income and his numbers look good because of geography, not skill. The data knows. You just have to look at it.

### Starting point

If you're using ServiceTitan, you have a REST API available. If you're using Jobber, same. Most modern FSM platforms expose their data. You don't need an engineer — you need someone willing to spend a weekend learning the API and writing a few hundred lines of Python. The checks I described above took me about two days to build initially. The return on those two days has been significant.

If you'd rather have help setting it up than do it yourself, that's exactly the kind of thing I consult on. But even if you never call me, look at your data. There's something in there you're missing.
