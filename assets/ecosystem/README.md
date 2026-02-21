# Ecosystem SVG Assets

Location: `/Users/omoshola/Documents/agentralabs-tech/agentralabs-tech/assets/ecosystem`

## Files

- `ecosystem-primitives.svg`
- `ecosystem-architecture.svg`
- `ecosystem-workflow.svg`
- `ecosystem-capability-matrix.svg`
- `ui/ui-workflow-strip-agentic.svg`
- `ui/ui-bento-grid-agentic.svg`
- `ui/about-ecosystem-isometric.svg`

## UI-aligned set

These two files directly align with the workflow strip and bento-grid style used in the current landing template:

- `ui/ui-workflow-strip-agentic.svg`: drop-in visual counterpart for the hero workflow strip.
- `ui/ui-bento-grid-agentic.svg`: full composite asset mirroring the four-panel bento section.
- `ui/about-ecosystem-isometric.svg`: ecosystem-specific isometric visual for the about image panel (`2048x2048`).

## Asset contract

1. Preserve hard-edge geometry (square corners, border-led layout).
2. Use monospace-first typography (`JetBrains Mono`, fallback `monospace`).
3. Keep accent usage constrained to active signals (`#ea580c`).
4. Do not introduce new palette colors outside the core set:
   - `#f2f1ea` background
   - `#0a0a0a` foreground
   - `#c4c2b8` grid/muted
   - `#ea580c` accent
5. Keep SVGs portable and self-contained (no external font/image references).

## Recommended sizes

- Hero/social/banner: `1200x630`
- Documentation diagrams: `800x600` (or preserve `1200x630` and scale)

## Usage notes

- Prefer embedding as static assets in docs and landing sections.
- If editing in Figma/Illustrator, export plain SVG and re-check token colors.
- Keep text uppercase for system labels to match template doctrine.
