# Industrial UI Modernizer

Industrial UI Modernizer is an AI-assisted design engineering framework for modernizing operational interfaces without losing the domain model, workflows, or behavioral contracts that make the existing application useful.

The project combines four concerns that are usually handled separately:

1. **Design intelligence** — critique, audit, layout, typography, responsiveness, accessibility, and anti-pattern detection.
2. **Industrial UX** — dense operational interfaces, status visibility, tables, trees, filters, drawers, matrices, dashboards, and exception handling.
3. **Migration intelligence** — especially Power Apps/YAML/Power Fx to React + TypeScript, preserving behavior rather than merely copying appearance.
4. **Visual verification** — compare implementation against reference screenshots and design-system rules before declaring a migration complete.

## Why this repository exists

Generic AI-generated UI tends to converge on the same SaaS patterns. Industrial applications have different constraints: high information density, long labels, operational states, keyboard/mouse use, project-specific configuration, large datasets, and workflows where visual ambiguity has a real cost.

This repository gives AI agents a durable design and migration contract so that a redesign is repeatable instead of prompt-dependent.

## Design Intelligence v1

The first implementation is inspired by the architecture of [Impeccable](https://github.com/pbakaus/impeccable): persistent product truth, explicit design guidance, command-oriented workflows, and deterministic detectors. Industrial UI Modernizer does **not** vendor or require the Impeccable runtime; the rules and industrial workflows here are maintained independently.

Key files:

- `PRODUCT.md` — durable product truth and operating constraints.
- `DESIGN.md` — design-system principles and UI quality floor.
- `AGENTS.md` — agent operating contract.
- `.agents/skills/industrial-ui-modernizer/SKILL.md` — command routing and workflow.
- `design-intelligence/rules/source-rules.json` — deterministic source checks.
- `bin/ium-audit.mjs` — zero-dependency web/frontend source detector.
- `bin/ium-powerapps-audit.mjs` — deterministic Power Apps `*.pa.yaml` component auditor.
- `docs/architecture/DESIGN-INTELLIGENCE-V1.md` — architecture and validation model.
- `profiles/assetplan/profile.json` — AssetPlan authority/adaptation profile.
- `bin/ium-profile.mjs` — product-profile authority resolver.

## Commands

The skill defines these primary intents:

`shape`, `audit`, `critique`, `polish`, `adapt`, `harden`, `extract`, `recreate`, `migrate`, and `validate`.

Examples:

```text
Audit this AssetPlan screen.
Recreate this Power Apps component in React.
Migrate this screen from Power Apps to React without changing behavior.
Validate this implementation against the reference screenshot.
Polish this dashboard but preserve the established design system.
```

## Source detector

Requires only Node.js 20+.

```bash
npm test
npm run audit
node ./bin/ium-audit.mjs ./src
node ./bin/ium-audit.mjs ./src --json
npm run profile -- assetplan ui component
npm run audit:powerapps -- ./power-apps/components
```

Detector findings are evidence, not a substitute for runtime or visual review. The Power Apps auditor is specifically designed to catch repeatable Source Code Schema contract and component-boundary defects before Studio. Rules that require runtime layout, semantic understanding, or screenshot comparison stay in the agent workflow rather than pretending a regex can prove them.

## Status

**Design Intelligence v1 foundation** — agent contract, product/design context, Power Apps → React migration contract, deterministic source detector, governed product profiles, and test fixtures.

Next milestones: DOM/runtime detectors, screenshot-diff scoring, component archetype registry, Power Apps parser adapters, and browser-driven verification.
