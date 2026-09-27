# DESIGN — Industrial UI Modernizer

## Design position

The default visual direction is **premium industrial software**: calm, precise, information-rich, highly legible, and intentionally restrained. It should feel engineered rather than decorated.

The design system must work for dashboards, data grids, hierarchy trees, filters, drawers, editors, planners, timelines, matrices, setup flows, and exception-heavy operational screens.

## Principles

### 1. Hierarchy before decoration

A user should understand the page structure, current context, primary action, filters, and state before noticing stylistic effects.

### 2. Density with discipline

Industrial users often need more information per viewport than consumer apps. Use density deliberately through alignment, grouping, typography, and progressive disclosure rather than simply shrinking text and controls.

### 3. State must be explicit

Statuses, validation results, selection, loading, errors, warnings, disabled controls, stale data, and unsaved changes require distinct visual and textual treatment.

### 4. Components are contracts

A reusable component owns its behavior, states, accessibility, responsive rules, and data shape. Pages compose those contracts rather than restyling them ad hoc.

### 5. Preserve the operating model

A visual redesign may simplify presentation but must not silently remove information, actions, filters, or workflow steps required by the product.

### 6. Responsive means reflow

Desktop, tablet, and narrow layouts may change composition, order, visibility, and interaction pattern. Do not shrink a fixed desktop canvas.

## Baseline token model

Projects consuming this framework should map their own values into these semantic roles:

- `surface.page`
- `surface.primary`
- `surface.secondary`
- `surface.elevated`
- `border.default`
- `border.strong`
- `text.primary`
- `text.secondary`
- `text.muted`
- `text.inverse`
- `accent.primary`
- `status.success`
- `status.warning`
- `status.danger`
- `status.info`
- `focus.ring`

Do not hard-code a product palette into the framework.

## Layout rules

- Prefer a small number of strong structural regions over many nested cards.
- Align repeated content to a consistent grid.
- Reserve cards for genuine grouped objects or independent modules.
- Long operational tables should prioritize scan lines, frozen identity columns where needed, and predictable column alignment.
- Filters should expose active state and be reversible.
- Drawers are appropriate for contextual detail and editing only when the parent context remains useful.
- Avoid horizontal scrolling for the whole application shell. Data grids may scroll within an intentional viewport.
- Empty space should communicate hierarchy, not reduce useful information density.

## Typography

- Establish a compact but readable type scale.
- Body and control text should normally remain at or above 14px in desktop operational UI unless a documented dense-table exception exists.
- Use weight and spacing before introducing extra colors.
- Numeric values that must scan vertically should use tabular numerals when available.
- Avoid decorative type choices that reduce technical legibility.

## Interaction

- Every interactive element needs visible hover/focus/pressed/disabled states where applicable.
- Keyboard focus must be visible.
- Destructive actions require explicit intent and appropriate confirmation strategy.
- Loading should preserve enough page structure to avoid disorientation.
- Avoid animation that delays work; motion should explain state change.

## Visual anti-patterns

Treat these as warnings unless the product brief explicitly requires them:

- cards nested inside cards without semantic need;
- gradient decoration used as generic visual filler;
- excessive corner rounding;
- icon tiles added only to make empty areas look designed;
- gray text on colored surfaces with weak contrast;
- color-only status;
- arbitrary local spacing values that bypass tokens;
- large fixed pixel widths for primary layouts;
- `transition: all`;
- hiding overflow to conceal layout defects;
- repeated one-off shadows/elevation recipes;
- shrinking interfaces rather than designing responsive behavior.

## Verification floor

Before declaring a screen complete, check at minimum:

1. desktop reference size;
2. narrow/mobile behavior when the product supports it;
3. long labels and long values;
4. empty and loading states;
5. validation/error state;
6. keyboard focus on interactive controls;
7. status differentiation without color;
8. no clipped essential content;
9. design-token/component consistency;
10. screenshot comparison when a visual reference exists.
