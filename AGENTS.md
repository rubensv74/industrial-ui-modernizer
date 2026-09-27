# AGENTS.md

This repository contains the operating contract for AI agents working on industrial UI modernization.

## Required context order

Before changing UI or migration code, read:

1. `PRODUCT.md`
2. `DESIGN.md`
3. `.agents/skills/industrial-ui-modernizer/SKILL.md`
4. the command reference selected by the task
5. the target source files and any supplied visual evidence

Do not substitute generic frontend conventions for project evidence.

## Core rule

A UI change is not isolated from its functional contract. Trace the full chain that the screen depends on:

**screen → component → state → action/flow/API → parameters → data types → response → rendered state → errors/side effects**

When migrating Power Apps, also trace:

**control property → Power Fx formula → variable/collection → connector/flow/SP → returned shape → consuming control**

Names, parameter order, optionality, value formats, and returned fields must match evidence.

## Working modes

- **Shape** — define information architecture and interaction before implementation.
- **Audit** — find measurable defects and contract risks.
- **Critique** — evaluate hierarchy, clarity, density, coherence, and usability.
- **Polish** — refine an already-correct implementation without changing product behavior.
- **Adapt** — define responsive behavior by reflow/recomposition.
- **Harden** — handle errors, overflow, empty data, latency, permissions, i18n, and edge cases.
- **Extract** — turn repeated styling/behavior into tokens and reusable components.
- **Recreate** — implement a visual reference while preserving known behavior.
- **Migrate** — translate an existing implementation to a new technology while preserving its contract.
- **Validate** — prove the result against source behavior, deterministic rules, and visual references.

## Evidence hierarchy

When evidence conflicts, do not average it. Identify the conflict.

1. Explicit current user instruction.
2. Approved/current project specification.
3. Current functional contract and executable source.
4. Current design-system definitions.
5. Current runtime/screenshot evidence.
6. Historical examples.
7. Generic best practice.

## Completion rules

Never say a migration, screen, or component is complete merely because code was produced.

Report separately:

- implemented;
- statically checked;
- runtime checked;
- visually checked;
- still unverified.

Run `npm test` and `npm run audit` when applicable. Detector warnings can be accepted only with a stated reason; detector errors require correction or an explicit waiver.

## Upstream inspiration

The command-oriented skill structure and separation of durable product truth from visual direction were informed by Impeccable. See `docs/upstream/IMPECCABLE.md`. Industrial UI Modernizer has its own rules, workflows, and runtime.
