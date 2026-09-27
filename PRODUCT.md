# PRODUCT — Industrial UI Modernizer

## Product purpose

Industrial UI Modernizer helps teams modernize operational business applications while preserving the workflows, terminology, data contracts, permissions, states, and interaction semantics of the original system.

It is not a generic website generator. Its primary mode is **Operate**: users come to complete work accurately and quickly.

## Primary use cases

- Audit an existing industrial application or screen.
- Improve a screen without changing its functional contract.
- Recreate a reference design in React + TypeScript.
- Translate Power Apps components, YAML, formulas, and screen structures into reusable React patterns.
- Extract design tokens and reusable components from an incumbent application.
- Validate a migration against source behavior and reference screenshots.
- Build a reusable premium component library that can serve multiple industrial products.

## Typical inputs

- Screenshots and mockups.
- Power Apps source/YAML and Power Fx.
- React/TypeScript source.
- Existing design tokens and component libraries.
- Functional specifications and process documentation.
- API, flow, stored procedure, and data-contract definitions.

## Required outputs

Depending on the task, outputs may include:

- Evidence-based UI audit.
- Corrected design specification.
- Component/page implementation.
- Source-to-target migration map.
- Responsive behavior contract.
- Accessibility and edge-case findings.
- Visual-validation report.
- Explicit list of assumptions and unverified areas.

## Users

- Functional analysts.
- Product and application owners.
- Industrial engineering/operations teams.
- Power Platform developers.
- Frontend developers.
- Designers working on dense operational software.

## Operating constraints

1. Preserve domain semantics before visual novelty.
2. Do not invent business rules, statuses, permissions, API contracts, or data.
3. A screenshot is evidence of appearance, not sufficient evidence of behavior.
4. Existing source code is evidence of behavior, not automatically evidence of good design.
5. A migration is incomplete until inputs, outputs, state, errors, loading, empty states, permissions, and side effects have been traced.
6. Prefer reusable components and tokens over one-off page styling.
7. Responsive behavior must be designed explicitly; scaling the desktop canvas is not responsiveness.
8. Dense operational interfaces may legitimately be denser than consumer UI, but legibility and target size remain non-negotiable.
9. Visual status may never depend on color alone.
10. Never claim visual parity or functional equivalence without a validation step.

## Initial consumers

The framework is deliberately domain-agnostic. AssetPlan, TMS, CMMS-style applications, dashboards, configuration tools, and other industrial apps may consume it without embedding their business logic into the core framework.

## Definition of done

A modernization task is done only when:

- the functional contract is preserved or intentionally changed and documented;
- the design-system contract is satisfied;
- responsive behavior is defined and checked;
- critical accessibility requirements are checked;
- deterministic detector errors are resolved or explicitly waived;
- reference screenshots or runtime UI are compared when visual fidelity is part of the task;
- remaining uncertainty is reported rather than hidden.
