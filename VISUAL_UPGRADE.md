# WassimLab — Color and Visual Storytelling Upgrade

## What changed

- Interactive workflow SVG nodes are now meaningfully **color coded** across all eight disciplines, while their selectable nodes, motion links and text inspectors remain functional.
- **24 localized illustrations** (8 roles × English, French and Arabic) now share a consistent semantic palette: planning amber, requirements pink/cyan, data violet, code blue, security pink, QA green, cloud sky blue, handover coral.
- Eight expertise cards include **real local illustrated previews** plus distinctive multicolor vector role emblems.
- New **visual-atlas** cards on the homepage, expertise directory and SDLC page help visitors understand the disciplines immediately, with title and summary text localized to English, French and Arabic.
- Methods and deliverables use color-graded badges; textless project thumbnails use role-specific colored illustration instead of generic placeholder letters.
- Existing true project screenshots, portrait, credentials and 20 original role-tailored CV PDFs are preserved. These diagrams are educational and conceptual, not confidential internal project screenshots.

## Performance and accessibility

- All new page images are local SVG assets loaded with Next.js `<Image unoptimized>`; no third-party image URLs or hotlinks.
- Animated hover and connection effects honor `prefers-reduced-motion` as implemented in the Motion components; CSS-only decorative previews also disable transition animations.
- SVG node text is selectable and context is also available in HTML inspector text; icons alone never carry essential information.
- Light and dark themes retain CSS variable backgrounds; color is supplementary to labels and visible connections.

## Run and validate

```bash
npm install
npm run check:diagrams
npm run check:motion
npm run check:visuals
npm run lint
npm run build
```

## Current verification

- TypeScript/TSX source parsed and transpiled without syntax errors (24 implementation files).
- Local SVG XML parsed for all 32 assets (24 localized workflow diagrams plus existing SVG assets).
- Graph links, Motion checks and visual checks pass.
- **A real Next.js build is not verified**: npm dependency installation was not possible in the current offline environment. Before deploying, run `npm install && npm run build` on a machine with registry access, followed by desktop/mobile browser checks.

## Visual content safeguards

This design deliberately does not display invented quantitative achievements or screenshots claiming to be real client interfaces. User-supplied project screenshots are preserved; illustrative system maps are labeled conceptual.
