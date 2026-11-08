# WassimLab — Motion Design System

## Implementation

This codebase uses **Motion for React** (`motion/react`), the maintained successor to Framer Motion. The library is listed in `package.json`. Client components are confined to `components/MotionKit.tsx`, `components/Visuals.tsx`, `components/ResumeExplorer.tsx`, and `components/Shell.tsx`.

## Interaction language

| Component | Motion effect | Purpose |
| --- | --- | --- |
| Homepage portrait | Subtle pointer tilt (±4° X, ±5.5° Y), spring recovery, 3 continuously rotating orbit rings | Conveys connected delivery without overpowering the portrait |
| Role cards | Staggered in-view entrance, 1.6% zoom, 8px lift, subtle 3D rotation, press compression | Makes eight specializations feel selectable |
| Project case studies | Spring lift, zoom, pointer press, gentle light sweep | Affords interaction while keeping screenshots readable |
| CTAs | +4.5% hover scale, -6.5% pressed scale | Clear action confirmation |
| Navigation | Spring active underline shared with `layoutId`, button icon rotations | Maintains page context |
| Route content | Short fade/translate/blur on navigation | A smoother transition between professional sections |
| Workflow nodes | Spring scale, subtle rotation, selected-node emphasis | Reveals active process stage and linked nodes |
| Workflow links | Animated SVG line drawing plus preexisting directional particles | Communicates sequence and handoffs |
| Workflow inspector | AnimatePresence on selection with short slide/fade | Relates the selected node to its explanation |
| BRD/FRD/SRS explorer | Shared selected pill, document tilt/scale transition and crossfading description | Makes document concepts easier to compare |
| CV center | Animated add/remove/reflow when changing language or search | Reduces disorientation when filtering 20 files |

## Quality and accessibility

- Global `MotionConfig reducedMotion="user"` respects OS settings. Components also use `useReducedMotion()` so rotations and pointer tracking are disabled under reduced motion.
- Links remain Next `<Link>` elements. Motion wrappers animate the surrounding visual surfaces without intercepting navigation.
- Controls preserve native keyboard behavior. SVG diagram nodes support Enter and Space.
- Do not animate position/scale on content during typing or on scroll continuously. The site uses in-view reveals once per section.
- Do not use transform rotations for Arabic text itself; only rotate the visual node container by a negligible amount.
- Keep route transitions short enough not to impede navigation.
- New motion effects should prefer transforms/opacity and avoid animating width/height/box-shadow continuously.
- Continuous background orbit effects stop when reduced-motion is requested.
- Real application content, actual roles and privacy boundaries from the source were left intact.

## Setup

```bash
npm install
npm run check:diagrams
npm run check:motion
npm run lint
npm run build
npm run dev
```

To test reduced-motion behavior, set **Reduce motion** in OS/browser settings and revisit `/en/`, `/fr/`, `/ar/`, an expertise page, and the CV explorer.

## Current validation boundary

The package's TS/TSX syntax and structure are verified offline. The environment cannot resolve `registry.npmjs.org`, so `npm install`, a typechecked production build and real runtime interaction tests have **not** been completed here. Run them before deploying.
