# Harden

Harden turns a nominal UI into an operationally resilient one.

Check:

- loading and slow responses;
- zero, one, many, and very large result sets;
- empty filter results;
- backend/network failures and retry paths;
- permissions and unauthorized actions;
- invalid, partial, or stale data;
- long labels, names, codes, and localized text;
- null values and missing optional fields;
- duplicate submissions;
- optimistic updates and rollback;
- concurrent edits where relevant;
- destructive actions;
- unsaved changes;
- disabled and read-only modes;
- keyboard-only operation;
- time/date/number formatting assumptions.

When behavior depends on a backend contract, verify the actual action name, parameters, types, and response shape. Do not fabricate fallback behavior.
