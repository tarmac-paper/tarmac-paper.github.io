# TARMAC Protocol Decomposition Prompt

## Role

You are an expert chemist and robotic-manipulation analyst. Your task is to decompose a laboratory protocol into the concrete physical manipulations a chemist would perform, and to map each manipulation to exactly one primitive from the TARMAC taxonomy.

## Task

Given a laboratory protocol written in natural language, produce a step-by-step decomposition table in which:

1. The **left column** lists the concrete physical manipulations needed to execute the protocol, in the order they would be performed. Expand every high-level instruction (e.g., "extract", "reflux", "filter") into the underlying discrete manipulations.
2. The **middle column** lists the TARMAC high-level category.
3. The **right column** lists the TARMAC atomic primitive.

## The TARMAC Taxonomy (authoritative — use ONLY these names)

TARMAC organizes laboratory manipulation into four high-level categories, each containing a fixed set of atomic primitives. Use the primitive names exactly as written (including the `-P` / `-C` suffixes).

### Positioning — controlled placement of objects by overcoming minor resistive forces (gravity, friction)

| Primitive | Definition | Representative example |
|---|---|---|
| `Transitional-P` | Placing an object at a target location with minimal orientation change. | Setting a beaker on a benchtop. |
| `Rotational-P` | Adjusting an object to align with a specific target orientation. | Rotating a tap to adjust flow. |
| `Insertive-P` | Positioning an object into a confined or partially constrained region. | Putting a cuvette into a spectrophotometer; seating a ground-glass joint. |
| `Sliding-P` | Translating an object across a surface while maintaining continuous contact. | Sliding a seal lid into position. |

> **Important — ground-glass / tapered joints are `Insertive-P`, not Coupling.** Tapered ground-glass connections (e.g., condenser onto a flask, RBF onto a rotovap, sintered funnel into a Büchner, adapter into a flask neck) seat under gravity and friction, not applied force. Map joining → `Insertive-P` and removal → `Transitional-P`. Coupling is reserved for joints that require *applied force* to overcome resistance, friction, or deformation: threaded caps (`Rotational-C`), force-fit stoppers/clamps (`Transitional-C`), elastic seals (`Elastic-C`), or piercing (`Penetrative-C`).

### Coupling — joining or separating objects by applying controlled force to overcome resistance, friction, or material deformation

| Primitive | Definition | Representative example |
|---|---|---|
| `Transitional-C` | Applying linear force along a primary axis to join or separate components. | Pushing a cap into place. |
| `Rotational-C` | Using torque to actuate threaded, interlocking, or rotationally constrained mechanisms. | Screwing the cap of a reagent bottle. |
| `Elastic-C` | Temporarily deforming compliant components to achieve attachment or release. | Fitting a rubber septum onto a flask. |
| `Penetrative-C` | Forcing an object into a material or structure, potentially inducing irreversible deformation. | Piercing a septum with a needle. |

> **Important — Coupling covers BOTH joining and separating.** A step that undoes a force-dependent attachment is still a Coupling action, not a Positioning action. Do NOT map removals of force-fitted / screwed / clipped / sealed components to `Transitional-P`. Map them back to the same primitive as the original joining action, except when the coupling is irreversible (see Penetrative-C below).
>
> Examples:
> - Screwing cap on → `Rotational-C`  ·  Unscrewing cap → `Rotational-C`
> - Pushing a stopper into a separating funnel → `Transitional-C`  ·  Pulling the stopper out → `Transitional-C`
> - Fitting a rubber septum → `Elastic-C`  ·  Removing the septum → `Elastic-C`
> - Snapping on a Keck clip → `Elastic-C`  ·  Removing the Keck clip → `Elastic-C`
> - Pushing tubing onto a side-arm → `Elastic-C`  ·  Pulling tubing off → `Elastic-C`
>
> **Penetrative-C is a special case.** The deformation happens only on insertion; withdrawal does not re-deform anything, so **piercing → `Penetrative-C`, but withdrawing the needle/cannula → `Transitional-C`** (pure linear separation).
>
> Examples:
> - Syringe needle pierces septum → `Penetrative-C`  ·  Syringe needle withdrawn → `Transitional-C`
> - Cannula inserted into septum → `Penetrative-C`  ·  Cannula withdrawn → `Transitional-C`

### Tooling — manipulations using tools or mediated forces to transfer or interact with materials without direct hand contact

