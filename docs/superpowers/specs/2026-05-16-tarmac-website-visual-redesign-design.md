# TARMAC Website Visual-First Redesign Design

Date: 2026-05-16

## Context

The current TARMAC website is a static academic project page built around `index.html` and assets under `static/`. It still reflects the earlier manuscript framing and contains template placeholders in metadata, links, and citation fields.

The revised paper in `../ncc-submission/paper` reframes TARMAC as an empirical, descriptive action-level taxonomy rather than a prescriptive automation framework. It also adds substantial validation material: specification adequacy, cross-corpus expressive coverage, expanded robotic validation across multiple embodiments, an updated paper PDF, supplementary material, new figures, and new experiment media.

## Approved Direction

Use a comprehensive visual-first redesign. The page should open with concrete robot and laboratory visuals, then explain the taxonomy and the quantitative evidence. This is intentionally broader than a content-only sync.

## Goals

1. Align all public-facing text with the revised manuscript's descriptive framing.
2. Replace old paper resources with the revised paper and supplementary material.
3. Remove visible template placeholders and stale metadata.
4. Make robot demonstrations, real laboratory frames, and figures central to the page.
5. Present the three validation arms clearly:
   - specification adequacy,
   - expressive coverage,
   - robotic executability.
6. Keep the site static and compatible with GitHub Pages.

## Page Structure

### First Viewport

The first viewport should feature the paper title, full author list, University of York affiliation information, revised-under-review status, and primary resource buttons. It should use a real laboratory or robot visual, preferably the revised cover image or a strong frame/video still, so the project's physical subject matter is immediately visible.

Primary links:
- Paper PDF
- Supplementary PDF
- Dataset
- Code

The tagline should describe TARMAC as an empirical action-level taxonomy for laboratory manipulation.

### Robotic Demonstrations

A prominent visual section should show the validation experiments before the detailed taxonomy explanation. It should include short videos or compressed clips where available, with captions that name the configuration, lifecycle phase, and representative primitives.

Experiments to represent:
- single-arm Franka primitive execution and workflow composition,
- Dobot end-to-end solution preparation,
- bimanual Franka separating-funnel setup with recovery,
- Franka plus depth camera for broken-glass cleanup.

### One-Screen Thesis

A short section should summarize the revised claim: laboratory manipulation is not just a collection of task-specific operations; it has a reusable physical structure that can be described through TARMAC's dimensions, categories, and primitives.

### Taxonomy

Keep the existing TARMAC overview figure, but update its surrounding text and alt/caption language to match the v2 paper. Add a compact taxonomy summary covering:
- three dimensions: wrench dependence, actuation directness, motion periodicity,
- four categories: Positioning, Coupling, Tooling, Agitating,
- 18 primitives.

### Quantitative Validation

Add a validation section with three clear evidence panels:

1. Specification adequacy:
   - 562 annotated actions,
   - 86.7% concordance in the full-context rule-following probe,
   - macro-F1 0.84.

2. Expressive coverage:
   - 23 procedures from four published chemistry papers,
   - 917 manipulative steps,
   - 904 mapped to existing primitives,
   - 98.6% coverage,
   - 12 of 18 primitives exercised.

3. Robotic executability:
   - four robotic configurations,
   - five validation tasks,
   - all four high-level categories covered,
   - eight of 18 primitives invoked.

The coverage matrix should be included as the main quantitative figure.

### Dataset Examples

Add a gallery of representative source-corpus examples from the supplementary material:
- Schlenk line cannula filtration,
- column chromatography,
- reduced-pressure distillation,
- NMR sample preparation.

This section should visually address the dataset-scope concern without overloading the page with every supplementary frame.

### Paper Details

End with the revised abstract, data/code availability text, BibTeX citation placeholder appropriate for an under-review manuscript, acknowledgements, and template credit.

## Resource Sync

Resources should be copied or generated from `../ncc-submission/paper` into `static/`:

- Replace `static/pdfs/tarmac_paper.pdf` with the revised paper PDF.
- Add `static/pdfs/tarmac_supplementary.pdf`.
- Add key figures such as the revised cover image and coverage matrix.
- Add representative dataset frames and robotic validation frames as needed.
- Reuse existing compressed videos when they correspond to the new experiments.
- If source videos are too large for the site, generate web-compressed clips instead of copying full raw videos.

## Visual Design

The redesign should remain restrained and academic, but less template-like. It should prioritize real project media over decorative graphics. Cards may be used for repeated items such as validation metrics, primitive groups, and gallery entries. Sections should be full-width bands or simple constrained layouts, not nested cards.

Color should avoid becoming a one-note blue/purple theme. Use a neutral academic base with restrained accent colors for taxonomy categories and validation highlights.

## Accessibility and Metadata

Update:
- page title,
- meta description,
- keywords,
- author metadata,
- Open Graph and Twitter metadata,
- structured data,
- citation metadata,
- image alt text,
- button labels and URLs.

Remove unreplaced template values such as `BRIEF_DESCRIPTION`, `KEYWORD1`, `AUTHOR_NAMES`, and empty `href` values.

## Testing

Verification should include:
- static file/link checks for missing local assets,
- a search for template placeholders,
- local browser review of desktop and mobile-width layouts,
- video/image rendering checks,
- basic responsiveness and text-overlap checks.

## Out of Scope

- No backend or build system should be introduced.
- No publication DOI should be invented before it exists.
- No full raw experiment videos should be committed if compressed versions are sufficient.
- No claims should exceed the revised manuscript framing.
