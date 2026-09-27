# Power Apps → React/TypeScript migration contract

This document defines the default semantic mapping used by Industrial UI Modernizer. It is a translation contract, not a claim that every Power Apps formula should be mechanically rewritten.

## Core principle

Preserve **observable behavior and data contracts**, then express them using an appropriate React architecture.

Do not reproduce Power Apps' control-by-control architecture when a clearer component/state model preserves the same result.

## Mapping table

| Power Apps | React/TypeScript target |
|---|---|
| Screen | route/page component |
| Component | reusable React component |
| Control property | prop, derived value, CSS/state |
| `Set()` global variable | app/store/context state only when truly global |
| `UpdateContext()` | local component/page state |
| Collection | typed array/query cache/store |
| `ClearCollect()` | explicit replace/load operation |
| `Collect()` | append/create mutation |
| `Remove()/RemoveIf()` | delete mutation/state update |
| `Patch()` | typed mutation/API call |
| Form `SubmitForm()` | validated submit handler/mutation |
| `Navigate()` | router navigation |
| `Back()` | router/history navigation |
| `Notify()` | feedback/toast/inline status |
| `Visible` | conditional render/visibility state |
| `DisplayMode` | enabled/read-only/disabled state |
| `Items` | typed query/selector/derived collection |
| `Default/DefaultSelectedItems` | initial/controlled value contract |
| `OnSelect` | event handler/command |
| `OnChange` | controlled input handler |
| `OnVisible` | route/load effect only when side effect is actually needed |
| `With()` | local derived variables/helper function |
| `Concurrent()` | intentional parallel async work |
| Power Automate flow | typed service/action adapter |
| SQL connector / stored procedure | typed API/data-access adapter |
| Timer used for polling | explicit polling/query policy |
| Gallery | list/table/grid/tree depending semantics |
| Container coordinates | responsive layout system |

## Required evidence per behavior

Before migrating an action, capture:

- source screen/control;
- triggering property/formula;
- input variables and selected-record context;
- called connector/flow/procedure;
- exact action name;
- parameter names and order where order matters;
- data types and date/number/text formats;
- nullable/optional behavior;
- response fields actually consumed;
- success state;
- error state;
- side effects;
- repeated-submission/concurrency behavior where relevant.

## State ownership

Do not default everything to a global store.

Use:

- local state for transient UI state;
- URL state for shareable/navigation-relevant filters and identity;
- query/cache state for server data;
- form state for draft input;
- app/global state only for genuinely cross-cutting product state.

A Power Apps global variable is evidence that the source implementation chose global scope; it is not proof that the target architecture should.

## Collections

For each source collection document:

1. schema;
2. source;
3. lifecycle;
4. mutation points;
5. sort/filter transformations;
6. consumers;
7. whether it is authoritative or a view/cache.

This avoids recreating stale duplicated state in React.

## Data calls

Create a typed boundary around every external action.

Example contract shape:

```ts
export interface LoadPunchesRequest {
  projectId: number;
  subsystemCodes?: string[];
  pageNumber: number;
  pageSize: number;
}

export interface LoadPunchesResponse {
  rows: PunchRow[];
  totalCount: number;
}
```

The actual field names and types must come from project evidence. Never invent them from this example.

## Visible and DisplayMode logic

Translate business conditions into named derived predicates where possible.

Prefer:

```ts
const canEdit = permissions.canEdit && record.status !== "Closed";
```

over duplicating the same compound expression across controls.

If the source hides an unavailable action, check whether the target should hide or disable it based on the approved product behavior. Do not change that behavior silently.

## Responsive migration

Do not map `X`, `Y`, `Width`, and `Height` into equivalent fixed CSS coordinates unless the source element is genuinely positioned content.

Infer structural relationships:

- horizontal groups → flex/grid;
- repeated rows → list/data-grid;
- sidebar + content → responsive shell;
- stacked containers → flow layout;
- overlays → modal/drawer/popover primitives.

## Validation matrix

For every migrated screen/component:

| Gate | Required proof |
|---|---|
| Functional | source-to-target trace |
| Static | tests + detector |
| Runtime | critical interactions exercised |
| Responsive | supported viewports checked |
| Accessibility | keyboard/labels/status checked |
| Visual | reference comparison if supplied |

Use `NOT RUN` when proof is unavailable. Never infer PASS.
