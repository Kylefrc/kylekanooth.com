---
title: "Reading a Blower Door Result"
description: "You got an energy audit and the report says ACH50 is 9.4. Here's what that number means, what's tight enough to trigger ventilation requirements, and what numbers are worth pushing back on."
date: 2026-04-27
readTime: "5 min read"
tags: ["energy", "home-performance"]
---

If you've had a home energy audit in Oregon, your auditor ran a blower door test and your report has a number on it — something like "ACH50: 9.4" or "CFM50: 1,840." Most homeowners nod at these numbers and move on. Here's what they actually mean and how to use them.

### What the blower door does

A blower door is a calibrated fan that gets mounted in your front door frame. The auditor pressurizes or depressurizes the house to 50 Pascals — a standardized pressure difference — and measures the airflow required to maintain that pressure. That flow rate is how much air is leaking through your envelope at 50 Pa.

The test gives you three numbers that show up on reports:

**CFM50** — Cubic feet per minute of airflow at 50 Pascals. This is the raw measurement from the equipment. A result of 1,840 CFM50 means at 50 Pa of pressure difference, your house leaks 1,840 cubic feet of air per minute.

**ACH50** — Air changes per hour at 50 Pa. This normalizes CFM50 for house volume. The formula is: (CFM50 × 60) ÷ conditioned volume in cubic feet. ACH50 lets you compare houses of different sizes.

**ELA or EqLA** — Equivalent leakage area. This converts the airflow to an equivalent hole size in square inches. Less commonly reported but useful for understanding where the air is going.

### What's a "good" number

Oregon context: older Portland homes (pre-1980) typically test between 8 and 15 ACH50. Code-built homes from the 1990s and 2000s are often 5–9. Homes built to current Oregon code (2021 ORSC) are required to hit 3 ACH50 or better. A well-executed deep energy retrofit can get a house below 2.

As rough benchmarks:

- **Below 1.5 ACH50** — Very tight. You're approaching Passive House territory. Mechanical ventilation is not optional here, it's essential.
- **1.5–3 ACH50** — Tight. Code-level for new construction in Oregon. You need a deliberate ventilation strategy — typically ERV or HRV.
- **3–6 ACH50** — Moderately tight. Air sealing improvements will have clear energy impact. Ventilation question depends on the lower end of this range.
- **6–10 ACH50** — Typical older home. Significant air sealing opportunity. Natural infiltration is probably handling ventilation accidentally.
- **Above 10 ACH50** — Leaky. You're losing meaningful amounts of conditioned air, and there are likely comfort issues (drafts, uneven temps) traceable to air sealing problems.

### The ventilation line

Here's the thing most homeowners don't hear clearly at the audit: if you air seal the house significantly, you may create a ventilation problem. Older leaky homes ventilate themselves by accident — air leaks through the attic bypass, the rim joist, the outlet boxes, everywhere. That accidental infiltration is diluting indoor pollutants and providing fresh air, even if it's inefficient.

BPI 2101 (the Building Performance Institute standard for existing homes) sets the threshold at 0.35 ACH natural (at normal conditions, not 50 Pa). Below that level, intentional mechanical ventilation is required to maintain indoor air quality.

The rule of thumb auditors use to estimate natural ACH from ACH50 is to divide by a factor — typically between 14 and 20 depending on climate and house height. In Portland's climate, the common factor is about 17. So:

- ACH50 of 5 ÷ 17 ≈ 0.29 natural ACH — below the ventilation threshold
- ACH50 of 8 ÷ 17 ≈ 0.47 natural ACH — above the threshold

If your house is currently at 8 ACH50 and a contractor proposes getting it to 4 ACH50 — a very achievable result with good air sealing — you may cross the ventilation threshold as part of that work. That means the scope should include a ventilation solution (bath fan on a timer, supply-only ventilation, or a full ERV/HRV), not just insulation and sealing.

Ask your auditor: "At the target air leakage after your proposed scope, will we be below 0.35 natural ACH?" If the answer is yes, the scope should include mechanical ventilation.

### Numbers worth challenging

A few things in blower door reports that are worth a second look:

**Conditioned volume assumptions.** ACH50 is calculated using conditioned volume. If your auditor used floor area × ceiling height and your home has a partially conditioned basement or a bonus room, the volume may be off. Ask what volume they used.

**Single-point vs. multi-point tests.** A single-point test (just at 50 Pa) is standard and fine. A multi-point test at multiple pressures gives a more accurate leakage curve. If precision matters for your energy model, ask which protocol they used.

**Duct leakage separate from envelope.** The blower door measures envelope leakage. Duct leakage is a separate test (duct blaster or Duct Blower). If you have forced-air HVAC, duct leakage to outside can be a significant energy loss that won't show up in your ACH50 number. Ask if duct leakage was tested separately.

**Pre vs. post numbers.** If a contractor quotes air sealing work and gives you a projected improvement, ask for the methodology. "We'll get you from 9 to 4" is a claim that should be backed by a planned scope and verified with a post-work test. A reputable contractor will include a post-test in the contract.

### The bottom line

ACH50 is a real, measurable number that describes how leaky your house is under a standardized test condition. It's not the whole picture of your home's energy performance — insulation levels, window quality, HVAC efficiency, and duct condition all matter — but it's one of the few direct physical measurements you get from an audit, not a model output.

If your number is above 6, air sealing is worth looking at. If it's below 3, make sure your ventilation strategy is intentional, not accidental.
