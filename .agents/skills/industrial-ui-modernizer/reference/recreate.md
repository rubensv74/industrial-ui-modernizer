# Recreate

Use when a screenshot, mockup, or existing UI is the visual reference for a new implementation.

## Evidence model

A visual reference proves appearance at a captured state and viewport. It does not prove hidden interaction, data contracts, permissions, or edge cases.

## Procedure

1. Record reference viewport and visible state.
2. Decompose the screen into structural regions and reusable components.
3. Identify design tokens from repeated visual evidence rather than hard-coding every measurement.
4. Map known functional behavior from source/specification.
5. Implement the structure before micro-styling.
6. Implement real states: loading, empty, error, selected, disabled, long content.
7. Render at the reference viewport.
8. Compare geometry, hierarchy, typography, density, borders, surfaces, controls, and overflow.
9. Fix all observed defects in one batch.
10. Confirm with one additional comparison pass.

Do not chase pixel parity by breaking responsive behavior or the design system. Document intentional differences.