| Primitive | Definition | Representative example |
|---|---|---|
| `Scooping` | Using an implement to penetrate particulate or fluid media and retrieve a controlled quantity. | Scooping powder with a spatula. |
| `Spotting` | Depositing small amounts through capillary or surface-tension transfer without contact. | Applying droplets onto a TLC plate. |
| `Pouring` | Directing gravity-driven liquid flow by tilting or reorienting a container. | Pouring solvent into a beaker. |
| `Squirting` | Using a pressure gradient to aspirate or eject fluids through a nozzle or orifice. | Dispensing water via a squeeze bottle. |

### Agitating — repetitive, oscillatory, or periodic motions that facilitate mixing, homogenization, cleaning, or mechanical modification

| Primitive | Definition | Representative example |
|---|---|---|
| `Shaking` | Manipulating a container through deliberate motion to mix or redistribute its contents. | Swirling a beaker to resuspend solids. |
| `Stirring` | Inducing mixing by moving a rod or analogous implement through a medium. | Stirring a mixture with a glass rod. |
| `Twisting` | Imparting axial rotation to influence material reorientation or flow. | Twisting glassware to spread grease. |
| `Wiping` | Applying a tool across a surface to remove, collect, or spread material. | Wiping a vial interior with a swab. |
| `Wrapping` | Encircling an object with a flexible medium to secure or isolate it. | Wrapping parafilm around a flask neck. |
| `Grinding` | Applying abrasive or shear forces to reduce particle size or modify texture. | Grinding solid in a mortar and pestle. |

## Decomposition Rules

1. **Granularity.** Decompose to the level of atomic manipulations — each step should correspond to one physical action that could be executed as a single primitive. Do not combine multiple primitives into one step (e.g., "place stopper and shake" must be two steps).
2. **Expand implicit steps.** Standard protocols routinely collapse multi-step operations into single verbs. You must expand these into their underlying atomic manipulations. The following high-level verbs are **multi-step operations** and MUST NOT be mapped to a single primitive — each corresponds to a sequence of 5+ atomic primitives covering setup, fluid transfer, agitation, and teardown:

   - `filter` / `filtration` (Büchner, silica, cotton wool, cannula, sintered, hot filtration, etc.)
   - `extract` / `extraction` / `wash` / `workup`
   - `dry` (over MgSO₄/Na₂SO₄, with drying tube, in desiccator)
   - `concentrate` / `evaporate` / `rotary evaporation`
   - `recrystallize` / `recrystallise`
   - `distill` / `distillation`
   - `reflux` (the setup and teardown; the heating itself is non-manipulation)
   - `centrifuge`
   - `purify` / `chromatography` (column, TLC, HPLC)
   - `dissolve` (when it implies agitation to achieve dissolution)

   Mapping any of the above to a single primitive is incorrect. Expand them based on the physical manipulations a chemist would actually perform.
3. **Inference is allowed but must be flagged.** When the protocol does not explicitly state a manipulation but it is *physically required to execute the procedure as described*, make a reasonable inference and set `"inferred": true` for that step.

   **Scope of inference — what counts as "physically required":**
   - Manipulations the chemist *must* perform to carry out the action stated in the source (e.g., "dissolved" implies `Shaking` or `Stirring`; "transferred via cannula" implies septum-piercing on both ends).
   - Setup operations made unavoidable by source context. In particular, when the source uses any of the following indicator phrases — **`dry`**, **`degassed`**, **`anhydrous`**, **`under inert atmosphere`**, **`under N₂`**, **`under Ar`**, **`air-sensitive`**, **`moisture-sensitive`**, **`Schlenk tube/flask/line/technique`**, **`flame-dried`** — you MUST infer the corresponding inert-atmosphere setup chain: septum fitting (`Elastic-C`), inert-gas / vacuum manifold connection via tubing (`Insertive-P` for the adapter joint, `Elastic-C` for the rubber tubing), evacuation/backfill cycles (`Rotational-P` for the stopcock turn + `non_manipulation: true` for the passive gas flow), and syringe/cannula transfers through the septum (`Penetrative-C` on insertion, `Transitional-C` on withdrawal).

   **What is NOT in scope (do not invent):**
   - Steps from a *different* procedure that the source merely references. If the source says "gels prepared as in [other section] were used" or "the catalyst from previous work was added", do NOT include the upstream synthesis/preparation. Decompose only the manipulations performed in *this* procedure.
   - Generic background routines (cleaning glassware, taring balance, calibrating instruments) unless explicitly mentioned in the source.
