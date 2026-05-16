# TARMAC Website Visual-First Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the static TARMAC project page around the revised paper's visual-first narrative and synchronized resources.

**Architecture:** Keep the site as a GitHub Pages-compatible static page. Replace the old template-heavy single page with a focused `index.html`, custom CSS in `static/css/index.css`, lightweight JavaScript in `static/js/index.js`, and synchronized assets under `static/`.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, existing Bulma and Font Awesome assets, local PDFs/images/videos.

---

### Task 1: Sync Revised Assets

**Files:**
- Modify: `static/pdfs/tarmac_paper.pdf`
- Create: `static/pdfs/tarmac_supplementary.pdf`
- Create: `static/images/cover.jpg`
- Create: `static/images/coverage_matrix.png`
- Create: `static/data/video_labels.csv`
- Create: `static/data/tarmac_decomposition_prompt.md`
- Create: `static/images/dataset-examples/*`
- Create: `static/images/robotic-validation/*`

- [ ] **Step 1: Copy paper PDFs**

Run:
```bash
cp ../ncc-submission/paper/submission/main.pdf static/pdfs/tarmac_paper.pdf
cp ../ncc-submission/paper/supplementary.pdf static/pdfs/tarmac_supplementary.pdf
```
Expected: both destination PDFs exist.

- [ ] **Step 2: Copy primary figures**

Run:
```bash
mkdir -p static/images/dataset-examples static/images/robotic-validation
cp ../ncc-submission/paper/figures/cover.jpg static/images/cover.jpg
cp ../ncc-submission/paper/figures/coverage_matrix.png static/images/coverage_matrix.png
```
Expected: cover and coverage matrix exist in `static/images/`.

- [ ] **Step 3: Copy lightweight dataset files**

Run:
```bash
mkdir -p static/data
cp ../ncc-submission/paper/images/label_data/video_labels.csv static/data/video_labels.csv
cp ../ncc-submission/paper/tarmac_decomposition_prompt.md static/data/tarmac_decomposition_prompt.md
```
Expected: the public annotation CSV and decomposition prompt exist under `static/data/`.

- [ ] **Step 4: Copy representative dataset frames**

Run:
```bash
cp ../ncc-submission/paper/figures/schlenk-frames/schlenk_a.jpg static/images/dataset-examples/schlenk_a.jpg
cp ../ncc-submission/paper/figures/schlenk-frames/schlenk_f.jpg static/images/dataset-examples/schlenk_f.jpg
cp ../ncc-submission/paper/figures/column-frames/07_open_tap_149s.jpg static/images/dataset-examples/column_open_tap.jpg
cp ../ncc-submission/paper/figures/column-frames/12_pour_solution_329s.jpg static/images/dataset-examples/column_pour_solution.jpg
cp ../ncc-submission/paper/figures/distillation-frames/07_twist_condenser_96s.jpg static/images/dataset-examples/distillation_twist_condenser.jpg
cp ../ncc-submission/paper/figures/distillation-frames/18_connect_tube_212s.jpg static/images/dataset-examples/distillation_connect_tube.jpg
cp ../ncc-submission/paper/figures/nmr-frames/05_scoop_powder_25s.jpg static/images/dataset-examples/nmr_scoop_powder.jpg
cp ../ncc-submission/paper/figures/nmr-frames/28_wipe_tube_324s.jpg static/images/dataset-examples/nmr_wipe_tube.jpg
```
Expected: eight representative dataset frames exist.

- [ ] **Step 5: Copy robotic validation frames**

Run:
```bash
cp ../ncc-submission/paper/images/1.png static/images/robotic-validation/franka_single_arm.png
cp ../ncc-submission/paper/figures/chemistry-exp-frames/chem_016.jpg static/images/robotic-validation/dobot_insert_stir_bar.jpg
cp ../ncc-submission/paper/figures/chemistry-exp-frames/chem_050.jpg static/images/robotic-validation/dobot_stir_hotplate.jpg
cp ../ncc-submission/paper/figures/bimanual-exp-frames/biman_021.jpg static/images/robotic-validation/bimanual_screwing.jpg
cp ../ncc-submission/paper/figures/bimanual-exp-frames/biman_087.jpg static/images/robotic-validation/bimanual_recovery.jpg
cp ../ncc-submission/paper/figures/broken-beaker-exp-frames/object_detection.png static/images/robotic-validation/broken_detection.png
cp ../ncc-submission/paper/figures/broken-beaker-exp-frames/frame_106.jpg static/images/robotic-validation/broken_remove_fragment.jpg
```
Expected: seven representative robotic validation images exist.

