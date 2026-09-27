---
name: industrial-ui-modernizer
description: Use for designing, auditing, recreating, migrating, modernizing, validating, or polishing industrial operational interfaces, especially Power Apps to React/TypeScript transformations and dense data-centric applications.
argument-hint: "[command] [target]"
user-invocable: true
---

# Industrial UI Modernizer

This skill turns UI work into an evidence-driven design engineering process.

## Required setup

Read the repository root `PRODUCT.md`, `DESIGN.md`, and `AGENTS.md` once per task. Then inspect the requested target and any screenshots/source artifacts before proposing implementation changes.

Do not infer missing business behavior from visual appearance.

## Command routing

| Command | Purpose | Reference |
|---|---|---|
| `shape` | Define information architecture, hierarchy, states, and interactions before implementation | `reference/shape.md` |
| `audit` | Technical/UX audit with evidence and severity | `reference/audit.md` |
| `critique` | Design review focused on hierarchy, clarity, density, coherence, and operational usability | `reference/critique.md` |
| `polish` | Improve an already-correct UI while preserving its visual and functional contracts | `reference/polish.md` |
| `adapt` | Define and implement responsive reflow across supported device classes | `reference/adapt.md` |
| `harden` | Add edge-case, latency, validation, permission, and overflow resilience | `reference/harden.md` |
| `extract` | Extract tokens, components, patterns, and archetypes from repeated evidence | `reference/extract.md` |
| `recreate` | Reproduce a reference screen/component in a target frontend stack | `reference/recreate.md` |
| `migrate` | Translate an existing UI implementation while preserving end-to-end behavior | `reference/migrate.md` |
| `validate` | Verify functional contract, source rules, responsive behavior, and visual fidelity | `reference/validate.md` |

If a request clearly implies one command, use it. If it spans several, use this order unless evidence requires otherwise:

`shape → migrate/recreate → harden → adapt → audit → validate → polish`

## Industrial quality floor

Every UI task must consider:

- information density and scanability;
- hierarchy and current context;
- selection/filter state;
- loading, empty, error, stale, disabled, and permission states;
- long labels and real-world identifiers;
- keyboard focus and target sizes;
- status communication without color-only encoding;
- large datasets and scrolling boundaries;
- component reuse and semantic tokens;
- responsive reflow;
- backend/action/data contracts when behavior is involved.

## Visual verification

When a screenshot or mockup is the reference, compare at the same viewport dimensions when possible. Do not rely on memory.

Use at most two bounded correction passes:

1. capture/inspect all target viewports together;
2. fix the collected defects as one batch;
3. recapture once to confirm.

Do not enter an open-ended visual polishing loop.

## Migration invariant

A migration must preserve or explicitly document changes to:

- inputs and outputs;
- action names and parameters;
- data types and formats;
- loading and error behavior;
- permissions;
- state transitions;
- side effects;
- idempotency/concurrency behavior where relevant.

A visually accurate component with a broken contract is a failed migration.

## Deterministic checks

Run the repository detector when source files are available:

```bash
npm test
npm run audit
```

Static findings complement, but never replace, runtime and visual verification.