4. **Use taxonomy names verbatim.** Only use the primitive names listed above. Do not invent new primitives and do not abbreviate. `category` must be exactly one of: `Positioning`, `Coupling`, `Tooling`, `Agitating` (or `null` for non-manipulation / unmapped steps).
5. **Non-manipulation steps.** For steps that are not physical manipulations (passive heating, reflux, cooling, waiting, observing, vacuum evacuation / inert-gas backfill once the stopcock has been turned), set `"category": null`, `"primitive": null`, and `"non_manipulation": true`.
6. **Unmappable steps and known-unmapped operations.** Some manipulations cannot be expressed by any current primitive. Set `"category": null`, `"primitive": null`, `"unmapped": true`, and add a short `"reason"` string. Do not force-fit. The following operations are **known to fall outside the taxonomy** and must always be marked `unmapped`:

   - **Cutting / sectioning / slicing / dicing / shearing** of a material with a blade, scalpel, razor, die, or scissors *to separate material into pieces*. Reason: material separation by blade is not a manipulation primitive.
     - **Exception — notching:** a blade *inserted into* a material to create a controlled defect and then withdrawn (e.g., razor introduces a crack into a hydrogel for fracture-mechanics tests, then is removed) is analogous to needle-into-septum: insertion → `Penetrative-C`, withdrawal → `Transitional-C`. The blade does NOT separate the material in this case.
   - **Sonication / ultrasonic treatment / ultrasonic bath** of a vial or vessel. Reason: mediated by ultrasonic field, not by direct manipulation.
     - Note: *placing* the vial into a sonicator bath is `Insertive-P` and *removing* it is `Transitional-P` — those are separate steps and should be captured normally. Only the sonication itself is `unmapped`.
   - **Glovebox antechamber operations** (port load/unload, antechamber pump-down/refill, sleeve-port glove insertion). Reason: glovebox-specific mechanics fall outside the 18 primitives.
     - Note: manipulations performed *inside* the glovebox use the normal taxonomy.

   For other genuinely unmappable manipulations not listed above, also use `unmapped: true` with a brief reason.
7. **Output format.** Return **only** a single JSON object conforming to the schema below. No prose, no Markdown fences, no commentary — just the JSON.

### Output JSON schema

```json
{
  "protocol_name": "string — a short label for the protocol",
  "steps": [
    {
      "action": "string — the concrete manipulation in natural language",
      "category": "Positioning | Coupling | Tooling | Agitating | null",
      "primitive": "one of the primitive names listed in the taxonomy, or null",
      "inferred": "boolean — true if not explicitly stated in the protocol",
      "non_manipulation": "boolean — true for passive/waiting steps (optional; omit or false otherwise)",
      "unmapped": "boolean — true if no primitive fits (optional; omit or false otherwise)",
      "reason": "string — only when unmapped is true (optional otherwise)"
    }
  ]
}
```

Field rules:
- `inferred` is required on every step (default `false`).
- `non_manipulation`, `unmapped`, `reason` are optional and should only appear when true/applicable.
- `primitive` values must exactly match one of: `Transitional-P`, `Rotational-P`, `Insertive-P`, `Sliding-P`, `Transitional-C`, `Rotational-C`, `Elastic-C`, `Penetrative-C`, `Scooping`, `Spotting`, `Pouring`, `Squirting`, `Shaking`, `Stirring`, `Twisting`, `Wiping`, `Wrapping`, `Grinding`.

## Worked Example

**Input protocol (hydrolysis of a nitrile):**

> A 9 M solution of sulfuric acid in water was carefully prepared in a conical flask. A 100 mL single-neck round-bottomed flask with a stirrer bar was charged with 4-nitrophenylacetonitrile followed by 9 M sulfuric acid (25 mL) and the suspension was refluxed for 30 minutes. After this time, the solution was allowed to cool to room temperature before the addition of water (25 mL) and cooling in an ice-bath. The crude product was collected via vacuum filtration.
>
> The crude solid was dissolved in ethyl acetate (20 mL) and extracted with 2 M sodium hydroxide solution (20 mL). The two layers were separated, and the aqueous layer was acidified with 3 M hydrochloric acid (20 mL) and extracted with ethyl acetate (20 mL). The organic layer was dried over magnesium sulfate, filtered and concentrated to yield the product which was recrystallised from 20% ethanol in water.

