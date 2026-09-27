# Validate

Validation is the proof stage. Keep validation types separate so one successful check does not imply another.

## Gates

### Functional
Verify inputs, outputs, actions, parameters, returned shape, permissions, state transitions, and side effects.

### Static
Run:
```bash
npm test
npm run audit
```

### Runtime
Exercise critical interactions and record console/network/runtime errors where a runnable app exists.

### Responsive
Check all supported viewport classes, long content, and scrolling boundaries.

### Visual
When a reference exists, compare at matching viewport/state. Inspect geometry, hierarchy, typography, spacing, component variants, clipping, and state appearance.

### Accessibility
Check keyboard/focus, labels, status cues, contrast, target size, and semantic structure.

## Result vocabulary

Use only evidence-supported states:

- **PASS** — check executed and satisfied.
- **FAIL** — check executed and defect observed.
- **NOT RUN** — environment/evidence not available.
- **NOT APPLICABLE** — check does not apply, with reason.

Never collapse NOT RUN into PASS.
