# WassimLab — source and release audit

**Date:** November 6, 2026  
**Scope:** `WassimLab_Next16_Cinematic_Workflows_Updated_Website.zip` and its bundled Next.js App Router, assets, eight expertise pages, project summaries, multilingual copy, 20 CV PDFs, Firebase configuration and interactive visual components. The live Firebase site was **not** overwritten during the audit.

## Executive result

**Source corrected; production deployment NOT approved yet.** All five offline structural/content validators pass after corrections. The project source parses as TypeScript/TSX; all 20 CV PDFs are one-page, text-selectable and within page boundaries. This is not equivalent to a real Next.js type-check/build or browser accessibility/performance testing.

## Confirmed issues corrected in this edition

| Area | Original issue | Correction |
|---|---|---|
| Workflow storytelling | The cinematic images and clickable steps often had different stage sequences. DevSecOps and IT Operations had 7 steps but 6 deliverables; some stage details recycled an unrelated output. | Updated all 8 disciplines in EN/FR/AR so 24 localized sequences show stage-aligned, typical deliverables. DevSecOps now follows 9 phases and IT incident handling follows the pictured flow. |
| Arabic and French | Several section headings, navigation assistance labels and home-page hero tags remained English; CV names were not searchable in Arabic/French. | Added `lib/ui-copy.ts`, localized hero, headings, accessible labels and CV names; CV search supports English, French and Arabic title terms. |
| CV language expectations | Arabic interface risked implying Arabic downloadable CVs exist. | Arabic CV panel states the PDFs are available in English and French only; actual download language remains visible. |
| Canonical/SEO | Locale layouts declared homepage hreflang alternates even on expertise and inner pages. | Added `lib/seo.ts` and page-specific canonical URLs, language alternates, titles, descriptions and Open Graph metadata. |
| Theme | Saved light mode applied only after React hydration, causing a possible dark-mode flash. | Added pre-hydration theme script plus system preference fallback. |
| Accessibility | Some UI controls had English-only labels or subtle focus states; motion effects lacked a reduced-motion variant in the resume explorer. | Localized skip/navigation/theme labels, improved focus-visible outlines, and reduced-motion handling in CV interactions. |
| Static preview | `npm start` called `next start`, unsuitable for a Next.js `output: 'export'` deployment. | Added `scripts/serve-static.mjs`, and mapped `npm start`/`npm run preview` to serve `out/`. The preview server passed route, CSS, and 404 smoke tests using temporary fixtures. |
| Legacy French CV redirect | An old generic French CV URL silently redirected to a Business Analyst-specific CV. | Redirect now opens the French CV selector, avoiding role substitution until a confirmed general French CV is approved. |
| Quality gates | Original validators did not check that every workflow stage has its own deliverable. | Added `npm run check:content` for all 24 role/locale flows, 20 CV references, artwork and translated diagrams. |
| Documentation | README implied no remote font dependency. | Documented the Google Fonts request and system-font fallback. |

## Automated checks actually executed

- `npm run check:content`: **PASS** — 24 locale-specific workflow mappings, eight artwork files, 24 translated SVGs, 20 CV files.
- `npm run check:diagrams`: **PASS** — eight graph definitions and localized SVG connections.
- `npm run check:motion`: **PASS** — 12 source/integration checks (not live animation execution).
- `npm run check:visuals`: **PASS** — palette and diagram asset checks.
- `npm run check:cinematic`: **PASS** — eight images and their component references.
- TypeScript parser: **28 TS/TSX files, zero parse diagnostics** (not a TypeScript type-check).
- CV inspection: **20/20 PDFs have one page**; detectable text present and in page bounds; no old “Executive Director” or outdated school label detected in their extracted text.
- Static preview server: **PASS** with temporary HTML/CSS fixtures for root, `/en/`, and a missing URL; temporary test files were removed.
- `npm install --offline`: **FAILED** — required packages were not cached; online registry fetch also timed out. No genuine build or lockfile can be produced here.

## Public external-link spot checks

- **Prestige TN** — public website content was retrievable on November 6, 2026.
- **Qatesty at Render** — the public web fetch did not return a usable response; this does **not** establish that the project is offline. Verify in a real browser.
- **RBK / Credsverse credential verification URL** — retrieval blocked by the web tool, so its current availability is not confirmed.
- **GitHub project link** — not tested in this source audit; confirm its visibility and that you are comfortable exposing the repository.

## Remaining release blockers / manual reviews

**P0 — Required before replacing production:**
1. On a network-enabled machine, run `npm install` to create a real `package-lock.json`, commit it, and run `npm ci`, `npm run lint`, `npm run build`.
2. Test the `out/` export with `npm run preview`; verify `/en/`, `/fr/`, `/ar/`, all eight specialty routes in each language, projects, contact and all 20 CV downloads.
3. Run responsive and interactive browser tests (360px, 390px, tablet, desktop); check language switching, Arabic RTL, keyboard navigation, theme persistence, zoom dialog and reduced motion.

**P1 — Important for quality:**
4. Have French and Arabic translations professionally proofread. Cinematic generated artwork contains English embedded text; accessible, translated SVG alternatives already exist.
5. Validate the real status of the external Qatesty, certificate and GitHub links, and verify sharing permissions for screenshots.
6. Check accessibility contrast and screen readers, then Lighthouse/Web Vitals performance under actual network conditions.

**P2 — Worth improving in future:**
7. Add deep project case-study pages with verified screenshots and deliverables; current project pages mainly provide summary cards.
8. Consider self-hosting properly licensed fonts to reduce third-party requests and improve consistency when offline.
9. Review generated conceptual diagrams for small text readability; provide a zoom feature and translated SVG alternative (already available), but do not present illustration graphics as real project evidence or measured KPIs.

## Deployment safety

- Original engineering-degree scan is **not included** in the public site assets.
- CVs contain public contact details by design; review each document before publishing.
- Never claim generated illustration KPIs are genuine results. The illustrations are conceptual educational assets.
- Before deployment, back up the currently deployed Firebase site and use a preview channel first.
- The package is **source-reviewed and improved, not verified as a production-built website**.