**Expected output:**

```json
{
  "protocol_name": "Hydrolysis of a nitrile",
  "steps": [
    {"action": "A magnetic stirrer bar was placed in round bottom flask (RBF)", "category": "Positioning", "primitive": "Insertive-P", "inferred": false},
    {"action": "0.486 g 4-nitrophenylacetonitrile was weighed onto weighing boat", "category": "Tooling", "primitive": "Scooping", "inferred": false},
    {"action": "Weighing boat was tipped into RBF", "category": "Tooling", "primitive": "Pouring", "inferred": false},
    {"action": "25 mL of sulfuric acid solution was added to RBF", "category": "Tooling", "primitive": "Pouring", "inferred": false},
    {"action": "Condenser added to the top of RBF", "category": "Positioning", "primitive": "Insertive-P", "inferred": false},
    {"action": "Suspension was heated to reflux for 30 minutes", "category": null, "primitive": null, "inferred": false, "non_manipulation": true},
    {"action": "Condenser was removed", "category": "Positioning", "primitive": "Transitional-P", "inferred": false},
    {"action": "25 mL water added", "category": "Tooling", "primitive": "Pouring", "inferred": false},
    {"action": "RBF placed in an ice-bath for cooling", "category": "Positioning", "primitive": "Transitional-P", "inferred": false},
    {"action": "Sinter funnel placed on top of Büchner flask and rubber bung", "category": "Positioning", "primitive": "Insertive-P", "inferred": false},
    {"action": "Contents of RBF poured into sinter funnel", "category": "Tooling", "primitive": "Pouring", "inferred": false},
    {"action": "Solid collected scraped into RBF", "category": "Tooling", "primitive": "Scooping", "inferred": false},
    {"action": "20 mL ethyl acetate added to RBF", "category": "Tooling", "primitive": "Pouring", "inferred": false},
    {"action": "Solution poured into separating funnel", "category": "Tooling", "primitive": "Pouring", "inferred": false},
    {"action": "20 mL sodium hydroxide solution (2 M) added to separating funnel", "category": "Tooling", "primitive": "Pouring", "inferred": false},
    {"action": "Stopper placed on top of separating funnel", "category": "Coupling", "primitive": "Transitional-C", "inferred": false},
    {"action": "Separating funnel shaken", "category": "Agitating", "primitive": "Shaking", "inferred": false},
    {"action": "Stopper removed from separating funnel", "category": "Coupling", "primitive": "Transitional-C", "inferred": false},
    {"action": "Beaker placed underneath separating funnel", "category": "Positioning", "primitive": "Transitional-P", "inferred": false},
    {"action": "Tap of separating funnel opened", "category": "Positioning", "primitive": "Rotational-P", "inferred": false},
    {"action": "New beaker placed underneath separating funnel", "category": "Positioning", "primitive": "Transitional-P", "inferred": false},
    {"action": "Tap of separating funnel opened", "category": "Positioning", "primitive": "Rotational-P", "inferred": false},
    {"action": "20 mL hydrochloric acid (3 M) added to 1st measuring beaker", "category": "Tooling", "primitive": "Pouring", "inferred": false},
    {"action": "Mixture from measuring beaker added to separating funnel", "category": "Tooling", "primitive": "Pouring", "inferred": false},
    {"action": "20 mL ethyl acetate added to separating funnel", "category": "Tooling", "primitive": "Pouring", "inferred": false},
    {"action": "Stopper placed on top of separating funnel", "category": "Coupling", "primitive": "Transitional-C", "inferred": false},
    {"action": "Separating funnel shaken", "category": "Agitating", "primitive": "Shaking", "inferred": false},
    {"action": "Stopper removed from separating funnel", "category": "Coupling", "primitive": "Transitional-C", "inferred": false},
    {"action": "Beaker placed underneath separating funnel", "category": "Positioning", "primitive": "Transitional-P", "inferred": false},
    {"action": "Tap of separating funnel opened to remove 1st layer", "category": "Positioning", "primitive": "Rotational-P", "inferred": false},
    {"action": "New beaker placed underneath separating funnel", "category": "Positioning", "primitive": "Transitional-P", "inferred": false},
    {"action": "Tap of separating funnel opened to remove 2nd layer", "category": "Positioning", "primitive": "Rotational-P", "inferred": false},
    {"action": "Beaker underneath separating funnel removed", "category": "Positioning", "primitive": "Transitional-P", "inferred": false},
    {"action": "Magnesium sulfate added to beaker to reach 'snow globe effect'", "category": "Tooling", "primitive": "Scooping", "inferred": false},
    {"action": "Funnel placed on top of new RBF", "category": "Positioning", "primitive": "Insertive-P", "inferred": false},
    {"action": "Contents of beaker poured into sinter funnel", "category": "Tooling", "primitive": "Pouring", "inferred": false},
    {"action": "Funnel removed from RBF", "category": "Positioning", "primitive": "Transitional-P", "inferred": false},
    {"action": "RBF attached to rotary evaporator to remove solvent", "category": "Positioning", "primitive": "Insertive-P", "inferred": false},
    {"action": "Product from RBF scraped into conical flask", "category": "Tooling", "primitive": "Scooping", "inferred": false},
    {"action": "Conical flask placed on hotplate", "category": "Positioning", "primitive": "Transitional-P", "inferred": false},
    {"action": "20% ethanol in water mixture added dropwise to conical flask", "category": "Tooling", "primitive": "Squirting", "inferred": false},
    {"action": "Solid dissolved in the flask", "category": "Agitating", "primitive": "Shaking", "inferred": true}
  ]
}
```

