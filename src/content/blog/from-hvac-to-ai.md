---
title: "From HVAC to AI"
description: "I spent years in the HVAC and energy efficiency world before I wrote a line of production code. Here's how ServiceTitan data problems led me to build automated QC audits, how energy auditing led to SnuggSpec, and how I became a software builder by doing the thing I hated doing manually."
date: 2025-04-10
readTime: "5 min read"
tags: ["career", "hvac", "servicetitan", "automation"]
---

I didn't start as a builder. I started as a guy selling heat pumps and talking homeowners through Manual J load calculations. I work at Resilient Retrofits in Portland — energy efficiency consulting, home performance contracting, the whole EFH program. Vans, techs, dispatch, real field work. The software I cared about was ServiceTitan, because ServiceTitan was where the money lived.

And ServiceTitan had problems. Not with the software — with the data. Jobs would close with $0 revenue. Estimates would sit in "pending" for six months and nobody would notice until we ran a quarterly review and found $30,000 in stale proposals that had silently died. Technicians would finish a job without uploading the required compliance photos and the job would pass through dispatch, invoicing, and collections without anyone flagging it.

### The first automation

The first thing I built wasn't elegant. It was a Python script that hit the ServiceTitan API every night, pulled every job that closed that day, and checked three things: did it have a non-zero invoice, did it have the required custom field values, and did it have at least one photo attachment. If any of those failed, it emailed me. That was it.

That script found a problem the first week it ran. A tech had marked a job complete without attaching the blower door test results — results we needed for a utility rebate worth $1,800. We caught it in time. I've been writing automation scripts ever since.

### How energy auditing led to SnuggSpec

When I moved into energy auditing, I learned that auditors spend an unreasonable amount of time copying numbers between systems. A full home energy audit generates a lot of data — blower door results, insulation R-values, HVAC equipment specs, window types, duct leakage numbers — and all of it needs to end up in SNUGG Pro, the modeling software we use to generate the energy report. Most auditors do this by hand. It takes hours.

SnuggSpec started as a question: what if the job data from ServiceTitan could flow directly into SNUGG Pro, validated against BPI standards, with a human review step before the push? That's still what it is. It's not finished yet, but the auditors I've demoed it to are interested — which is the only market signal that matters at this stage.

### The pattern

Looking back, every tool I've built started with something I hated doing manually. The QC script because I hated finding errors in quarterly reviews. SnuggSpec because I hated watching auditors retype numbers. The overnight build system because I hated losing evenings to tasks that could run while I slept. If you run a service business and you find yourself doing the same annoying thing every week, that's your roadmap.
