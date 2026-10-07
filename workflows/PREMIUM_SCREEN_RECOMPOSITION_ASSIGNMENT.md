# Premium Screen Recomposition — Formal Assignment

Status: ACTIVE WORKFLOW  
Purpose: Rebuild an existing enterprise/industrial screen to a high-fidelity premium visual target without breaking its functional contract.

## 1. Mission

Transform **[TARGET_SCREEN]** from its current implementation into a premium product-quality experience that materially converges with **[VISUAL_REFERENCE]**.

The task is not a cosmetic restyle and not a component insertion exercise.

The agent must reconstruct the screen composition while preserving the validated functional contract.

Success means:

- the screen still works;
- the screen no longer looks like the previous layout with superficial styling changes;
- the resulting information hierarchy, proportions, density, visual rhythm and focal structure are recognizably aligned with the approved visual target;
- reused shared components are integrated as part of one coherent composition rather than placed independently;
- no unsupported capability or fake business data is introduced.

## 2. Non-negotiable rule

> Preserve behavior. Rebuild composition.

Do **not** preserve legacy geometry merely because it already works.

Preserve only what belongs to the functional contract:

- data retrieval;
- business rules;
- state variables;
- collections;
- navigation;
- filters;
- selection;
- pagination;
- async/write guards;
- error/loading/empty behavior;
- data mappings;
- backend/Flow/API/SQL contracts;
- validated media-resolution logic.

The current layout, card structure, borders, spacing, local headers and local information grouping are **not protected** unless they are required for behavior.

## 3. Required authorities

Before implementation, inspect all applicable sources.

### Product repository

- current Studio/source baseline;
- AGENTS/project instructions;
- component registry;
- visual standards;
- screen contracts;
- current validated components;
- current screen source.

### Shared UI/platform repository

For products participating in the Industrial Application Platform programme, inspect:

`rubensv74/industrial-application-platform`

Mandatory locations:

- `components/canvas/candidates/`
- `docs/ui/contracts/`
- `docs/ui/patterns/`
- `docs/ui/gates/IAP_UI_30_CAPABILITY_SOURCE_BASELINE_CLOSEOUT.md`

The agent must not claim a shared component does not exist after checking only the product repository.

## 4. Inputs

Required where available:

```text
TARGET_SCREEN
CURRENT_STUDIO_SOURCE
VISUAL_REFERENCE
PRODUCT_REPOSITORY
SHARED_COMPONENT_LIBRARY
KNOWN_RUNTIME_CONSTRAINTS
```

If CURRENT_STUDIO_SOURCE is explicitly supplied, it is the highest-priority functional baseline unless proven stale.

## 5. Phase A — Functional freeze

Before touching presentation, produce a Functional Preservation Map.

For every behavior, record:

```text
BEHAVIOR
SOURCE CONTROL / VARIABLE / COLLECTION
UPSTREAM CONTRACT
DOWNSTREAM CONSUMER
MUST_PRESERVE = YES/NO
RISK
```

At minimum inspect:

- project/context load;
- data load;
- selection;
- tree/navigation;
- search;
- filters;
- paging;
- tabs;
- lazy loading;
- illustration/media resolution;
- write/async actions;
- modal/drawer behavior;
- empty/error/loading states.

Output:

`DO_NOT_BREAK_CONTRACT`

No visual implementation starts until this map is complete.

## 6. Phase B — Visual gap analysis

Compare the current screen and the approved visual target as two complete compositions.

Do not compare isolated controls.

Score and describe:

1. page hierarchy;
2. first visual focus;
3. header/hero scale;
4. content proportions;
5. dominant workspace;
6. secondary rail/inspector;
7. KPI/summary treatment;
8. typography hierarchy;
9. image/artwork integration;
10. spacing rhythm;
11. border economy;
12. depth/elevation;
13. component variety;
14. tab/navigation hierarchy;
15. data-density readability.

Produce a table:

```text
AREA | CURRENT | TARGET | GAP | REQUIRED STRUCTURAL CHANGE
```

A finding such as “add shadow” is insufficient when the real gap is structural.

## 7. Phase C — Archetype and composition contract

Declare:

```text
PRIMARY_ARCHETYPE
PRIMARY_USER_TASK
SUCCESS_CRITERION
FIRST_VISUAL_FOCUS
DOMINANT_SURFACE
SECONDARY_SURFACE
CONTEXT_RAIL_OR_DRAWER
HERO_OR_PAGE_IDENTITY
SUMMARY_LAYER
RESPONSIVE_PRIORITY
```

Then define the target screen anatomy in text before writing code.

Example:

```text
GLOBAL CHROME
ENTITY / PAGE HERO
SUMMARY / KPI STRIP
PAGE-LEVEL TABS
MAIN WORKSPACE
  LEFT CONTEXT
  DOMINANT EXPLORER
  RIGHT INSPECTOR
OVERLAYS / DRAWERS
```

The legacy screen structure must not dictate this anatomy.

## 8. Phase D — Component discovery and reuse

For every target block use:

```text
REUSE PRODUCT COMPONENT
-> REUSE IAP COMPONENT
-> EXTEND SHARED
-> CREATE SHARED
-> LOCAL ONLY
```

For every selected component, read its actual contract/source before using it.

Produce:

```text
TARGET BLOCK
COMPONENT
SOURCE PATH
INPUT CONTRACT
EVENT CONTRACT
HOST RESPONSIBILITIES
RUNTIME EVIDENCE
DECISION
```

Forbidden:

- inventing input/output property names;
- rebuilding an existing shared capability locally;
- inserting components only to increase “component reuse” metrics;
- using a component without real host data merely to mimic a reference image.

## 9. Phase E — Truthful data mapping

For every visible target element classify its data as:

```text
REAL_CONNECTED
REAL_DERIVED_FROM_GOVERNED_DATA
UNAVAILABLE
NOT_APPLICABLE
FUTURE
```

No target reference can authorize fabricated:

- KPIs;
- readiness;
- health;
- document counts;
- preservation status;
- activity;
- relationships;
- approvals;
- trends;
- alerts.

If the reference contains a capability not yet connected, either:

- omit it;
- show a governed UNAVAILABLE state;
- or redesign the composition so the missing capability does not leave a visually broken hole.

## 10. Phase F — Full recomposition

Implementation rule:

> Rebuild the screen as one composition. Do not patch the legacy layout block by block.

The agent may retain functional controls/components but must reposition/recompose them when necessary.

The implementation must explicitly address:

### Hero / identity
- scale;
- title hierarchy;
- contextual chips;
- artwork/image integration;
- environmental/technical background where approved.

### Summary
- metric hierarchy;
- semantic states;
- visual differentiation;
- real data only.

### Main workspace
- correct column proportions;
- clear dominant surface;
- lower visual weight for secondary surfaces;
- no equal-weight “three boxes” unless the archetype genuinely requires it.

### Inspector/passport
- object identity first;
- semantic status;
- metadata grouped by meaning;
- illustration with enough scale;
- tabs only where their content exists;
- avoid long administrative key/value walls.

### Surface system
- remove redundant nested borders;
- use spacing and surface contrast before adding frames;
- use elevation only where it establishes hierarchy.

## 11. Phase G — Mandatory self-review before delivery

Before giving code to the user, compare the generated source/composition against the visual target again.

The agent must answer internally:

```text
If the old screenshot and the new screenshot were shown side by side,
would a reviewer immediately see a structural redesign?
```

If the answer is no, do not deliver.

Perform a Premium Composition Score from 0–2:

1. first-focus clarity;
2. hierarchy;
3. proportions;
4. spacing rhythm;
5. border economy;
6. depth;
7. typography;
8. semantic component integration;
9. image/artwork integration;
10. dominant task;
11. inspector quality;
12. visual-target convergence;
13. truthfulness.

Minimum candidate threshold:

- no category = 0;
- total >= 22/26;
- truthfulness = 2;
- visual-target convergence = 2.

This is a pre-runtime quality gate, not a substitute for Studio evidence.

## 12. Phase H — Delivery package

For Power Apps, deliver **complete source**, not fragments, unless the user explicitly requests a patch.

Required package:

```text
1. complete screen Source Code YAML;
2. list of reused components;
3. explicit functional contracts preserved;
4. deliberate omissions and why;
5. next Studio gate;
6. exact PASS/FAIL criteria.
```

Do not claim:

- “finished”;
- “validated”;
- “optimal”;
- “visual approved”

until runtime evidence supports the claim.

## 13. Runtime gate

The first Studio gate validates:

- schema/import;
- load;
- selection;
- filters;
- pagination;
- tabs;
- illustration;
- responsive fit;
- no regression.

The visual gate then requires screenshots of:

1. default/no-selection state;
2. representative selected state;
3. any important alternate tab/state.

Compare them directly to the approved target.

## 14. Visual gate failure rule

The gate is FAIL even when the screen compiles if:

- it still reads visually as the legacy screen;
- only colors/borders/shadows changed;
- the target hero hierarchy is missing;
- artwork remains a thumbnail when it should be focal;
- component reuse did not change the composition;
- the main task does not dominate;
- the right rail remains an administrative metadata panel when the target requires an entity experience;
- the screen is materially flatter, denser or less legible than the target.

A compile PASS is never a visual PASS.

## 15. Iteration discipline

If the visual gate fails:

1. identify the structural mismatch;
2. update the composition contract;
3. change the responsible block/system;
4. do not make random cosmetic adjustments;
5. do not regress preserved functional contracts.

Each iteration must eliminate a named gap.

## 16. Universal execution command

```text
Execute PREMIUM_SCREEN_RECOMPOSITION on [TARGET_SCREEN].

Use the current Studio source as the functional baseline and [VISUAL_REFERENCE]
as the visual acceptance target.

Preserve the complete functional contract but do not preserve legacy geometry,
local card structure or layout by inertia.

Inspect the product repository and the Industrial Application Platform library
before creating any new component.

Build a Functional Preservation Map, Visual Gap Analysis, target Composition
Contract and Component Reuse Map before writing implementation code.

Then rebuild the screen as one coherent composition.

Use only real governed data. Omit or mark unavailable any capability that is
not connected.

Before delivery, perform the mandatory self-review. Do not deliver if the new
composition would still be recognized as the old layout with cosmetic changes.

For Power Apps, deliver the complete Source Code YAML, not fragments.

Work autonomously until the next real Studio/runtime gate.
```