Note the final step: "dissolved" does not explicitly state a manipulation in the protocol, so `inferred` is `true`; `Shaking` is the physically-required action to achieve dissolution.

## Worked Example 2 — Expanding a "filter" verb

This example demonstrates how a single collapsed verb ("filtered through silica") decomposes into a sequence of atomic primitives. The underlying action sequence is derived from annotated video recordings of the procedure in a teaching laboratory.

**Input protocol:**

> The reaction mixture was filtered through a silica pad, washing the silica with ethyl acetate (2 × 10 mL).

**Expected output:**

```json
{
  "protocol_name": "Filtration through a silica pad",
  "steps": [
    {"action": "Receiving flask clamped to retort stand", "category": "Coupling", "primitive": "Rotational-C", "inferred": true},
    {"action": "Sintered funnel containing silica pad inserted into receiving flask", "category": "Positioning", "primitive": "Insertive-P", "inferred": true},
    {"action": "Reaction mixture poured into sintered funnel", "category": "Tooling", "primitive": "Pouring", "inferred": false},
    {"action": "Source flask swirled to resuspend residual solids", "category": "Agitating", "primitive": "Shaking", "inferred": true},
    {"action": "Remaining reaction mixture poured into sintered funnel", "category": "Tooling", "primitive": "Pouring", "inferred": true},
    {"action": "Rinsing of source flask poured into sintered funnel", "category": "Tooling", "primitive": "Pouring", "inferred": true},
    {"action": "Vacuum tube attached to receiving-flask side-arm", "category": "Coupling", "primitive": "Elastic-C", "inferred": true},
    {"action": "Ethyl acetate (1st 10 mL portion) dispensed onto silica pad via pipette", "category": "Tooling", "primitive": "Squirting", "inferred": false},
    {"action": "Ethyl acetate (2nd 10 mL portion) dispensed onto silica pad via pipette", "category": "Tooling", "primitive": "Squirting", "inferred": false},
    {"action": "Vacuum tube detached from receiving-flask side-arm", "category": "Coupling", "primitive": "Elastic-C", "inferred": true},
    {"action": "Additional rinsing poured through sintered funnel", "category": "Tooling", "primitive": "Pouring", "inferred": true}
  ]
}
```

Key takeaway: the single phrase "filtered through silica" expands into 11 atomic steps spanning `Positioning`, `Coupling`, `Tooling`, and `Agitating`. It is NEVER correct to map "filter" or any variant (e.g., "vacuum filter", "Büchner filter", "hot filter") to a single primitive such as `Pouring`. The same pattern applies to `extract`, `wash`, `dry`, `concentrate`, etc.

## Worked Example 3 — Expanding a "column chromatography" verb

This example demonstrates how the heavily-collapsed phrase "purified by column chromatography" expands into both a **setup** phase (packing and preparing the column) and a **running** phase (loading, eluting, collecting). Most steps are marked `"inferred": true` because SI-style protocols rarely spell out the physical mechanics — only the material, eluent composition, and the fact of chromatography. The action sequence is derived from annotated teaching-laboratory videos of column setup and column running.

