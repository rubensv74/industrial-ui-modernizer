# Migrate

Migration preserves behavior while changing implementation technology.

For Power Apps → React/TypeScript, use `docs/contracts/POWERAPPS-REACT.md`.

## Required trace

For each migrated behavior capture:

| Source | Target |
|---|---|
| screen/control | route/component |
| property/formula | prop/state/handler |
| variable/collection | state/query/cache |
| Patch/SubmitForm/Flow call | mutation/API action |
| connector/SP/flow parameters | typed request contract |
| returned record/table | typed response model |
| Visible/DisplayMode logic | conditional render/permission state |
| Notify/error handling | feedback/error boundary/toast |
| navigation | router transition |

## Migration gates

1. No source action disappears without an explicit decision.
2. Parameter names, types, nullability, and formats are verified.
3. Collections and derived state have an explicit ownership model.
4. Loading/error/empty behavior is defined.
5. Side effects and repeated submission behavior are understood.
6. Permissions are preserved.
7. Responsive behavior is redesigned rather than copied as fixed coordinates.
8. Visual parity is checked after functional parity.

Never translate formulas line-by-line when a clearer React state model preserves the same contract.
