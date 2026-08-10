# CHAT_TITLE_PROTOCOL_V1.2.1

## Purpose

Generate a compact, grounded, retrieval-oriented title for a conversation transcript.

The title is not a summary.  
It is a retrieval key designed to help distinguish and recognize one conversation within a large corpus of unrelated or partially related conversations.

The protocol must remain domain-agnostic.

---

## Protocol Marker

`[[CHAT_TITLE_PROTOCOL_V1.2.1]]`

Any message containing a marker matching `[[CHAT_TITLE_PROTOCOL_*]]` and any assistant response generated directly from such a message are excluded from title analysis.

---

## CONFIG

```text
EXECUTION_MODE = LOCAL
OUTPUT_MODE = TEST

MIN_SEGMENTS = 2
MAX_SEGMENTS = 4

RELATED_SEPARATOR = " / "
INDEPENDENT_SEPARATOR = " | "
OVERFLOW_MARKER = " +N"

SEGMENT_WORD_TARGET = 1..2
ALLOW_ATOMIC_MULTIWORD_TERMS = true
```

---

## INPUT

### SOURCE

All conversation turns occurring before the protocol message.

### EXCLUDE

Exclude from SOURCE:

- this protocol message;
- every earlier user message containing `[[CHAT_TITLE_PROTOCOL_*]]`;
- every assistant response directly generated from an excluded protocol message.

Only SOURCE may provide evidence for the title.

Excluded content must not influence:

- topic selection;
- terminology;
- semantic clustering;
- importance;
- title wording;
- topology.

---

## GOAL

Produce the shortest title that preserves enough grounded information to identify and retrieve this specific conversation later.

Optimization priority:

1. **GROUNDEDNESS**
2. **DISCRIMINABILITY**
3. **RETRIEVAL UTILITY**
4. **RECOGNIZABILITY**
5. **COMPACTNESS**

Do not optimize for:

- stylistic elegance;
- symmetry;
- narrative completeness;
- uniformity with other titles;
- grammatical beauty.

---

## DEFINITIONS

### RETRIEVAL_CUE

A grounded element of SOURCE that materially helps identify the conversation.

### CLUSTER

A set of materially related retrieval cues that depend on a shared subject, situation, context, task, event, object, or line of inquiry.

### INDEPENDENT_CLUSTERS

Clusters where removing one would not materially change the context required to understand the other.

### SEGMENT

A compact textual representation of one high-value retrieval cue or one tightly coupled cue set.

A segment is a semantic unit, not necessarily a single word.

### RELATED_SEGMENTS

Segments that refine, qualify, implement, evaluate, transform, or describe the same underlying retrieval target.

### INDEPENDENT_SEGMENTS

Segments representing materially independent retrieval targets.

### MATERIAL_CLUSTER

A cluster whose omission would materially reduce future retrieval value.

### MATERIAL_PHASE

A sustained phase of a long conversation that contains at least one of:

- sustained work;
- an explicit decision;
- a produced artifact;
- a substantial correction;
- a major pivot;
- a reusable result;
- a distinct future retrieval reason.

---

# WORKFLOW

## STEP 1 — SOURCE GUARD

Construct the evidence set from SOURCE.

Remove all EXCLUDE content before semantic analysis.

Do not use protocol-generated text as evidence.

---

## STEP 2 — PHASE ANALYSIS FOR LONG CONVERSATIONS

If SOURCE is long or contains multiple substantial transitions, identify MATERIAL_PHASES before generating retrieval cues.

Do not treat every topic shift as a separate phase.

A phase becomes material only when it contains meaningful work, decisions, artifacts, pivots, results, or future retrieval value.

Merge phases when they share the same retrieval identity.

Do not preserve every phase in the title.

Compress related phases into the strongest stable cue.

---

## STEP 3 — CLUSTER SOURCE

Partition SOURCE into semantic clusters.

Do not cluster by generic domain labels.

