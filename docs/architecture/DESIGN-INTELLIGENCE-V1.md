# Design Intelligence v1

## Decision

Industrial UI Modernizer adopts a model-independent design-intelligence architecture inspired by Impeccable's separation of product context, design direction, command workflows, and deterministic detectors.

It does **not** depend on Impeccable at runtime. The framework owns its industrial rules, migration contracts, and validation vocabulary.

## Architecture

```text
Evidence
  ├─ screenshots / mockups
  ├─ Power Apps YAML / Power Fx
  ├─ React / TypeScript
  ├─ product specifications
  └─ API / flow / SQL contracts
        ↓
Context layer
  ├─ PRODUCT.md
  ├─ DESIGN.md
  └─ project-specific evidence
        ↓
Agent skill layer
  ├─ shape
  ├─ audit / critique
  ├─ recreate / migrate
  ├─ harden / adapt
  └─ validate / polish
        ↓
Deterministic checks
  └─ design-intelligence/rules/source-rules.json
        ↓
Implementation
  ├─ tokens
  ├─ reusable components
  ├─ page archetypes
  └─ domain adapters
        ↓
Verification
  ├─ static
  ├─ runtime
  ├─ responsive
  ├─ accessibility
  └─ visual comparison
```

## Five layers

### 1. Product truth

`PRODUCT.md` contains durable facts that should survive a visual redesign: product purpose, users, inputs, outputs, operating constraints, and definition of done.

Product truth must not be mixed with temporary styling decisions.

### 2. Design contract

`DESIGN.md` defines how operational information should be expressed: hierarchy, density, status, state, interaction, responsive behavior, and semantic token roles.

Consumer products can provide their own concrete palette and component implementation while preserving the semantic contract.

### 3. Agent workflow

The skill converts vague requests such as "make this better" or "recreate this in React" into explicit workflows. The workflow is evidence-first and bounded: inspect, implement, verify, correct once, report remaining uncertainty.

### 4. Deterministic detector

The source detector catches patterns that can be identified without an LLM, such as:

- `transition-all`;
- pure black;
- generic gray text declarations;
- large fixed layout widths;
- `100vh` shell traps;
- extreme z-index;
- hidden overflow used as a layout patch;
- inline style attributes;
- clickable non-semantic elements;
- focus-outline suppression;
- undersized text declarations;
- long decorative animation durations.

It intentionally does not claim to prove visual hierarchy, semantic correctness, status clarity, or screenshot fidelity.

### 5. Verification

The result is evaluated through independent gates. Static success never implies runtime or visual success.

```text
Functional  ─┐
Static      ├─> validation report
Runtime     │
Responsive  │
A11y        │
Visual      ┘
```

Each gate reports `PASS`, `FAIL`, `NOT RUN`, or `NOT APPLICABLE`.

## Why this differs from generic UI prompting

Industrial UI Modernizer adds constraints that are usually absent from design-oriented agents:

- preserve end-to-end business contracts;
- trace UI actions into flows/APIs/stored procedures;
- treat large datasets and dense workflows as first-class;
- distinguish appearance evidence from behavior evidence;
- define explicit Power Apps → React translations;
- reject "desktop canvas scaled down" as responsive design;
- require unverified claims to remain unverified.

## Command lifecycle

For a typical modernization:

```text
shape
  ↓
migrate or recreate
  ↓
harden
  ↓
adapt
  ↓
audit
  ↓
validate
  ↓
polish
```

Not every task requires every phase. A narrow change should use the smallest workflow that can still prove correctness.

## Rule ownership

Rule IDs use the `IUM-` namespace. This avoids pretending our rules are Impeccable rules and lets the framework evolve independently.

Rule categories:

- `a11y`
- `layout`
- `responsive`
- `typography`
- `motion`
- `color`
- `interaction`
- `maintainability`
- `industrial`

The detector is only one enforcement surface. Some industrial rules require runtime DOM inspection or agent reasoning and therefore live in the skill until an objective detector exists.

## Roadmap

### V1 — foundation
- product/design context;
- agent skill and command references;
- Power Apps → React contract;
- deterministic source detector;
- zero-dependency tests.

### V2 — runtime inspection
- DOM/a11y checks;
- viewport matrix;
- grid overflow checks;
- target-size checks;
- semantic-state inspection.

### V3 — visual verification
- screenshot capture;
- reference alignment;
- region-aware visual diff;
- bounded correction loop.

### V4 — migration adapters
- Power Apps source parser;
- Power Fx dependency graph;
- control/property mapping;
- generated React component contracts;
- migration trace report.

### V5 — learning layer
- documented false positives;
- accepted waivers;
- lessons learned;
- project-specific rule profiles.
