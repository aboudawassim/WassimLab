# WassimLab — Multilingual professional portfolio

A clean App Router rebuild of the WassimLab portfolio, incorporating the original Lenkrio-inspired styling, uploaded portrait and project screenshots, the existing CV PDFs, translated content and dedicated discipline pages.

## Technology

- **Next.js 16.4.5** (stable release verified on November 6, 2026; avoid canary)
- **React 19.2**, **TypeScript** and modern CSS
- App Router, static export (`output: 'export'`), server-rendered pages with small client-side interactive components
- No runtime APIs or databases. Image assets are local, but fonts currently load from Google Fonts with system fallbacks; consider self-hosted fonts for privacy and offline reliability.
- Locale-prefixed routes: `/en/`, `/fr/`, `/ar/`, with Arabic RTL content layout
- Light/dark mode, with reduced-motion support; interactive workflow charts are accessible buttons

## Local setup

Use **Node.js 20.9+** (Node.js 22 LTS preferred).

```bash
npm install
npm run dev
```

Open http://localhost:3000/en/ and navigate through the site. For a production build:

```bash
npm run check:translations
npm run check:content
npm run lint
npm run build
```

The build generates `/out/` for static deployment. Translation validation checks French and Arabic copy, matching interface keys, and all eight expertise pages.

After a successful build, preview the static export with `npm run preview` (port 4173 by default). `npm start` serves the static `out/` directory; do not use `next start` with `output: export`.

## Firebase Hosting

Firebase Hosting serves the static export in `/out/`. Deploy manually with:

```bash
npm run build
firebase deploy --only hosting --project wassimlab
```

### Automatic deployment from GitHub

`.github/workflows/deploy-firebase.yml` builds and deploys to the live Firebase site after each push to `main`. Before it can deploy, add a GitHub Actions secret named `FIREBASE_SERVICE_ACCOUNT_WASSIMLAB` to the `aboudawassim/WassimLab` repository. Store the JSON key for a Google Cloud service account with Firebase Hosting deploy access in that secret; do not commit the key or paste it into source files.

`firebase.json` points to `out/`, not `site/` or `public/`.

## Website map

- `/en/` — balanced general professional overview
- `/en/expertise/` — 8 professional disciplines
- `/en/expertise/project-coordination/`
- `/en/expertise/business-analysis/` — BRD / FRD / SRS / user stories, BPMN/UML
- `/en/expertise/technical-analysis/`
- `/en/expertise/qa-uat/`
- `/en/expertise/fullstack/`
- `/en/expertise/devsecops/`
- `/en/expertise/it-operations/`
- `/en/expertise/business-operations/`
- `/en/process/` — interactive SDLC
- `/en/projects/` — real projects with differentiated ownership
- `/en/experience/` — experience and credentials
- `/en/resumes/` — 20 existing downloadable PDFs
- `/en/contact/`

All pages have `/fr/` and `/ar/` equivalents. The original PDF languages remain unchanged.

## Personal assets and privacy

- `public/assets/media/professional-portrait.webp` — portrait provided in the conversation
- `public/assets/media/qatesty-product-interface.webp` — cropped project screen
- `public/assets/media/satoricom-website.webp` — project screenshot
- `public/assets/media/docker-certificate.webp` — image of certificate
- `public/assets/credentials/` — RBK certificate PDF
- `public/assets/cv/` — 20 pre-existing role-based CV PDFs
- Original engineering diploma scan **not included** because it contains personal identification information.

Do not claim any unverified outcome metrics, client ownership or active credentials. Review the contact details and claims in the existing PDFs before publishing. Real-world projects are distinguished as independent development, coordination work or frontend contributor work.

## Information architecture

The navigation is purposefully role-neutral: Overview, Expertise, Process, Projects, Experience, CV Library and Contact. Each of eight specialties gets a page with an outcome statement, selectable animated SVG workflow, bilingual visual architecture map, local-language illustration, deliverable cards, practical explanation, tools and relevant next action. These pages explain professional methodologies; the case-study content distinguishes that from verified personal work.

## Translation maintenance

- `lib/dictionary.ts`: global English/French/Arabic interface copy
- `lib/roles.ts`: locale-specific role explanations, deliverables, diagrams and examples
- `lib/projects.ts`: localized descriptions of the five featured projects
- `components/Shell.tsx`: flag language selector and nav links

All visible text should be proofread by a qualified French/Arabic reviewer before public release; abbreviations (BRD, FRD, SRS, UAT, API, DevSecOps) remain internationally recognizable.

## Validation performed here

