# WassimLab — Premium interactive workflow system

## Design intent
Every workflow must explain **what happens, why it matters, who is involved, what comes next and what the deliverable is**. Decoration should clarify, not obscure. The site remains a general, multi-discipline portfolio.

## Eight visual models

| Role | Topology | What connections mean |
|---|---|---|
| Project Coordination | Hub-and-spoke governance | Inputs, dependencies and feedback from stakeholders, delivery teams, QA and risks |
| Business Analysis | End-to-end traceability chain | Business need → requirements → stories → acceptance → feedback |
| Technical Analysis | System integration map | Requests move through API/service/authentication/data/monitoring boundaries |
| QA / UAT | Closed testing loop | Test design → execution → defects → retest → acceptance and refinement |
| Full-Stack Engineering | Connected application layers | Browser, React UI, backend, identity, database and cloud deployment |
| DevSecOps | Continuous delivery cycle with security hub | Plan, code, build, scan, deploy and observe, with cross-cutting controls |
| IT Operations | Incident lifecycle | User request → triage → diagnosis → fix → validation → knowledge capture |
| Business Operations | Client-and-supplier coordination network | Requests, documentation, actions, suppliers and handover |

All diagrams are **conceptual teaching artifacts**. They must never be described as literal screenshots of a confidential project or as certified architectures.

## Interactions
- Every interactive node uses an SVG `g` with `role="button"`, keyboard focus and Enter/Space activation.
- An `aria-live` panel updates with the selected node, purpose and connected stages.
- Directional lines have visible arrowheads; animated light particles indicate flow direction.
- Cards respond through border/halo state on hover, keyboard focus and selection.
- Mobile: horizontal scroll inside the diagram viewport instead of squashing labels; detail inspector stacks vertically.
- `prefers-reduced-motion` disables moving particles and animation while preserving topology.
- Light mode adjusts text contrast, node colors and backgrounds; dark mode retains the Lenkrio-inspired luminous visual language.

## Translation
The JSON graph config is the source of truth. Each node contains a label in English, French and Arabic. SVG banners are generated per language from the same node topology. Arabic renders RTL labels; underlying connection geometry remains directional and consistent across translations.

## Maintenance
1. Edit `lib/diagram-specs.json` (node positions use a 1120 × 605 viewBox). Use unique node IDs.
2. Keep labels concise for translation, ideally 1–3 words per node.
3. Connect nodes using `edges` (`[fromId,toId]`) and ensure those IDs exist.
4. Edit the relevant role's content in `lib/roles.ts` for semantic descriptions and examples.
5. Regenerate the localized SVG banners using the included source-generation script if the graph changes.
6. Run `npm run check:diagrams`, followed by a real Next.js build and desktop/mobile interaction testing.

## Security and factual boundaries
The diagram layouts illustrate professional concepts rather than any client's internal production infrastructure. Do not add private credentials, client identifiers, confidential screenshots, private endpoints or unsupported results. The academic degree's original scan is excluded intentionally.
