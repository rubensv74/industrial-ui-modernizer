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

### 2A. IAP capability adoption audit

For products participating in the Industrial Application Platform programme, modernization is also a **runtime adoption task**. The agent must actively evaluate the governed 30-capability baseline rather than merely reuse components it already remembers.

Read:

- `rubensv74/industrial-application-platform/docs/ui/gates/IAP_UI_30_CAPABILITY_SOURCE_BASELINE_CLOSEOUT.md`
- applicable contracts in `docs/ui/contracts/`
- applicable patterns in `docs/ui/patterns/`

Create an `IAP_CAPABILITY_ADOPTION_MAP` covering all 30 capabilities with exactly one disposition:

```text
ADOPT_NOW
ALREADY_SATISFIED
DEFER_NO_REAL_CONTRACT
NOT_APPLICABLE
```

For every `ADOPT_NOW` capability record:

```text
CAPABILITY_ID
CAPABILITY_NAME
COMPONENT_OR_PATTERN
PLACEMENT_IN_SCREEN
HOST_DATA_CONTRACT
EVENT_CONTRACT
WHY_IT_IMPROVES_THE_TASK
```

Foundation capabilities require explicit treatment on every premium screen:

```text
01 Page Header
02 Global / Persistent Context Bar
03 Context Breadcrumb
04 Cross-screen Context Retention
20 Responsive Layout System
30 Skeleton / loading experience where asynchronous loading is material
```

Do not silently omit one of these. If not adopted, document why.

The adoption programme's goal is not “use every component everywhere”. It is to ensure every screen deliberately adopts the applicable new capabilities and does not regress to legacy local UI patterns.

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


## Formal high-fidelity recomposition workflow

When the task is to materially transform an existing screen so that it converges with a high-fidelity visual reference, use the formal assignment:

`workflows/PREMIUM_SCREEN_RECOMPOSITION_ASSIGNMENT.md`

This workflow is mandatory when:

- the current screen is functionally valid but visually far from the target;
- previous iterations only changed styling or isolated components;
- the user expects a structural redesign rather than a cosmetic polish;
- the screen must preserve business/data contracts while changing composition substantially.

The workflow requires:

- Functional Preservation Map;
- Visual Gap Analysis;
- Composition Contract;
- Component Reuse Map;
- truthful data classification;
- full-screen recomposition;
- mandatory pre-delivery self-review;
- complete Power Apps Source Code delivery;
- separate compile/runtime and visual gates.

Do not substitute the universal short invocation when the task clearly requires high-fidelity recomposition.


## AssetPlan loading curtain adoption

For AssetPlan screens that perform a material blocking data load, the product-specific loading curtain is mandatory:

`cmp_AP_LoadingCurtainPro`

Use it for:
- initial project/screen data preparation;
- project-context changes that invalidate the visible workspace;
- coordinated multi-source loads;
- blocking rebuild/finalization phases where the screen must not remain interactive.

Do not use it for:
- lightweight filter changes;
- local row refresh;
- small lazy sub-panel loads;
- background refreshes that do not invalidate the whole screen.

For those non-blocking cases prefer local busy state or `cmp_IAP_SkeletonLoader` where content-level loading needs a visible placeholder.

The host owns `VisibleState`, `ProgressText`, title/subtitle and all loading state. The curtain owns only presentation.

When modernizing an existing AssetPlan screen:
1. locate any local full-screen loading overlay/spinner;
2. preserve its exact busy-state predicate;
3. replace the local overlay implementation with `cmp_AP_LoadingCurtainPro`;
4. map the current stage/message into `ProgressText`;
5. keep the curtain as the final top-level visual child so it covers the whole screen;
6. never introduce a second competing full-screen loading overlay.

This requirement is part of AssetPlan Runtime Adoption and must be checked on every screen.