Cluster by actual contextual dependency.

### Independence test

Two clusters are independent when one can be removed without materially changing the context required to understand the other.

Do not manufacture a shared abstraction merely to force unrelated content into one cluster.

---

## STEP 4 — EXTRACT RETRIEVAL CUES

For each material cluster, extract the strongest retrieval cues.

Prefer cues that are:

- specific;
- memorable;
- materially relevant;
- directly grounded;
- useful over time;
- capable of distinguishing this conversation from plausible alternatives.

Do not privilege a cue solely because it:

- appears first;
- appears last;
- appears frequently;
- occupies more text;
- was discussed most recently.

---

## STEP 5 — FILTER CUES

Reject cues that are:

- unsupported by SOURCE;
- incidental;
- generic without identification value;
- redundant;
- protocol-induced;
- decorative;
- abstract replacements for more specific grounded cues.

Do not replace a concrete grounded cue with a broad category merely to make the title look cleaner.

---

## STEP 6 — DETERMINE TOPOLOGY

Determine the semantic relation between surviving cues.

Use:

### RELATED

When cues represent:

- refinement;
- progression;
- implementation;
- evaluation;
- result;
- transformation;
- different phases of the same underlying object or retrieval target.

Encode with:

` / `

### INDEPENDENT

When cues have independent retrieval identity.

Encode with:

` | `

### HYBRID

When the title requires both relation types.

Examples of syntax only:

```text
A / B | C
A | B / C
A / B | C / D
```

These examples define syntax, not semantic categories.

---

## STEP 7 — RELATION TEST

Use `|` only when segments have independent retrieval identity.

Ask:

> If retrieval were attempted using one segment, could the other segment be removed without materially changing why the conversation containing the first segment is useful?

If **NO**:

use `/`.

If **YES**:

`|` is allowed.

Do not use `|` merely because the conversation changed phase.

A review, implementation, correction, consequence, evaluation, or transformation of the same underlying object normally remains related and should use `/`.

---

## STEP 8 — ALLOCATE SEGMENTS

Select between `MIN_SEGMENTS` and `MAX_SEGMENTS`.

There is no preferred default segment count.

Use the smallest number of segments that preserves the conversation's material retrieval identity.

Use an additional segment only when it contributes a distinct high-value retrieval cue that would otherwise be lost.

Never create a segment merely to fill space.

Never omit a materially useful fourth segment merely to keep the title shorter.

Never exceed `MAX_SEGMENTS`.

---

## STEP 9 — GENERATE CANDIDATES

Generate internally at least 5 candidate titles.

No segment has a predefined semantic role.

For every candidate:

- select 2–4 segments;
- encode semantic relationships using `/` and `|`;
- preserve useful concrete wording from SOURCE;
- avoid invented hierarchy;
- avoid forced symmetry.

Mixed topology is allowed.

---

## STEP 10 — STABILITY CHECK

When two candidate cues have comparable groundedness, discriminability, and retrieval utility, prefer the cue with higher expected long-term recognizability.

Do not automatically reject:

- version numbers;
- codenames;
- project names;
- internal terminology;
- acronyms.

Retain them when they materially distinguish the conversation.

Reject an ephemeral internal label only when a more stable grounded cue provides equal or better retrieval value.

Stability is a tie-breaker, not a license to generalize.

---

## STEP 11 — SCORE CANDIDATES

Evaluate each candidate internally on:

- `G` = groundedness
- `D` = discriminability
- `R` = retrieval utility
- `I` = recognizability
- `C` = compactness
- `S` = long-term stability

Penalties:

- `P_generic`
- `P_redundant`
- `P_false_unification`
- `P_false_fragmentation`
- `P_omission`
- `P_invented_specificity`
- `P_topology_error`

Priority:

```text
G > D > R > I > S > C
```

Compactness must never override materially better identification.

---

## STEP 12 — HARD REJECT

Reject any candidate if:

