# WassimLab — Cinematic workflow artwork upgrade

## What's changed

The updated Next.js project preserves eight role pages, three languages (English, French and Arabic with RTL), Motion for React interactions, case studies, credentials and 20 PDF CVs. It adds **eight substantially different, high-quality flow illustrations**, each distinct in layout:

| Expertise | Visual form | Page |
|---|---|---|
| Project Management & Coordination | Radial delivery hub | `/en/expertise/project-coordination/` |
| Business Analysis | Left-to-right requirements traceability | `/en/expertise/business-analysis/` |
| Technical & Systems Analysis | Multi-system integration network | `/en/expertise/technical-analysis/` |
| QA & UAT | Circular feedback/testing cycle | `/en/expertise/qa-uat/` |
| Full-stack Engineering | Layered application architecture | `/en/expertise/fullstack/` |
| DevSecOps & Cloud | Continuous delivery / infinity-inspired cycle | `/en/expertise/devsecops/` |
| IT Operations & Support | Incident response pipeline | `/en/expertise/it-operations/` |
| Business Operations & Coordination | Circular people/process operations hub | `/en/expertise/business-operations/` |

## Interaction design

- Cinematic image viewer with subtle animated transitions, glow, and expand-to-view modal.
- Switch between **Illustrated concept** (English image artwork) and **Localized diagram** (English/French/Arabic SVG).
- Accessible, selectable process stages with localized output explanations from the original content registry.
- Existing interactive network and architecture diagrams remain part of every expertise page.
- Homepage features four images; Expertise directory features all eight.
- No need for additional animation libraries; relies on the existing `motion/react` dependency.
- Reduced-motion support, responsive presentation, semantic buttons and theme compatibility.

## Content integrity and transparency

The images are conceptual educational artwork, **not screenshots, dashboards or evidence of achieved KPIs**. Generated artificial statistics in the lower artwork strip have been cropped out. The imagery still contains English embedded labels; the French and Arabic experiences offer **translated SVG diagrams and step details** rather than falsely claiming that the image pixels are translated. Do not advertise technologies pictured as firsthand experience without confirming them against CV/project evidence. Keep any project-specific performance metrics sourced and verified.

## Deployment

```bash
npm install
npm run check:cinematic
npm run check:diagrams
npm run check:motion
npm run check:visuals
npm run lint
npm run build
```

This repository uses Next.js App Router static export. After build, upload `out/` according to `firebase.json`; preview and approve content before overwriting any live site. No live deployment has been performed.

## Files

- `components/WorkflowArtwork.tsx` — image/schema switcher, stage explorer, lightbox.
- `components/VisualHighlights.tsx` — new homepage and directory image gallery.
- `app/[locale]/expertise/[slug]/page.tsx` — includes cinematic hero on all eight pages.
- `app/globals.css` — theme, hover, tap, responsive, reduced-motion styles.
- `public/assets/workflows/` — eight optimized WebP images and manifest.
- `WORKFLOW_ART_GALLERY.jpg` — quick preview of the eight image styles.
