---
title: "MCP Changed How I Build"
description: "Model Context Protocol turned my overnight automation from a pile of custom API integrations into something modular and fast to extend. Here's what that shift looks like in practice — ServiceTitan QC, Firecrawl research, Dialpad SMS — and where it still breaks down."
date: 2026-05-11
readTime: "7 min read"
tags: ["ai", "automation", "claude"]
---

Before MCP, building a tool that touched multiple external systems meant writing a custom integration for each one. You'd have a Python module for ServiceTitan, a separate one for Snugg Pro exports, maybe a wrapper around the Dialpad REST API, and glue code holding it all together. It worked, but every new data source was another maintenance burden. When one API changed a response schema, you found out at 2am when the overnight job threw an unhandled exception.

MCP — Model Context Protocol — changed the structure of how I build. Not by making things easier in a vague way, but by making the tool layer composable and by letting the model be the orchestrator instead of me writing brittle routing logic by hand.

Here's what that looks like in practice on the work I actually run.

### ServiceTitan MCP for overnight QC

The ServiceTitan QC audit was my first real automation — a nightly job that checks whether jobs closed with the right attachments, invoice values, and custom field completions. The original version was pure Python, hitting the ServiceTitan REST API directly, parsing JSON, writing conditionals for every check I cared about.

When I rebuilt it on top of the ServiceTitan MCP server, the shape of the code changed. Instead of writing `get_jobs()` → filter → `get_invoices(job_id)` → check → `get_custom_fields(job_id)` → check → format alert, the model handles the orchestration. I describe what I want checked, the MCP server exposes the tools, and the model figures out the sequence of calls.

The practical difference: adding a new QC check used to mean writing new API calls, handling pagination, handling errors, and updating the alert formatter. Now it means describing the new rule. The MCP layer handles the data access.

Where it still breaks down with ServiceTitan specifically: custom fields. ServiceTitan's custom field structure is not clean — field IDs change between environments, the value schema depends on field type in non-obvious ways, and some field types return nulls in ways that look like missing data but aren't. MCP doesn't abstract this away. You still need to know the specific quirks of what you're querying. The model is only as good as the tool layer beneath it.

### Firecrawl MCP for research tasks

A concrete example: I needed to understand current ETO (Energy Trust of Oregon) rebate structures for heat pumps — what equipment qualifies, what the customer-facing amounts are, which tiers apply to which efficiency ratings. The ETO website is a documentation pile. It changes. Parsing it by hand every time a rebate program updates was the old way.

With Firecrawl MCP, the workflow is: point the tool at the relevant ETO pages, extract the structured content, feed it into a prompt that asks for a summary in the format I actually use when talking to homeowners. Done in a few minutes instead of an hour of reading and reformatting.

The limitation here is real: Firecrawl extracts what's on the page at the time you run it. If ETO updates their rebate tables and you don't re-run the extraction, you're working off stale data. This isn't an MCP problem — it's a fundamental property of web scraping. But it means Firecrawl-sourced research needs a freshness timestamp and a re-run cadence if the data matters for decisions.

Where Firecrawl shines: research that feeds internal documents, not customer-facing quotes. I use it for competitive research, technical documentation lookups, program requirement summaries. Not for real-time pricing or incentive amounts that go directly into a proposal.

### Dialpad MCP for SMS dispatch

This one is more operational. I run a small team, and sometimes the fastest way to get a message to a tech in the field is a text. The Dialpad MCP exposes sending capability, so I can trigger an SMS from an automation flow rather than switching to the Dialpad app and doing it manually.

Practical use: when the overnight QC audit finds a flagged job, instead of just emailing me, the flow can send a direct text to the tech who ran the job — "Hey, [job address] is missing the blower door attachment. Can you upload before 8am?" That closes the loop faster than an email that might sit until morning review.

The constraint: Dialpad MCP send is fire-and-forget at the automation level. There's no native two-way threading in the automation flow — you can send, but you're not parsing the reply unless you build separate webhook handling. For dispatch confirmations that need a response, you still need a human in the loop or a more complex webhook setup.

### The pattern that actually changed

The real shift isn't any specific MCP server. It's that the model can now act as the routing layer between tools, which means I don't have to write that routing by hand. 

The old pattern: write a Python script that hardcodes the sequence of API calls, handles every error case explicitly, and breaks when any upstream schema changes.

The new pattern: define tools via MCP servers, describe the task to the model, let the model sequence the tool calls, and handle exceptions at the tool-server layer rather than in the orchestration script.

This is faster to build the first time and much faster to extend. The downside is observability — when something goes wrong in a model-orchestrated flow, the failure point is sometimes less obvious than in explicit sequential code. I've had flows where the model called the right tool in the wrong order and got a technically valid but semantically wrong result. Explicit logging at the MCP tool call level is not optional if you're running this in production overnight.

### What doesn't work yet

A few things I've run into:

**Tool discovery is still manual.** MCP servers expose a list of tools, but figuring out which tools you actually need for a task still requires you to read the tool definitions and understand what they do. There's no "what can this server do for my use case" interface that works reliably.

**Multi-server state is tricky.** When a task spans multiple MCP servers — ServiceTitan data feeding a Firecrawl research lookup feeding a Dialpad notification — the shared state lives in the model's context window. For short tasks that's fine. For long-running workflows where context could drift or expire, you need explicit state management outside the model.

**Error recovery is immature.** If a tool call fails mid-flow, the model's retry behavior is not always predictable. You want the flow to stop and surface the error, not silently degrade or retry infinitely. This is solvable with explicit system prompt instructions, but it's not the default.

### The honest assessment

MCP made my overnight builds faster to write and easier to extend. It did not make them simpler to debug or eliminate the need to understand the underlying APIs. The abstraction is at the orchestration layer, not the data layer. If you don't know how ServiceTitan custom fields work, an MCP server doesn't protect you from the quirks — it just means the quirks surface at a different level of the stack.

But for someone who already knows the domain and wants to move faster building on top of it, it's been the most useful structural change to how I work in the last year.
