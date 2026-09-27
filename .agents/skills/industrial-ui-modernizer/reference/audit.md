# Audit

Audit is an evidence-based defect and risk review. Do not use aesthetic preference as evidence.

## Passes

### Functional contract
Trace screen → component → state → action/flow/API → parameters → response → rendered state. Record mismatches, stale dependencies, hidden side effects, and unverified assumptions.

### Structure and usability
Check hierarchy, current context, primary action, filter visibility, scan path, density, table/tree behavior, drawers/modals, and irreversible actions.

### Accessibility
Check semantics, labels, keyboard focus, target sizes, contrast, non-color status cues, and reduced-motion behavior when relevant.

### Responsive
Check reflow rather than scale. Look for fixed-width shells, clipped controls, uncontrolled horizontal overflow, and desktop-only interaction assumptions.

### Resilience
Check loading, empty, error, long text, long identifiers, permission failures, latency, stale data, retry behavior, and destructive actions.

### Source rules
Run `npm run audit`. Treat detector results as evidence, not complete proof.

## Severity

- **Blocker** — breaks a critical task, contract, accessibility path, or data integrity.
- **High** — materially impairs completion or creates significant operational ambiguity.
- **Medium** — recurring friction, inconsistency, or maintainability risk.
- **Low** — refinement with limited operational impact.

## Output

For every finding provide: evidence, affected surface/component, consequence, correction, and verification method. Keep facts separate from recommendations.
