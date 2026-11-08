# Release gate after code audit (November 6, 2026)

- [x] `npm run check:content` — 24 role/locale workflow mappings and 20 CVs verified
- [x] `npm run check:diagrams`, `check:motion`, `check:visuals`, `check:cinematic` — pass locally
- [x] Page-specific SEO metadata and Arabic/French UI improvements added
- [x] Generated illustrations designated conceptual, not historical KPIs
- [ ] `npm install` online, generate and commit package-lock.json
- [ ] `npm run lint` and `npm run build` with installed dependencies
- [ ] `npm run preview` and test all routes at en/fr/ar
- [ ] Test mobile 360/390px and desktop in a real browser, including keyboard, motion and menus
- [ ] Manual proofreading of French and Arabic (generated images contain English text)
- [ ] Verify live Qatesty, GitHub and RBK credential links and permission to publish images
- [ ] Verify legacy CV redirects and recruiter expectations
- [ ] Run Lighthouse accessibility/performance audits
- [ ] Back up existing Firebase production site and deploy to a preview channel first

---

# Launch criteria

- [ ] `npm install` succeeds with lockfile generated and committed
- [ ] `npm run lint` (TypeScript noEmit) passes
- [ ] `npm run build` generates out/ (Next 16.4.5)
- [ ] Review all `en`, `fr`, `ar` routes, including all 8 disciplines
- [ ] Verify Arabic RTL and fonts; ensure technical acronyms are readable
- [ ] Verify flags and language switch preserve the current path
- [ ] Test keyboard navigation for workflow stages and language selector
- [ ] Test reduced-motion preference; disable animations accordingly
- [ ] Check hero / project images and all 20 PDF downloads
- [ ] Validate current Qatesty, Prestige and GitHub live links
- [ ] Check portrait publication rights, CV personal contact details, and owner approval
- [ ] Lighthouse performance/accessibility audit on desktop and mobile
- [ ] Check exported metadata (sitemap, robots, titles, descriptions and canonical URLs)
- [ ] Back up the current Firebase site before replacing it
- [ ] Deploy to preview channel first; test before production

## Remaining production work

The package contains a complete authored Next.js source app; a dependency-backed compilation and browser test are required in an environment with npm registry connectivity. No claim is made that the website has been deployed.

## Motion upgrade gates
- [ ] Install new dependency: `npm install` (Motion for React v14 compatible).
- [ ] `npm run check:motion` and `npm run check:diagrams` pass.
- [ ] `npm run lint` (TypeScript) and `npm run build` pass.
- [ ] Verify hover, press and selected-node state on all eight expertise pages.
- [ ] Check Arabic RTL text in diagram inspectors, French labels and English fallback.
- [ ] Test with OS reduced-motion enabled: no tilting, spinning, diagram particles or large transforms.
- [ ] Test keyboard navigation, including activating SVG nodes with Enter and Space.
- [ ] Check mobile page overflow, CV search filter and 20 PDF download links.
- [ ] Check animation performance on a real mid-range phone; reduce the number of simultaneous effects if needed.

## Cinematic workflow release checks (new)

- [ ] Run `npm run check:cinematic` and confirm 8 image assets and 24 localized SVGs.
- [ ] Run `npm run lint && npm run build` after installing dependencies in a networked environment.
- [ ] Inspect `/en/`, `/fr/`, `/ar/` and all 8 `/[locale]/expertise/[slug]/` pages.
- [ ] Test image/schema switch, stage selectors, expand modal, Escape to close, keyboard focus, hover/tap and reduced-motion mode.
- [ ] Confirm the generated images are labeled **illustrative**, not presented as actual system KPIs or user project screenshots.
- [ ] Check mobile at 360px/390px, tablet and desktop for overflow and readability.
- [ ] Verify all 20 PDF links, real project links, metadata and translations before deploying.
