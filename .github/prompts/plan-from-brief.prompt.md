---
description: "Read a client brief (PDF or markdown) and write a feature or refactor plan to the project root for review. Use when: given a PDF brief, given a design document, given a revision brief, planning a new page, planning a refactor from a document."
argument-hint: "Path to the brief file (e.g. 'Homepage Revision Brief.pdf' or 'brief.md')"
agent: agent
---

You are building an implementation plan from a client brief for the MMR project.

## Step 1 — Read the brief

The argument is the path to the brief file. It may be a PDF or a markdown file.

**If PDF:** extract the text with:
```sh
pdftotext "<path>" -
```
Read the full output. If it is truncated to a temp file, read that file in full before proceeding.

**If markdown:** read the file directly.

Do not proceed to planning until you have read the complete document.

## Step 2 — Survey current state

Before writing the plan, check the current state of the files that will be affected:

- Read `src/pages/about.astro`, `src/pages/index.astro`, or whichever page the brief targets
- Scan `src/components/editorial/` to know which components already exist vs need building
- Check `src/styles/foundation.css` (tail ~30 lines) to understand the CSS append point
- Read `src/layouts/ShowcaseLayout.astro` if the brief touches navigation or layout

This delta between current state and target state shapes the plan's build order.

## Step 3 — Write the plan

Structure the plan as a markdown document using the sections below. Include only sections relevant to the brief.

```markdown
# [Page/Feature] Plan

Source: `<filename>`

---

## Overview
One paragraph: what this work accomplishes and the narrative sequence it follows.

## Current state
One paragraph: what exists now and what the delta is.

## Page sections & build order
For each section:
### N. Section name — `ComponentName`
- **New/Existing component:** file path
- **Props:** list key props
- **Layout:** desktop/tablet/mobile behavior
- **Copy:** all copy from the brief

## New components to build
Table: Component | File | Used in

## Existing components to update
Table: Component | Change

## CSS additions needed
Table: Block | Notes (all styles go in src/styles/foundation.css)

## Target page structure
Astro pseudocode showing component composition

## Build order
Numbered list, sequenced so dependencies come first

## Acceptance criteria / checklist
Checkbox list from the brief
```

## Step 4 — Output the plan

Determine a filename from the brief subject:
- Use the pattern `{subject}-plan.md` (e.g. `homepage-revision-plan.md`, `about-refactor-plan.md`)
- Write the file to the **project root** (not `src/` or any subdirectory)

After writing, confirm the filename and give a brief summary of what the plan covers.

## Project conventions (reference)

- Components live in `src/components/editorial/` (new content components) or `src/components/site/` (chrome)
- All CSS goes in `src/styles/foundation.css` using BEM class naming
- Design tokens: `--color-*`, `--space-*`, `--font-display`, `--font-body` — never raw px/rem values
- `ShowcaseLayout.astro` wraps every page; pass `noHero={true}` for pages with their own hero component
- Navigation array and footer links live in `ShowcaseLayout.astro`
- Run `npm run build` after plan implementation to validate — include this in the build order