- Parsed 28 `.ts`/`.tsx` files using the TypeScript compiler parser: **0 syntax errors**
- Parsed all 24 localized SVG illustrations and the original 8 illustrations using XML parser: **32/32 valid**
- Verified graph connections, icon choices, nodes, and localized SVG file mappings via `npm run check:diagrams`
- Confirmed all 20 CV PDF files are present
- Confirmed locale and discipline route source files exist
- **Not completed:** dependency installation, TypeScript type-check with dependencies, production compilation, live multi-browser and runtime visual testing. Complete these in the target environment.

## Content approval checklist

1. Confirm public portrait and screenshots have rights/permission to publish.
2. Verify Qatesty, Prestige TN and GitHub external links.
3. Verify CVs for current factual accuracy and contact details.
4. Confirm no confidential client information or diploma identity numbers are public.
5. Review translations, diagrams and responsive behavior in all three languages.
6. Run a production build and inspect mobile/desktop views before replacing the live portfolio.


## Interactive diagrams upgrade

The updated diagrams are real React/SVG components rather than flattened screenshots:

- `components/Visuals.tsx`: custom vector icons, nodes, animated directional links and clickable detail inspectors; no external diagram library
- `lib/diagram-specs.json`: seven role-specific fields plus business analysis, each with a graph of meaningful connected nodes, labels in EN/FR/AR and validated edges
- `public/assets/visuals/<role>-<locale>.svg`: 24 original diagrams with distinct workflow layouts, vector iconography, arrows, subtle glow and reduced-motion support
- `app/globals.css`: design tokens, light/dark styles, responsive diagram viewport and motion rules
- `previews/workflow_gallery.png`: visual overview of all eight original diagrams
- `docs/WORKFLOW_DIAGRAM_SYSTEM.md`: interaction details, semantics and maintenance guide

Interactive workflow behavior: click or keyboard-select nodes; a contextual panel shows the stage's meaning and connected components. On small screens the diagram is horizontally scrollable and details remain readable. The diagrams are **conceptual illustrations**, not claims of private customer architecture.

Validation command independent of Next dependencies:

```bash
npm run check:diagrams
```

A complete Next.js production build still requires `npm install`, `npm run lint` and `npm run build` in a network-enabled environment.

## Motion for React — premium interaction upgrade

This edition integrates the maintained **Motion for React** library (formerly Framer Motion) with hover, press, rotation, scaling, staggered entrance, SVG path drawing, shared-element selection, animated workflow inspectors and CV list transitions. Full details are in [MOTION_DESIGN_SYSTEM.md](MOTION_DESIGN_SYSTEM.md).

Run `npm install` to install the newly added `motion` dependency, then `npm run check:motion`, `npm run check:diagrams`, `npm run lint`, and `npm run build`. The ZIP includes the complete source, but no installed `node_modules` or generated build output. In the current environment the npm registry is unreachable; runtime and build verification must be performed on your machine or CI before deployment.


## Visual storytelling v4

See [VISUAL_UPGRADE.md](./VISUAL_UPGRADE.md) for the new semantic icon palette, 24 colorful localized diagrams, visual gallery, image performance and verification details. Run `npm run check:visuals` after making changes.

## Cinematic workflow imagery (latest update)

Eight high-resolution illustrated workflows were added to all role pages, with an interactive localized SVG alternative, stage selector and enlarge viewer. See [CINEMATIC_WORKFLOW_UPGRADE.md](CINEMATIC_WORKFLOW_UPGRADE.md) and preview [WORKFLOW_ART_GALLERY.jpg](WORKFLOW_ART_GALLERY.jpg). The images are conceptual examples, **not proof of KPI performance**. Test and deploy via `npm run check:cinematic && npm run build` after installing dependencies.

### Preview without installing dependencies

Open `QUICK_PREVIEW.html` after extracting this ZIP to browse the eight new diagram images. The page is only an artwork preview; the production website requires installing Next.js dependencies and passing the release checklist.

## Audit and corrections — November 6, 2026

The audited release fixes role-stage/deliverable correspondence (all eight disciplines, all locales), improves Arabic/French labels and CV search, adds page-specific canonical/hreflang metadata, restores theme before hydration, improves keyboard focus and reduced-motion behavior, and adds a no-dependency static-export preview server. The old French CV redirect leads to the French CV selector rather than silently substituting a Business Analyst-specific file.

Run `npm run check:content` together with the four previous validators. The new validation checks also require every illustrated workflow stage to have exactly one matching typical deliverable.

The production build and TypeScript check pass. The live site is deployed at https://wassimlab.web.app. GitHub auto-deployment needs the `FIREBASE_SERVICE_ACCOUNT_WASSIMLAB` repository secret described above. See `AUDIT_REPORT.md` for historical audit details.
