# Industrial UI Modernizer — Skill V1

## Purpose

Transform enterprise/industrial application screens from functionally correct but visually flat UI into premium, production-grade experiences without breaking functional contracts.

The skill optimizes **composition**, not decoration.

Core equation:

```text
premium components
+ information hierarchy
+ spacing rhythm
+ controlled depth
+ semantic visual variety
+ strong dominant task
+ truthful states
= premium industrial UI
```

## Use when

Use this skill when the user asks to:

- modernize or premiumize an existing enterprise screen;
- make a Power Apps/React/internal tool screen match a high-fidelity reference;
- improve hierarchy, spacing, cards, typography, depth, inspector or hero composition;
- create a reusable visual modernization method across screens;
- compare implemented UI with a visual north star.

Do not use it to change business rules, data contracts, persistence, APIs or backend behavior unless a defect is explicitly proven and the task authorizes the change.

## Required inputs

Prefer, in order:

1. current source from the active editor/runtime;
2. latest validated source snapshot;
3. active candidate;
4. repository baseline;
5. screenshots/reference images.

A screenshot without source is sufficient for a visual audit but not for a safe implementation claim.

## Operating sequence

### 1. Preserve the functional contract

Inventory before changing UI:

- data sources;
- input/output contracts;
- variables/state;
- navigation;
- async/write actions;
- loading/error/empty states;
- responsive assumptions;
- shared components already used.

Create a **DO NOT CHANGE** list.

### 2. Classify the screen archetype

Choose one primary archetype:

- DATA_EXPLORER
- ENTITY_PASSPORT
- DASHBOARD
- INVESTIGATION_WORKSPACE
- GOVERNANCE_WORKBENCH
- CONFIGURATION_STUDIO
- MASTER_DETAIL
- WIZARD

Do not copy another screen's layout merely because it looks premium.

### 3. Declare composition contract

Before editing, define:

```text
PRIMARY_USER_TASK
SUCCESS_CRITERION
FIRST_VISUAL_FOCUS
DOMINANT_SURFACE
SECONDARY_SURFACE
CONTEXT_RAIL_OR_DRAWER
RESPONSIVE_PRIORITY
```

### 4. Audit every visible block

For each block record:

```text
PURPOSE
VISUAL_PRIORITY
SURFACE_LEVEL
BORDER_CLASS
COMPONENT_DECISION
STATE_MODEL
```

Surface levels:

- D0 canvas
- D1 inset/background grouping
- D2 semantic card
- D3 focal/elevated card
- D4 overlay/modal/drawer

Border classes:

- NECESSARY_INTERACTION
- NECESSARY_STRUCTURE
- REDUNDANT

### 5. Apply the border budget

Remove redundant nested frames.

Preferred separation order:

```text
spacing
-> surface contrast
-> one structural boundary
-> elevation only for focal layers
```

Do not create premium appearance by adding shadows everywhere.

### 6. Apply typography hierarchy

Typical enterprise range:

- focal/entity title: 28–32
- standard page title: 24–26
- section title: 14–17
- metric: 18–26
- primary body: 11–13
- secondary body: 10–12
- metadata: 8–10

Use fewer sizes with clear roles.

### 7. Apply spacing rhythm

Default scale:

```text
4 / 8 / 12 / 16 / 20 / 24 / 32 / 40
```

Avoid building every level with 8–12 px. Major semantic sections need visible breathing room.

### 8. Integrate visual identity

Industrial artwork, diagrams or product imagery should contribute to identity when the screen has a focal object.

Rules:

- do not reduce meaningful artwork to a tiny thumbnail by default;
- do not let decoration displace the primary task;
- background artwork must remain low contrast;
- image style must remain consistent across the product;
- visual identity cannot fabricate technical state.

### 9. Prefer semantic variety over decorative variety

Use different patterns because the information is different:

- KPI/summary
- status chip
- progress
- table/grid
- timeline/activity
- document row
- metadata
- inspector
- hero
- attention card
- state panel

