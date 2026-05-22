---
title: "Building an Overnight AI Automation System"
description: "How I built a lane-based system using Claude Code scheduled tasks that runs 14 automated jobs while I sleep — business health checks, revenue analysis, code builds across four projects, and a morning briefing waiting when I wake up."
date: 2025-05-15
readTime: "6 min read"
tags: ["automation", "ai", "claude", "productivity"]
---

The idea was simple: I sell energy retrofits during the day and build software at night. There are only so many nights. So I started asking — what if the building happened while I slept?

The first version was embarrassing. I set up Claude Code as a background agent with a cron job and went to bed feeling clever. I woke up to silence. The agent had hit a file permission error at 2am, printed a stack trace to a log nobody was watching, and stopped. Four hours of potential build time, gone. That failure taught me the most important rule of overnight automation: **silent failure is the only failure that matters.**

### The v2 architecture: lanes

I rebuilt around a concept I call lanes. Each lane is a category of work — Lane 1 is business health (ServiceTitan QC, invoice checks, revenue pulls), Lane 2 is research (Firecrawl scraping competitor sites, energy policy trackers, market feeds), Lane 3 is code builds across my four active projects. Each lane runs as a foreground agent with explicit success/failure reporting. If a lane fails, the morning briefing says so — loudly.

The morning briefing is the real product. By 6am I have a digest: which jobs ran, what they found, what broke, what shipped. The Energy Friendly Homes business health check catches $0 invoices on completed jobs, flags orphaned estimates sitting in the pipeline, and surfaces any ServiceTitan jobs that closed without proper form sign-off. On a good night, it finds two or three things that would have taken me an hour to spot manually.

### What actually runs

Fourteen active tasks at last count. The business lane pulls ServiceTitan data via API, runs Pydantic validation against expected job specs, and flags anything that doesn't match. The research lane uses Firecrawl (Growth plan — 500k credits a month) to pull competitor pricing pages, utility rebate updates, and energy policy news into a structured summary. The build lane runs the Momentum Dash and SnuggSpec test suites, generates fresh mockup screenshots, and commits passing builds.

The philosophy underneath all of it: **if a task doesn't require judgment, it shouldn't require me.** The overnight system exists to preserve my focused hours for the decisions that actually need a human — the kitchen table conversations with homeowners, the architecture calls that require real thought. Everything else can run at 3am.

The hardest part wasn't building it. It was trusting it. The first few weeks I kept waking up to check the logs manually, which defeated the point. Now I just read the briefing with my coffee. Most mornings it's boring. Boring is the goal.
