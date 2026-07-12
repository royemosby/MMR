# MMR — Agent Instructions

Personal showcase site for Maggie Lynn, built with Astro (static, no JS framework integrations). The site presents professional work, frameworks, field notes, and speaking engagements through a print/editorial visual language — a curated library, not a blog or agency portfolio.

## Build & Dev Commands

```sh
npm run dev        # dev server at localhost:4321
npm run build      # production build to ./dist/ (run to validate changes)
npm run preview    # preview the production build
npm run astro      # astro CLI passthrough
```

> Run `npm run build` after any route, template, or style changes to confirm all static pages build cleanly.

## Architecture

- **Framework**: Astro 6, static output, no client-side JS framework. TypeScript strict mode via `astro/tsconfigs/strict`.
- **Layout**: `src/layouts/ShowcaseLayout.astro` — single layout for all pages. Composes `PrimaryNav`, `PageHero`, and `SiteFooter` from `src/components/site/`. Accepts `title`, `description`, `portraitSrc`, and `portraitAlt` props; `description` has a default fallback.
- **Navigation & routing**: The navigation array lives in `ShowcaseLayout.astro`. Add new pages/routes there when creating new routes.
- **Styles**: Global styles are in `src/styles/foundation.css`, imported via `<style is:global>` in the layout. All design tokens (colors, spacing, typography) are CSS custom properties on `:root`.

## Site Sections & URL Structure

| Section | URL | Notes |
|---------|-----|-------|
| Home | `/` | Existing |
| About | `/about` | Existing |
| Contact | `/contact` | Existing |
| Writing | `/writing` | Index page; flagship essays, essays, field notes archive |
| Writing article | `/writing/[slug]` | Long-form article pages |
| Field Notes | `/field-notes` | Existing index; standalone or filterable within Writing |
| Field Note | `/field-notes/[slug]` | Individual field note pages |
| Frameworks | `/frameworks` | Existing index |
| Framework | `/frameworks/[slug]` | Individual framework pages (Phase Two, but architecture must support) |
| Work | `/work` | Existing index; case studies |
| Case Study | `/work/[slug]` | Individual case study pages |
| Speaking | `/speaking` | Existing |

Dynamic routes (`[slug]`) use Astro's file-based routing with static generation.

## Content Types

Four distinct types share a base field set but have different layouts:

1. **Flagship Essay** — Long-form, two-column featured treatment, optional visual
2. **Essay** — Editorial teaser list on Writing index; full article layout at `/writing/[slug]`
3. **Field Note** — Compact, numbered, narrow reading width (620–700px max)
4. **Case Study** — Structured narrative sections at `/work/[slug]`

### Shared base fields (all types)

`title`, `slug`, `contentType`, `eyebrow`, `dek` (subtitle), `publishDate`, `readingTime`, `seoTitle`, `metaDescription`, `ogImage`, `primaryTopic`, `relatedContent[]`, `status` (draft/published)

### Writing-specific fields

Required: `title`, `slug`, `eyebrow`, `dek`, `premise` (one-sentence), `intro`, `body` (rich text), `readingTime`, `relatedContent`
Optional: `featuredVisual`, `pullQuote`, `operatingModelBlock`, `checklistBlock`, `diagnosticBlock`, `artifactFigure`

### Field Note-specific fields

Required: `fieldNoteNumber`, `title`, `slug`, `seriesLabel`, `signal` (one-sentence), `body` (rich text), `readingTime`, `relatedContent`
Optional: `publishDate`, `pullQuote`, `diagnosticBlock`, `artifact`

### Case Study-specific fields

Required: `clientName`, `strategicTitle`, `slug`, `category`, `summary`, `visibleProblem`, `hiddenSystemIssue`, `stakes`, `operatingIntervention`, `whatChanged`, `leadershipLesson`, `relatedContent`
Optional: `role`, `sector`, `timeline`, `platform`, `metrics[]`, `visualAsset`, `artifactFigure`, `anonymized`, `confidentialityNote`

## Component Structure

```
src/components/
  site/       # Site chrome — PrimaryNav, PageHero, SiteFooter
  ui/         # Reusable UI primitives (existing)
  editorial/  # (to be created) Content-type components
```

### Existing UI Components

| Component | Notes |
|-----------|-------|
| `InterfaceButton.astro` | `variant`: `primary` \| `secondary`. Renders `<a>` when `href` provided, `<button>` otherwise. |
| `InterfaceLink.astro` | Inline text links. |
| `FeatureCard.astro` | `eyebrow`, `title`, `description`, `imageSrc`, `imageAlt`, `tag` |
| `FieldNoteCard.astro` | Blog-style field note cards |
| `StrategicHeroBlock.astro` | Large editorial hero blocks |
| `DataEntryForm.astro` | Contact/form UI |

### Editorial Components (to be built)

All editorial components must: accept optional props without layout collapse; maintain semantic heading/link structure; have visible keyboard focus states; support responsive stacking.