Do not wrap every datum in an equivalent white card.

### 10. Reuse before creating

Decision sequence:

```text
REUSE
-> EXTEND_SHARED
-> CREATE_SHARED
-> LOCAL_ONLY
```

A reusable visual gap should become a governed shared component, not a local one-off.

### 11. Truthfulness

Never invent:

- KPI values;
- trends;
- approvals;
- health scores;
- statuses;
- actions;
- backend capabilities.

Unsupported data renders as explicit unavailable/empty/error/loading state according to the host contract.

### 12. Stop at the next real gate

Do not simulate validation.

Typical gates:

- import/compile in Power Apps Studio;
- runtime screenshot;
- responsive test;
- accessibility check;
- user acceptance of a focal composition;
- backend/data gate when the visual depends on a missing real contract.

Prepare exact PASS/FAIL criteria and stop.

## Premium Composition Score

Score each axis 0–2:

1. first-focus clarity
2. hierarchy
3. spacing rhythm
4. border economy
5. depth
6. typography
7. semantic variety
8. image integration
9. dominant task
10. truthfulness

Promotion target:

- no axis at 0;
- >=16/20 total;
- truthfulness = 2;
- runtime/full-screen evidence required.

## Power Apps profile

When the target is a Canvas App:

- respect Source Code Schema;
- prefer already proven control types and properties;
- do not claim a component works before Studio import;
- preserve existing flow/SP/data contracts during visual-only work;
- use shared components for recurring patterns;
- avoid nested Canvas components inside galleries unless the host platform/version has already validated that pattern;
- treat the current Studio YAML as the strongest implementation baseline when explicitly supplied.

## Universal invocation

```text
Use Industrial UI Modernizer on [SCREEN].

Preserve the complete functional contract.
Classify the correct archetype first.
Redesign composition, hierarchy, spacing, border budget, depth, typography,
semantic component variety and image integration.
Reuse shared components before creating new ones.
Do not invent backend capabilities or data.
Work autonomously until the next real human/runtime gate.
Return the prepared artifacts, exact gate steps and PASS/FAIL criteria.
```

## AssetPlan profile

For AssetPlan, additionally apply the repository authorities:

- `AGENTS.md`
- `power-apps/components/catalog/component-registry.yaml`
- `docs/ux-ui/ASSETPLAN_PREMIUM_SCREEN_STANDARD_V1.md`
- `docs/ux-ui/ASSETPLAN_VISUAL_DESIGN_SYSTEM_V1.md`
- `docs/ux-ui/ASSETPLAN_PREMIUM_COMPOSITION_SYSTEM_V2.md`
- `docs/ux-ui/AP_PAGE_HEADER_HIERARCHY_V1.md`
- applicable Guardians.

AssetPlan-specific prompt:

`docs/ai/prompts/APPLY_VISUAL_SYSTEM_V2_TO_ANY_SCREEN.md`


## Industrial Application Platform lookup

For AssetPlan, TMS and other products participating in the shared UI programme, component discovery must not stop at the product repository.

Before `CREATE_SHARED` or `LOCAL_ONLY`, inspect:

`rubensv74/industrial-application-platform`

Authorities:

- `components/canvas/candidates/`
- `docs/ui/contracts/`
- `docs/ui/patterns/`
- `docs/ui/gates/IAP_UI_30_CAPABILITY_SOURCE_BASELINE_CLOSEOUT.md`

The thirty-item programme is governed as **30 UX capabilities**, not 30 arbitrary Canvas definitions. Some are visual components, others are interaction/layout patterns or product compositions.

Mandatory resolution sequence:

```text
PRODUCT APPROVED COMPONENT
-> IAP SHARED CAPABILITY / CONTRACT
-> EXTEND EXISTING SHARED
-> CREATE SHARED
-> LOCAL_ONLY
```

Do not report an IAP component as missing after searching only the product repository.

For AssetPlan, preserve product-owned domain compositions such as Asset Passport and Visual Preservation Workspace while reusing IAP primitives underneath them.