- [ ] **Step 6: Verify asset inventory**

Run:
```bash
find static/pdfs static/data static/images/dataset-examples static/images/robotic-validation -type f | sort
```
Expected: output lists the revised paper PDF, supplementary PDF, primary figures, dataset frames, and robotic frames.

### Task 2: Rebuild the Static Page

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace template page with revised page**

Write `index.html` as a complete static page with these sections in order:
1. visual hero with title, authors, status, and links,
2. robotic demonstrations,
3. one-screen thesis,
4. taxonomy overview and primitive grid,
5. quantitative validation,
6. dataset examples,
7. revised abstract,
8. data/code availability and BibTeX,
9. footer credit.

Use only local resources or stable links:
```text
static/pdfs/tarmac_paper.pdf
static/pdfs/tarmac_supplementary.pdf
https://tarmac-paper.github.io/
https://github.com/kefhuang/tarmac
static/images/cover.jpg
static/images/tarmac.jpg
static/images/coverage_matrix.png
static/videos/experiment1.mp4
static/videos/experiment2.mp4
static/videos/experiment3.mp4
```

- [ ] **Step 2: Verify no old placeholders remain**

Run:
```bash
rg -n "TODO|BRIEF_DESCRIPTION|KEYWORD1|AUTHOR_NAMES|YOUR_|FIRST_AUTHOR|SECOND_AUTHOR|PAPER_TITLE|CONFERENCE_NAME|Anonymous Authors|href=\"\"" index.html
```
Expected: no matches.

### Task 3: Replace Custom Styling

**Files:**
- Modify: `static/css/index.css`

- [ ] **Step 1: Replace template-heavy CSS with focused visual-first styling**

Write CSS for:
- neutral academic layout,
- visual hero,
- responsive media grid,
- validation metric cards,
- taxonomy category cards,
- dataset and robotic galleries,
- mobile typography and spacing,
- scroll-to-top button.

- [ ] **Step 2: Check color and layout constraints**

Run:
```bash
rg -n "#|gradient|border-radius|font-size|letter-spacing" static/css/index.css
```
Expected: output shows a restrained neutral palette, no decorative gradient-orb patterns, no viewport-width font scaling, and no negative letter spacing.

### Task 4: Simplify Page JavaScript

**Files:**
- Modify: `static/js/index.js`

- [ ] **Step 1: Replace unused template JS with local page behavior**

Write JavaScript for:
- scroll-to-top visibility and action,
- pausing videos when they leave the viewport,
- copying the BibTeX block.

- [ ] **Step 2: Check for references to removed markup**

Run:
```bash
rg -n "moreWorks|bulmaCarousel|bulmaSlider|changeSlide|changeOverviewSlide|results-carousel" static/js/index.js index.html
```
Expected: no matches.

### Task 5: Local Verification

**Files:**
- Inspect: `index.html`
- Inspect: `static/css/index.css`
- Inspect: `static/js/index.js`

- [ ] **Step 1: Check all local references resolve**

Run a script that extracts local `href` and `src` values from `index.html` and checks each file exists.
Expected: no missing local assets.

- [ ] **Step 2: Start a static server**

Run:
```bash
python3 -m http.server 8000
```
Expected: server listens on `http://localhost:8000`.

- [ ] **Step 3: Browser-check desktop layout**

Open `http://localhost:8000` in the in-app browser and capture a desktop screenshot.
Expected: hero, videos/images, taxonomy, validation, dataset, abstract, and footer render without obvious overlap.

- [ ] **Step 4: Browser-check mobile layout**

Use the browser at a mobile-width viewport and capture a screenshot.
Expected: cards and media stack cleanly, buttons wrap without text overlap.

- [ ] **Step 5: Final placeholder and git checks**

Run:
```bash
rg -n "TODO|BRIEF_DESCRIPTION|KEYWORD1|AUTHOR_NAMES|YOUR_|FIRST_AUTHOR|SECOND_AUTHOR|PAPER_TITLE|CONFERENCE_NAME|Anonymous Authors|href=\"\"" index.html static/css/index.css static/js/index.js
git status --short
```
Expected: no placeholder matches in tracked site files; git status shows only intentional redesign files and synced assets.