| Component | Used In | Notes |
|-----------|---------|-------|
| `EditorialPageHeader` | Writing index | Eyebrow, H1, intro copy; text constrained to ~640–720px, left-aligned |
| `FeaturedFlagshipArticle` | Writing index | Two-column desktop; text 6–7 cols, visual 4–5 cols; visual is optional |
| `EssayTeaser` | Writing index | Text-led; avoid image-first card grid; supports full-row link |
| `FieldNoteArchiveRow` | Writing index, Field Notes | Single-column archive list; thin rule separators; number always visible |
| `ArticleHeader` | `/writing/[slug]` | Wider than body; body copy starts below at narrow reading width |
| `RichTextArticleBody` | `/writing/[slug]`, `/field-notes/[slug]` | Supports: p, h2, h3, ol, ul, inline link, strong, em, PullQuote, image+caption, table, OperatingModelBlock, ChecklistCallout, DiagnosticQuestionCallout, ArtifactFigure |
| `OperatingModelBlock` | Articles, Case Studies | 3–6 steps; horizontal desktop, stacked mobile; use ordered list semantics |
| `ChecklistCallout` | Articles | Semantic list; no fake checkboxes; restrained inset background |
| `DiagnosticQuestionCallout` | Articles, Field Notes | Plain text questions; optional related framework link |
| `PullQuote` | Articles, Field Notes | `<blockquote>` semantics; max 1–2 per article; no redundant quote marks |
| `ArtifactFigure` | Articles, Case Studies | Image/diagram/PDF preview; alt text + caption required; optional expand (keyboard-accessible) |
| `CaseStudyHeader` | `/work/[slug]` | Category label, client name, title, summary, optional metadata, optional visual |
| `CaseStudySection` | `/work/[slug]` | Heading + rich text body + optional asset/callout; H2 semantic structure |
| `OutcomesBlock` | `/work/[slug]` | Narrative + optional metrics list; metrics not mandatory; avoid oversized "big number" tiles |
| `LeadershipLessonBlock` | `/work/[slug]` | Final synthesis section; restrained visual treatment; no testimonial-card styling |
| `ReadNextModule` | Article pages | 2–3 manually selected entries; no algorithmic recommendations; no carousel |
| `RelatedThinkingModule` | Case Studies, Writing index footer | Manual content selection; editorial list or compact cards |
| `CompactAuthorLine` | Article pages | Name, optional headshot, one-sentence role, about link; keep compact |

## Design Conventions

- **Palette**: Warm parchment tones (`--color-parchment`, `--color-paper`, `--color-ink`). Accents: `--color-oxblood`, `--color-french-blue`, `--color-olive`, `--color-brass`.
- **Typography**: `--font-display` (Libre Caslon Text, serif) for headings; `--font-body` (Avenir Next, sans-serif) for body copy.
- **Spacing**: Use spacing tokens (`--space-4` through `--space-96`). No raw `rem`/`px` values.
- **BEM class naming**: CSS classes follow BEM — `block__element--modifier`. Match for all new styles.
- **Inline styles**: Avoid. Use existing CSS classes or add to `foundation.css`.
- **No inline styles in content modules** — even as a quick fix.

### Editorial Layout Rules (project-specific — differs from common practice)

- Text-forward layout; avoid card-heavy grids, carousels, and reverse-chronological feeds
- Long-form reading width: **680–760px** (articles); **620–700px** (field notes); case study body: **760–900px**
- Max content container: **1200–1280px**; article header max: **900–1040px**
- 12-col desktop grid → 6-col tablet → 4-col mobile
- Body copy: left-aligned, never justified; no all-caps paragraphs; generous line-height
- Thin rules, restrained background shifts, and spacing create structure — not borders, shadows, or cards
- Do **not** require hero imagery for every content entry

### Manual Curation Rule

Content relationships and featured content are **always manually curated**. Do not use reverse chronology as the default sort. Do not use automatic tag-based recommendations. This applies to: featured flagship article, essay order, field note order, related content on all page types.

## Page Patterns

Every page in `src/pages/` uses `ShowcaseLayout` as its wrapper. Content is slotted directly into the layout's default slot. Pages use a consistent content rhythm:

```astro
<div class="section-heading">
  <p class="section-heading__eyebrow">Section Label</p>
  <div class="section-heading__line"></div>
  <span class="section-heading__label">Optional right label</span>
</div>
```

## Accessibility Requirements (WCAG AA minimum)

- Semantic heading structure on every page
- Logical landmark regions (`<main>`, `<nav>`, `<header>`, `<footer>`)
- All interactive elements keyboard-navigable with visible focus states
- Sufficient contrast; no color-only meaning
- Alt text on all meaningful images; captions on complex diagrams
- `prefers-reduced-motion` respected
- Accessible expand/collapse controls (e.g., ArtifactFigure expand)
- Descriptive link text — no "click here" or redundant duplicate links
- Body text readable at browser zoom; avoid low-contrast or justified copy
- Accessible tables when used

## Interaction Rules

**Use:** Subtle underline/arrow on links; small background shift on hover; focus-visible states; optional accessible image expand; optional collapsible table of contents.

**Never use:** Carousels, autoplay, full-screen modal interruptions, scroll-jacking, decorative parallax, animated particles, hover-only hidden information, floating share rails, aggressive popups.

## Phase Two (do not build yet — architecture must not block these)

- Sticky table of contents for flagship essays >~1,500 words
- Print-friendly article styles
- Downloadable templates and practical tools
- Related content filtering by topic
- Search (once content volume justifies)
- RSS feed / newsletter integration
- Light/dark theme support
- Framework detail pages with reusable diagrams (`/frameworks/[slug]`)
- Content series archive pages

## Fonts & External Resources

Google Fonts (Libre Caslon Text) loaded via `<link>` tags in layout `<head>`. Static images live in `public/images/`.
