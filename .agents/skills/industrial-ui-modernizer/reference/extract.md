# Extract

Extract reusable design and behavior from repeated evidence.

Prioritize extraction in this order:

1. semantic tokens;
2. primitives;
3. controls;
4. repeated composite components;
5. page patterns/archetypes;
6. domain adapters.

A component is worth extracting when it repeats a stable visual + behavioral contract, not merely similar markup.

Record:

- inputs/outputs;
- supported states;
- accessibility behavior;
- responsive behavior;
- data assumptions;
- variants;
- what must remain domain-specific.

Avoid turning every visual fragment into a component. Reuse should reduce divergence, not create abstraction overhead.
