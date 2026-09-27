# Upstream reference: Impeccable

Research snapshot: **2026-09-27**

Upstream repository: https://github.com/pbakaus/impeccable  
Reviewed main commit: `9d715cc4f5564a990ca8345abfdd5df6dc9b41c8`  
Upstream license: Apache License 2.0  
Copyright notice in upstream LICENSE: Copyright 2025 Paul Bakaus.

## What we learned from it

The reviewed version documents a design skill with:

- persistent product context;
- a separate design document;
- command-oriented design workflows;
- deterministic frontend detector rules;
- support for multiple AI coding harnesses, including Codex;
- bounded visual iteration rather than endless polish loops.

Those architectural ideas informed Industrial UI Modernizer.

## What this repository does differently

Industrial UI Modernizer is focused on operational/industrial applications and migration engineering. Its own implementation adds:

- end-to-end UI/data/action contract tracing;
- Power Apps → React/TypeScript mapping;
- industrial density and large-data rules;
- project-independent semantic design tokens;
- explicit validation gates;
- migration-specific evidence handling.

## Dependency status

There is currently **no runtime dependency** on Impeccable and no vendored Impeccable source in this repository.

The local skill, documentation, rule IDs, rule text, migration contract, and detector implementation are maintained independently.

If future work copies or modifies upstream source rather than merely interoperating with it, that change must preserve all Apache 2.0 obligations that apply to the copied/derived material, including the upstream license and applicable notices.