- any segment is unsupported by SOURCE;
- any segment is derived from excluded protocol content;
- two segments are substantially redundant;
- related content is falsely fragmented only to fill slots;
- independent content is falsely unified under a broad abstraction;
- a specific grounded term is replaced by a weaker generic label without retrieval benefit;
- separator topology misrepresents the relationship between segments;
- the title could plausibly describe many unrelated conversations with minimal modification;
- the candidate mainly describes the protocol instead of SOURCE.

### False abstraction rule

Do not unify unrelated material under broad labels merely because a common superclass exists.

Patterns equivalent to:

```text
Life / Decisions / Advice
General / Questions / Ideas
Work / Problems / Solutions
```

are hard-reject patterns when SOURCE contains more specific grounded cues.

These examples are illustrative only and do not define an ontology.

---

## STEP 13 — OVERFLOW

Let `MATERIAL_CLUSTER_COUNT` count only independent material clusters.

Do **not** count as separate independent clusters:

- refinements of the same retrieval target;
- implementation phases;
- corrections;
- evaluations;
- results;
- closely related subtopics that can be represented by one stable retrieval cue.

If:

```text
MATERIAL_CLUSTER_COUNT <= MAX_SEGMENTS
```

represent all independent material clusters unless doing so reduces retrieval quality.

If:

```text
MATERIAL_CLUSTER_COUNT > MAX_SEGMENTS
```

then:

1. rank independent material clusters by:
   - retrieval utility;
   - discriminability;
   - material importance;

2. represent the strongest `MAX_SEGMENTS` clusters;

3. compute:

```text
N = MATERIAL_CLUSTER_COUNT - represented independent material clusters
```

4. append:

```text
+N
```

directly after the final segment.

Example syntax:

```text
A | B | C | D +2
```

### `+N` rules

`+N`:

- is overflow metadata;
- is not a semantic segment;
- does not consume `MAX_SEGMENTS`;
- must not represent omitted details inside already represented clusters;
- must appear only when materially independent retrieval targets remain unrepresented.

Whenever `+N` is present:

```text
FLAG = OVERFLOW
```

---

## STEP 14 — COMPRESSION

Compress only after semantic selection.

Prefer 1–2 words per segment.

Allow longer atomic expressions when shortening would reduce:

- identity;
- precision;
- recognizability;
- retrieval value.

Preserve when useful:

- proper names;
- product names;
- acronyms;
- locations;
- distinctive phrases;
- technical terms;
- concrete events;
- version identifiers.

Remove:

- unnecessary articles;
- filler;
- duplicated qualifiers;
- decorative wording.

Do not replace a precise grounded term with a generic superclass solely to satisfy a word target.

---

## STEP 15 — ORDER

Order segments for recognition, not grammatical elegance.

Within RELATED groups:

place the strongest contextual cue before its refinement when this improves scanning.

Across INDEPENDENT groups:

order by retrieval value.

Do not assume broad-to-specific ordering is always optimal.

---

## STEP 16 — VERIFY

Before output, verify:

- `V1` Every segment is grounded in SOURCE.
- `V2` Every segment contributes distinct retrieval information.
- `V3` Separators correctly encode semantic relations.
- `V4` No false common abstraction was introduced.
- `V5` No independent cluster was merged merely for compactness.
- `V6` No coherent cluster was fragmented merely to fill slots.
- `V7` Segment count is justified by retrieval value.
- `V8` Long-conversation material phases were considered.
- `V9` Stability was considered only as a tie-breaker.
- `V10` Overflow is correctly represented with `+N` when required.
- `V11` Protocol messages did not influence classification.
- `V12` The title remains useful when viewed without opening the conversation.

If verification fails:

regenerate candidates once and repeat selection.

---

## STEP 17 — ALTERNATIVE VALIDITY

Every alternative candidate exposed in TEST output must independently satisfy the complete title contract.

Each exposed alternative must independently pass:

- groundedness;
- discriminability;
- topology;
- `MIN_SEGMENTS`;
- `MAX_SEGMENTS`;
- overflow handling;
- compression;
- stability check;
- hard-reject rules;
- verification.

Do not expose:

- discarded candidates;
- structurally invalid candidates;
- candidates exceeding `MAX_SEGMENTS`;
- candidates whose separator topology is ambiguous or incorrect.

Alternative candidates are complete titles, not fragments.

Each alternative must be emitted on its own output line.

Never use a semantic title separator as a delimiter between alternative titles.

---

# EXECUTION MODES

## LOCAL MODE

When:

```text
EXECUTION_MODE = LOCAL
```

the model receives SOURCE for one conversation only.

Do not claim knowledge of actual title collisions with other conversations.

Interpret discriminability as:

> Would this title likely distinguish SOURCE from plausible alternative conversations?

Do not invent corpus-level uniqueness.

---

## CORPUS MODE

Use this mode when multiple conversations are available for joint comparison.

When:

```text
EXECUTION_MODE = CORPUS
```

candidate titles must additionally be compared against the complete conversation corpus for:

- exact title collisions;
- near-duplicate titles;
- repeated generic segments;
- corpus-specific ambiguity;
- recurring codenames;
- overused project labels;
- insufficiently distinctive variants.

Corpus-level disambiguation may change segment selection while preserving groundedness.

---

# FLAGS

Available flags:

```text
LOW_SIGNAL
AMBIGUOUS
GENERIC_RISK
MULTI_TOPIC
HYBRID
OVERFLOW
```

Set only flags supported by SOURCE and analysis.

### LOW_SIGNAL

SOURCE contains insufficient distinctive evidence.

### AMBIGUOUS

Multiple materially different title interpretations remain similarly defensible.

### GENERIC_RISK

The best available grounded title remains weakly discriminative.

### MULTI_TOPIC

Two or more independent material clusters are represented.

### HYBRID

Both `/` and `|` are required.

### OVERFLOW

One or more independent material clusters are omitted because `MAX_SEGMENTS` was reached.

---

# LANGUAGE

Use the dominant language of SOURCE.

Preserve foreign-language terms when they carry stronger recognition value.

Do not translate:

- names;
- project identifiers;
- acronyms;
- distinctive expressions;

solely for stylistic consistency.

---

# STYLE CONSTRAINTS

The title must:

- contain 2–4 semantic segments;
- use `/` only for related segments;
- use `|` only for independent segments;
- allow mixed topology;
- optionally append `+N` for true independent-cluster overflow;
- avoid complete sentences;
- avoid explanations inside the title;
- avoid decorative language;
- avoid emoji;
- avoid generic filler;
- avoid invented categorization;
- avoid unnecessary connective wording.

---

# OUTPUT CONTRACT

## TEST MODE

When:

```text
OUTPUT_MODE = TEST
```

output exactly:

```text
TITLE: <best title>
ALT_1: <candidate 2>
ALT_2: <candidate 3>
TOPOLOGY: <RELATED | INDEPENDENT | HYBRID>
SEGMENTS: <2 | 3 | 4>
FLAGS: <NONE or comma-separated flags>
```

Each alternative title must be emitted on its own line.

`ALT_1` and `ALT_2` must each be complete valid titles.

Never use `/` or `|` to delimit separate candidate titles.

Do not output reasoning, scores, analysis, or commentary.

---

## APPLY MODE

When:

```text
OUTPUT_MODE = APPLY
```

output only:

```text
<best title>
```

Nothing else.

---

# TERMINATION

The protocol is complete when:

- SOURCE has been isolated;
- material phases and clusters have been considered;
- grounded cues have been extracted;
- 2–4 segments have been selected;
- topology is correctly encoded;
- overflow is marked when required;
- alternative candidates are independently valid when exposed;
- verification passes;
- the output contract is satisfied.

---

`END CHAT_TITLE_PROTOCOL_V1.2.1`
