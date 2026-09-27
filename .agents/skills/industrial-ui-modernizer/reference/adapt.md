# Adapt

Responsive work changes composition; it does not uniformly shrink the desktop UI.

## Procedure

1. Identify supported device classes and realistic minimum widths.
2. Mark each region as persistent, collapsible, reorderable, replaceable, or hideable.
3. Preserve task priority when space contracts.
4. Convert side-by-side secondary panels to drawers/sheets only when context remains understandable.
5. Keep data-grid scrolling local to the grid rather than the whole application shell.
6. Decide how filter bars, toolbars, tabs, breadcrumbs, trees, and action groups wrap or collapse.
7. Test long labels and identifiers at each breakpoint.
8. Preserve touch target sizes where touch is expected.
9. Verify keyboard behavior is not lost in alternative layouts.
10. Capture the responsive contract in component props/tokens, not page-specific hacks.

Flag any requirement that cannot be preserved on narrow screens instead of silently hiding it.
