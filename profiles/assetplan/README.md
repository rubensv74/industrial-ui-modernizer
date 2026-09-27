# AssetPlan profile

Este perfil permite aplicar **Industrial UI Modernizer (IUM)** a AssetPlan sin crear una segunda fuente de verdad.

## Principio

IUM aporta el método de trabajo:

- shape;
- audit;
- critique;
- polish;
- adapt;
- harden;
- extract;
- recreate;
- migrate;
- validate.

AssetPlan conserva la autoridad sobre:

- dominio y comportamiento;
- Design System;
- tokens;
- componentes y lifecycle;
- navegación;
- gates;
- evidencia Power Apps Studio;
- contratos Power Apps / Flow / SQL;
- adopción de candidatos IAP.

## Precedencia

```text
AssetPlan canonical sources
        ↓
IAP contracts/assets explicitly adopted by AssetPlan
        ↓
Industrial UI Modernizer methods and generic quality rules
```

IUM nunca debe invertir esa relación.

## Resolución de componentes

No se fija aquí ninguna revisión RC/R/V.

Cada ejecución debe resolver el componente vigente desde:

```text
power-apps/components/catalog/component-registry.yaml
```

y aplicar:

```text
REUSE → EXTEND_SHARED → CREATE_SHARED → LOCAL_ONLY
```

Esto evita que el perfil quede obsoleto cuando AssetPlan promueva una revisión o adopte un componente IAP.

## Uso

Con el repositorio AssetPlan disponible, el agente debe cargar primero las fuentes indicadas en `profile.json` para el tipo de trabajo que va a realizar.

Ejemplos:

```text
industrial-ui-modernizer audit assetplan:Assets
industrial-ui-modernizer critique assetplan:PreservationRules
industrial-ui-modernizer adapt assetplan:PreservationPlans
industrial-ui-modernizer migrate assetplan:cmp_AP_DataGridPro
industrial-ui-modernizer validate assetplan:Assets
```

La sintaxis anterior expresa intención de routing; no implica que exista todavía un CLI público con esos comandos.

## IAP

IAP gobierna contratos y candidatos transversales únicamente dentro de su frontera product-independent. Un candidato IAP no desplaza por sí solo un componente AssetPlan vigente.

Para un trabajo que afecte a Shared Experience:

1. leer la decisión/contrato IAP relevante;
2. comprobar cómo AssetPlan lo adopta;
3. resolver el estado actual en AssetPlan;
4. no promover el candidato por inferencia.

## Migration

Para Power Apps → React/TypeScript se usa además:

`docs/contracts/POWERAPPS-REACT.md`

La migración debe preservar el contrato observable y registrar cualquier cambio intencional. La estética no puede ocultar una regresión funcional.
