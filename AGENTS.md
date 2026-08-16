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

## Client Briefs & Planning Workflow

Client inputs arrive as **PDF or markdown files** placed in the project root. The workflow is:

1. **Read the brief** — Use `pdftotext "<file>" -` for PDFs; read markdown files directly. Always read the complete document before planning.
2. **Survey current state** — Check the affected page(s) and `src/components/editorial/` before writing a plan.
3. **Write the plan** — Output a markdown file to the project root named `{subject}-plan.md` (e.g. `homepage-revision-plan.md`). Use the `/plan-from-brief` prompt for a consistent plan structure.
4. **Review** — The user reviews and revises the plan before implementation begins.
5. **Implement** — When told to implement, follow the plan's build order.

Plan files in the root are working documents, not permanent artifacts. Use the [plan-from-brief prompt](.github/prompts/plan-from-brief.prompt.md) to generate them consistently.

## Architecture

- **Framework**: Astro 6, static output, no client-side JS framework. TypeScript strict mode via `astro/tsconfigs/strict`.
- **Layout**: `src/layouts/ShowcaseLayout.astro` — single layout for all pages. Composes `PrimaryNav`, `PageHero`, and `SiteFooter` from `src/components/site/`. Key props: `title`, `description`, `eyebrow`, `portraitSrc`, `portraitAlt`. Pass `noHero={true}` on pages that use their own hero component (e.g. `PageIntro`, `ArticleHeader`).
- **Navigation & routing**: The navigation array and footer links live in `ShowcaseLayout.astro`. The nav renders `Contact` as a CTA button via `cta: true` on the nav item.
- **Styles**: Global styles are in `src/styles/foundation.css`, imported via `<style is:global>` in the layout. All design tokens (colors, spacing, typography) are CSS custom properties on `:root`.
- **PDF reading**: `pdftotext` is available at `/opt/homebrew/bin/pdftotext`. Use `pdftotext "<file>" -` to extract text.

## Site Sections & URL Structure

| Section | URL | Notes |
| --------- | ----- | ------- |
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
  editorial/  # Content-type components (many already built — see table below)
```

### Existing UI Components

| Component | Notes |
| ----------- | ------- |
| `InterfaceButton.astro` | `variant`: `primary` \| `secondary`. Renders `<a>` when `href` provided, `<button>` otherwise. |
| `InterfaceLink.astro` | Inline text links. |
| `FeatureCard.astro` | `eyebrow`, `title`, `description`, `imageSrc`, `imageAlt`, `tag` |
| `FieldNoteCard.astro` | `title`, `summary?`, `href?`, `external?`, `date?`, `noteLabel?` — supports external Substack links |
| `StrategicHeroBlock.astro` | Large editorial hero blocks |
| `DataEntryForm.astro` | Contact/form UI |

### Built Editorial Components

| Component | File | Notes |
| ----------- | ------ | ------- |
| `PageIntro` | `editorial/PageIntro.astro` | Text-led page hero (no portrait); use with `noHero={true}` |
| `EditorialStatement` | `editorial/EditorialStatement.astro` | `eyebrow`, `headline`, `body[]`, `linkLabel?`, `linkHref?`, `progression?`, `tonal?` |
| `EditorialSplit` | `editorial/EditorialSplit.astro` | Asymmetric 2-col (35/65); eyebrow, headline left; body paragraphs right |
| `CapabilityThreeUp` | `editorial/CapabilityThreeUp.astro` | 3-column how-I-work with proof lines |
| `FeaturedCase` | `editorial/FeaturedCase.astro` | Featured case study with optional 2-col comparison callout |
| `LeadershipPrinciples` | `editorial/LeadershipPrinciples.astro` | Ruled index rows: number / title / description |
| `CareerThroughline` | `editorial/CareerThroughline.astro` | 3-chapter career progression; `current?` flag on final chapter |
| `ThinkingInPublic` | `editorial/ThinkingInPublic.astro` | 2-col: narrative left, topics index right |
| `CredentialStrip` | `editorial/CredentialStrip.astro` | 4-col compact proof band |
| `ClosingCTA` | `editorial/ClosingCTA.astro` | `eyebrow`, `headline`, `body`, `ctaLabel`, `ctaHref`, `secondaryLinkLabel?`, `secondaryLinkHref?` |
| `ArticleHeader` | `editorial/ArticleHeader.astro` | Article page header |
| `ArtifactFigure` | `editorial/ArtifactFigure.astro` | Image/diagram with alt + caption |
| `CaseStudyHeader` | `editorial/CaseStudyHeader.astro` | Case study page header |
| `CaseStudySection` | `editorial/CaseStudySection.astro` | H2 section + body + optional asset |
| `ChecklistCallout` | `editorial/ChecklistCallout.astro` | Semantic checklist callout |
| `CompactAuthorLine` | `editorial/CompactAuthorLine.astro` | Name, role, about link |
| `DiagnosticQuestionCallout` | `editorial/DiagnosticQuestionCallout.astro` | Plain text diagnostic questions |
| `EssayTeaser` | `editorial/EssayTeaser.astro` | Text-led essay teaser |
| `FieldNoteArchiveRow` | `editorial/FieldNoteArchiveRow.astro` | Archive list row with number |
| `LeadershipLessonBlock` | `editorial/LeadershipLessonBlock.astro` | Final synthesis section |
| `OperatingModelBlock` | `editorial/OperatingModelBlock.astro` | 3–6 step operating model |
| `OutcomesBlock` | `editorial/OutcomesBlock.astro` | Narrative + optional metrics |
| `PullQuote` | `editorial/PullQuote.astro` | `<blockquote>` semantics |
| `ReadNextModule` | `editorial/ReadNextModule.astro` | 2–3 manually curated next reads |
| `RelatedThinkingModule` | `editorial/RelatedThinkingModule.astro` | Manual editorial list or compact cards |
| `RichTextArticleBody` | `editorial/RichTextArticleBody.astro` | Full rich text body renderer |

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