**Input protocol:**

> The crude residue was purified by column chromatography on silica gel, eluting with 5% ethyl acetate in hexanes.

**Expected output:**

```json
{
  "protocol_name": "Column chromatography on silica gel",
  "steps": [
    {"action": "Column tap closed", "category": "Positioning", "primitive": "Rotational-P", "inferred": true},
    {"action": "Funnel inserted into slurry flask", "category": "Positioning", "primitive": "Insertive-P", "inferred": true},
    {"action": "Silica gel scooped from bottle into slurry flask", "category": "Tooling", "primitive": "Scooping", "inferred": true},
    {"action": "Silica bottle lid screwed closed", "category": "Coupling", "primitive": "Rotational-C", "inferred": true},
    {"action": "Eluent poured into slurry flask to form a silica slurry", "category": "Tooling", "primitive": "Pouring", "inferred": true},
    {"action": "Slurry flask swirled to homogenize", "category": "Agitating", "primitive": "Shaking", "inferred": true},
    {"action": "Aluminium foil wrapped around slurry flask neck to prevent spillage", "category": "Agitating", "primitive": "Wrapping", "inferred": true},
    {"action": "Funnel inserted into column top", "category": "Positioning", "primitive": "Insertive-P", "inferred": true},
    {"action": "Silica slurry poured into column through funnel", "category": "Tooling", "primitive": "Pouring", "inferred": true},
    {"action": "Sand layer dispensed onto silica bed via pipette", "category": "Tooling", "primitive": "Squirting", "inferred": true},
    {"action": "Column clamped to retort stand", "category": "Coupling", "primitive": "Rotational-C", "inferred": true},
    {"action": "Vacuum pump tube attached to column outlet", "category": "Positioning", "primitive": "Insertive-P", "inferred": true},
    {"action": "Pinch clip applied to pump tubing", "category": "Coupling", "primitive": "Transitional-C", "inferred": true},
    {"action": "Column tap opened", "category": "Positioning", "primitive": "Rotational-P", "inferred": true},
    {"action": "Air pumped through column to compact silica bed", "category": "Tooling", "primitive": "Squirting", "inferred": true},
    {"action": "Pinch clip removed from pump tubing", "category": "Coupling", "primitive": "Transitional-C", "inferred": true},
    {"action": "Eluent pipetted into sample vial to dissolve crude residue", "category": "Tooling", "primitive": "Squirting", "inferred": true},
    {"action": "Sample vial shaken to dissolve residue", "category": "Agitating", "primitive": "Shaking", "inferred": true},
    {"action": "Sample solution pipetted onto top of column", "category": "Tooling", "primitive": "Squirting", "inferred": true},
    {"action": "Column tap opened to let sample absorb into silica", "category": "Positioning", "primitive": "Rotational-P", "inferred": true},
    {"action": "Eluent (5% ethyl acetate in hexanes) pipetted onto column top", "category": "Tooling", "primitive": "Squirting", "inferred": false},
    {"action": "Additional eluent poured into column via funnel", "category": "Tooling", "primitive": "Pouring", "inferred": true},
    {"action": "Pump tube re-inserted into column cap", "category": "Positioning", "primitive": "Insertive-P", "inferred": true},
    {"action": "Pinch clip re-applied to pump tubing", "category": "Coupling", "primitive": "Transitional-C", "inferred": true},
    {"action": "Air pumped through column to accelerate elution", "category": "Tooling", "primitive": "Squirting", "inferred": true},
    {"action": "Collection flask exchanged for next fraction", "category": "Positioning", "primitive": "Transitional-P", "inferred": true},
    {"action": "Further eluent poured into column via funnel", "category": "Tooling", "primitive": "Pouring", "inferred": true}
  ]
}
```

Key takeaway: "purified by column chromatography" collapses **~27 atomic steps** across setup (packing, slurry, compacting) and running (loading, eluting, fraction collection). Nearly every step is `inferred` because SI protocols rarely describe column mechanics — only the stationary phase, eluent, and end result. This is the most extreme example of collapsed-verb expansion: never map any chromatography-related verb (`column`, `flash column`, `purified by chromatography`, `silica chromatography`) to a single primitive.

---

## Your Task

Decompose the following protocol using the rules above. Return only the JSON object — no Markdown fences, no prose.

**Protocol:**

{{PROTOCOL}}
