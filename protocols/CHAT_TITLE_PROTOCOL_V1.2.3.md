# CHAT_TITLE_PROTOCOL_V1.2.3

## IDENTITY

```text
PROTOCOL_ID = CHAT_TITLE_PROTOCOL
VERSION = 1.2.3
MARKER = [[CHAT_TITLE_PROTOCOL_V1.2.3]]
```

## PURPOSE

```text
TASK = generate a compact grounded retrieval title for one conversation transcript
TITLE_ROLE = retrieval key
TITLE_ROLE != summary
DOMAIN_ASSUMPTION = none
```

The title MUST optimize retrieval identity rather than narrative completeness or stylistic elegance.

---

# CONFIG

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

SOURCE_COVERAGE_REQUIRED = COMPLETE
CANDIDATE_GATE = CLOSED
```

---

# EVIDENCE MODEL

## SEMANTIC_EVIDENCE

```text
SEMANTIC_EVIDENCE = SOURCE
```

Only `SOURCE` may introduce semantic content into a title.

No title cue may be introduced from:

- protocol text;
- protocol-generated assistant responses;
- title-test discussion;
- title-review discussion;
- external corpus comparison;
- unsupported inference.

## COMPARISON_EVIDENCE

```text
COMPARISON_EVIDENCE = CORPUS
```

`COMPARISON_EVIDENCE` is available only in `CORPUS` mode.

It MAY affect:

- candidate ranking;
- collision avoidance;
- disambiguation;
- cue preference among already grounded alternatives.

It MUST NOT:

- introduce a cue unsupported by `SOURCE`;
- change the semantic meaning of `SOURCE`;
- override groundedness.

---

# SOURCE BOUNDARY

## PROTOCOL_BOUNDARY

Find the earliest conversation turn containing any marker matching:

```text
[[CHAT_TITLE_PROTOCOL_*]]
```

Set:

```text
PROTOCOL_BOUNDARY = earliest matching turn
```

The current protocol invocation is included in this rule.

## SOURCE

Set:

```text
SOURCE_START = earliest available conversation turn
SOURCE_END = turn immediately preceding PROTOCOL_BOUNDARY
SOURCE_SPAN = SOURCE_START..SOURCE_END
SOURCE = complete ordered SOURCE_SPAN
```

All turns at or after `PROTOCOL_BOUNDARY` are outside `SOURCE`.

This includes:

- protocol invocations;
- assistant responses to protocol invocations;
- later title evaluations;
- corrections;
- protocol revisions;
- title discussions;
- any other post-boundary content.

No post-boundary turn may influence title generation.

## EMPTY SOURCE

If no non-protocol turn exists before `PROTOCOL_BOUNDARY`:

```text
STOP
ERROR = SOURCE_EMPTY
```

---

# DEFINITIONS

## COVERAGE_UNIT

A contiguous ordered subrange of `SOURCE_SPAN`.

Each `COVERAGE_UNIT` MUST internally contain:

```text
START
END
MATERIAL = true|false
PHASE_ID = <id>|NONE
```

## COVERAGE_MAP

An ordered partition of the complete `SOURCE_SPAN` into `COVERAGE_UNIT`s.

Required invariants:

```text
COVERAGE_MAP starts at SOURCE_START
COVERAGE_MAP ends at SOURCE_END
UNION(COVERAGE_UNIT ranges) = SOURCE_SPAN
NO_GAPS = true
NO_OVERLAPS = true
ORDER_PRESERVED = true
```

## SOURCE_COVERAGE_COMPLETE

```text
SOURCE_COVERAGE_COMPLETE = true
```

only when every `COVERAGE_MAP` invariant passes.

## MATERIAL_PHASE

A temporally or logically bounded portion of `SOURCE` containing at least one:

- sustained task;
- explicit decision;
- produced artifact;
- substantial correction;
- major pivot;
- reusable result;
- distinct retrieval reason.

Every non-empty conversation has at least one phase.

Phase length does not determine materiality.

## RETRIEVAL_CUE

A grounded element of `SOURCE` that materially helps identify or retrieve the conversation.

## CLUSTER

A set of materially related retrieval cues sharing a contextual dependency.

## MATERIAL_CLUSTER

A cluster whose omission would materially reduce retrieval value.

## INDEPENDENT_CLUSTERS

Clusters with independent retrieval identity under the bidirectional relation test.

## SEGMENT

A compact textual representation of one high-value retrieval cue or tightly coupled cue set.

A segment is a semantic unit, not necessarily one lexical word.

## RELATED_SEGMENTS

Segments representing the same underlying retrieval target through:

- refinement;
- implementation;
- progression;
- evaluation;
- result;
- correction;
- consequence;
- transformation;
- related phase.

## INDEPENDENT_SEGMENTS

Segments representing independent retrieval targets.

---

# OBJECTIVE

Select a title that maximizes, in priority order:

```text
1. GROUNDEDNESS
2. DISCRIMINABILITY
3. RETRIEVAL_UTILITY
4. RECOGNIZABILITY
5. LONG_TERM_STABILITY
6. COMPACTNESS
```

Do NOT optimize for:

- elegance;
- symmetry;
- grammatical completeness;
- narrative completeness;
- uniform title shape;
- aesthetic balance.

---

# WORKFLOW

## STEP 1 â€” CLOSE SOURCE

Resolve:

```text
PROTOCOL_BOUNDARY
SOURCE_START
SOURCE_END
SOURCE_SPAN
SOURCE
```

If `SOURCE` is empty:

```text
STOP
ERROR = SOURCE_EMPTY
```

Do not proceed until the source boundary is closed.

---

## STEP 2 â€” COMPLETE SOURCE COVERAGE

Mandatory for every execution.

Process the complete ordered `SOURCE_SPAN`.

Construct `COVERAGE_MAP`.

For every available non-protocol turn:

1. assign it to exactly one `COVERAGE_UNIT`;
2. determine whether it is materially relevant;
3. assign material content to a phase;
4. preserve chronological order.

During coverage, identify:

- all material phases;
- all material subjects;
- all material tasks;
- all material events;
- all explicit decisions;
- all produced artifacts;
- all substantial corrections;
- all major pivots;
- all reusable results;
- all distinct retrieval reasons.

During this step:

```text
CANDIDATE_GATE = CLOSED
```

The model MUST NOT:

- generate title candidates;
- select title wording;
- cluster only a subset;
- analyze only recent turns;
- analyze only opening turns;
- analyze only middle turns;
- analyze only the longest phase;
- analyze only the most salient phase;
- substitute a summary for available full SOURCE;
- intentionally omit an available SOURCE range.

After constructing `COVERAGE_MAP`, verify:

```text
COVERAGE_MAP starts at SOURCE_START
COVERAGE_MAP ends at SOURCE_END
UNION(COVERAGE_UNIT ranges) = SOURCE_SPAN
NO_GAPS = true
NO_OVERLAPS = true
ORDER_PRESERVED = true
```

If any invariant fails:

```text
STOP
ERROR = SOURCE_COVERAGE_INCOMPLETE
```

If all invariants pass:

```text
SOURCE_COVERAGE_COMPLETE = true
CANDIDATE_GATE = OPEN
```

---

## STEP 3 â€” RESOLVE MATERIAL PHASES

Precondition:

```text
SOURCE_COVERAGE_COMPLETE = true
```

Using the complete `COVERAGE_MAP`:

1. identify material phases;
2. merge phases sharing the same retrieval identity;
3. keep phases separate when they contain independent retrieval identity;
4. do not preserve phases solely because they are long;
5. do not discard phases solely because they are short.

Phase boundaries are analytical aids.

Phase boundaries do not automatically become title boundaries.

---

## STEP 4 â€” BUILD MATERIAL CLUSTERS

Partition material evidence into semantic clusters.

Cluster by contextual dependency.

Do NOT cluster by generic domain labels.

Do NOT create a common abstraction merely because unrelated content shares a broad superclass.

Each material cue MUST map to a cluster or be rejected as non-material.

---

## STEP 5 â€” BIDIRECTIONAL RELATION TEST

For every pair of candidate clusters `A` and `B`, evaluate both directions.

### TEST_AB

```text
Remove B from the retrieval representation of A.
```

If removal materially changes why the conversation containing `A` is useful:

```text
DEPENDENCY_AB = true
```

Else:

```text
DEPENDENCY_AB = false
```

### TEST_BA

```text
Remove A from the retrieval representation of B.
```

If removal materially changes why the conversation containing `B` is useful:

```text
DEPENDENCY_BA = true
```

Else:

```text
DEPENDENCY_BA = false
```

### RELATION RESOLUTION

Only if:

```text
DEPENDENCY_AB = false
AND
DEPENDENCY_BA = false
```

set:

```text
RELATION = INDEPENDENT
```

Otherwise:

```text
RELATION = RELATED
```

Do not classify clusters as independent merely because they occur in different phases.

---

## STEP 6 â€” EXTRACT RETRIEVAL CUES

For every material cluster, extract candidate retrieval cues.

Prefer cues that are:

- directly grounded;
- specific;
- memorable;
- materially relevant;
- useful over time;
- discriminative;
- recognizable without reopening the conversation.

Do NOT privilege a cue solely because it:

- appears first;
- appears last;
- appears frequently;
- occupies more text;
- occurs in a longer phase;
- occurs in the most recent phase.

---

## STEP 7 â€” FILTER RETRIEVAL CUES

Reject cues that are:

- unsupported;
- protocol-derived;
- post-boundary;
- incidental;
- decorative;
- generic without retrieval value;
- redundant;
- invented;
- broader than a stronger grounded cue without retrieval benefit.

Do not replace precise grounded terminology with generic categories solely for compression.

---

## STEP 8 â€” DETERMINE TITLE TOPOLOGY

Use:

```text
RELATED_SEPARATOR = " / "
```

between adjacent related semantic components.

Use:

```text
INDEPENDENT_SEPARATOR = " | "
```

between independent semantic groups.

Mixed topology is allowed.

Syntax examples only:

```text
A / B
A | B
A / B | C
A | B / C
A / B | C / D
```

Separator choice MUST encode semantic topology.

Separator choice MUST NOT be decorative.

---

## STEP 9 â€” ALLOCATE SEGMENTS

Select:

```text
MIN_SEGMENTS <= SEGMENT_COUNT <= MAX_SEGMENTS
```

There is no preferred default segment count.

Use the smallest segment count that preserves material retrieval identity.

Add a segment only when it contributes distinct high-value retrieval information that would otherwise be lost.

Do NOT:

- create segments to fill slots;
- omit a useful fourth segment only for brevity;
- exceed `MAX_SEGMENTS`.

Related refinements and independent clusters compete for the same segment budget.

---

## STEP 10 â€” GENERATE CANDIDATES

Preconditions:

```text
SOURCE_COVERAGE_COMPLETE = true
CANDIDATE_GATE = OPEN
```

Generate internally at least 5 complete candidate titles.

Every candidate MUST:

- contain 2â€“4 semantic segments before overflow metadata;
- use grounded cues only;
- encode topology correctly;
- avoid predefined segment roles;
- avoid invented hierarchy;
- avoid forced symmetry.

Candidate generation before source coverage completion is invalid.

---

## STEP 11 â€” STABILITY CHECK

When two cues have comparable:

- groundedness;
- discriminability;
- retrieval utility;

prefer the cue with higher expected long-term recognizability.

Do not automatically reject:

- version numbers;
- codenames;
- project names;
- internal terminology;
- acronyms.

Retain them when they materially distinguish the conversation.

Stability is a tie-breaker.

Stability MUST NOT justify:

- abstraction;
- genericization;
- semantic drift;
- loss of specificity.

---

## STEP 12 â€” SCORE CANDIDATES

Evaluate internally:

```text
G = groundedness
D = discriminability
R = retrieval utility
I = recognizability
S = long-term stability
C = compactness
```

Penalties:

```text
P_generic
P_redundant
P_false_unification
P_false_fragmentation
P_omission
P_invented_specificity
P_topology_error
P_coverage_bias
P_composite_distortion
```

Priority:

```text
G > D > R > I > S > C
```

`P_coverage_bias` applies when a candidate disproportionately reflects:

- opening position;
- recency;
- phase length;
- raw text volume;
- local salience;

without retrieval justification.

`P_composite_distortion` applies when individually grounded segments combine into a misleading total meaning.

---

## STEP 13 â€” COMPOSITE FIDELITY TEST

Interpret each complete candidate as one semantic structure.

Reject the candidate if the complete title:

- implies a relation unsupported by `SOURCE`;
- implies a hierarchy unsupported by `SOURCE`;
- implies causality unsupported by `SOURCE`;
- changes cluster identity through adjacency;
- makes independent clusters appear functionally dependent;
- makes related clusters appear independent;
- creates a combined meaning not supported by the complete `SOURCE`.

Segment-level groundedness is insufficient.

The complete candidate MUST preserve semantic fidelity.

---

## STEP 14 â€” HARD REJECT

Reject any candidate if:

- any segment is unsupported by `SOURCE`;
- any segment is derived from post-boundary content;
- any segment is protocol-derived;
- two segments are substantially redundant;
- related content is falsely fragmented;
- independent content is falsely unified;
- a stronger precise cue is replaced by a weaker generic cue without retrieval benefit;
- separator topology is incorrect;
- composite fidelity fails;
- the title could plausibly describe many unrelated conversations with minimal modification;
- the title primarily describes the protocol instead of `SOURCE`;
- the candidate was generated before source coverage completion;
- the candidate is materially dominated by opening bias;
- the candidate is materially dominated by recency bias;
- the candidate is materially dominated by phase length or raw text volume.

### FALSE ABSTRACTION

Hard-reject patterns include titles equivalent to:

```text
Life / Decisions / Advice
General / Questions / Ideas
Work / Problems / Solutions
```

when more specific grounded cues exist.

These strings define failure patterns only.

They do not define an ontology.

---

## STEP 15 â€” SELECT REPRESENTED CLUSTERS

For each candidate, record:

```text
REPRESENTED_MATERIAL_CLUSTERS
OMITTED_MATERIAL_CLUSTERS
```

A material cluster is represented when at least one selected segment preserves its retrieval identity.

A cluster is not represented merely because a broad segment could technically include it.

Representation requires useful retrieval identity.

---

## STEP 16 â€” OVERFLOW

Compute overflow AFTER segment allocation.

Set:

```text
OMITTED_MATERIAL_CLUSTERS =
MATERIAL_INDEPENDENT_CLUSTERS - REPRESENTED_MATERIAL_CLUSTERS

N = count(OMITTED_MATERIAL_CLUSTERS)
```

If:

```text
N = 0
```

do not append overflow metadata.

If:

```text
N > 0
```

append:

```text
+N
```

directly after the final semantic segment.

Syntax example only:

```text
A | B | C | D +2
```

`+N`:

- is metadata;
- is not a semantic segment;
- does not consume `MAX_SEGMENTS`;
- counts omitted independent material clusters only;
- does not count omitted details inside represented clusters;
- does not count refinements already represented by a broader valid cue.

If `N > 0`:

```text
ADD_FLAG(OVERFLOW)
```

---

## STEP 17 â€” COMPRESSION

Compress only after:

```text
semantic selection
topology resolution
composite fidelity
overflow calculation
```

Prefer 1â€“2 words per semantic segment.

Allow longer atomic expressions when shortening would reduce:

- identity;
- precision;
- recognizability;
- retrieval utility.

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

Compression MUST NOT alter topology or cluster identity.

---

## STEP 18 â€” ORDER

Order for retrieval recognition.

Within a `RELATED` group:

place the strongest contextual cue before refinement when this improves retrieval scanning.

Across `INDEPENDENT` groups:

order by retrieval value.

Do not order for grammatical elegance.

Do not assume broad-to-specific ordering is always optimal.

---

## STEP 19 â€” VERIFY

Before output, verify all conditions.

```text
V1  PROTOCOL_BOUNDARY resolved.
V2  SOURCE contains only pre-boundary content.
V3  SOURCE_COVERAGE_COMPLETE = true.
V4  COVERAGE_MAP spans SOURCE_START..SOURCE_END.
V5  COVERAGE_MAP has NO_GAPS = true.
V6  COVERAGE_MAP has NO_OVERLAPS = true.
V7  COVERAGE_MAP preserves source order.
V8  All material phases were considered.
V9  All material clusters were resolved.
V10 Bidirectional relation tests were applied where needed.
V11 Every segment is grounded in SOURCE.
V12 Every segment contributes distinct retrieval information.
V13 Separators encode resolved topology.
V14 Composite fidelity passes.
V15 No false abstraction was introduced.
V16 No independent cluster was merged merely for compactness.
V17 No coherent cluster was fragmented merely to fill slots.
V18 Segment count is justified by retrieval value.
V19 Stability was used only as a tie-breaker.
V20 Overflow was computed after segment allocation.
V21 +N equals omitted independent material cluster count when N > 0.
V22 Protocol/post-boundary content did not influence the title.
V23 The candidate is not dominated by recency, opening position, phase length, or raw text volume.
V24 The complete title remains useful without reopening the conversation.
```

If any verification condition fails:

```text
REGENERATE_CANDIDATES = once
REPEAT_SELECTION = true
REPEAT_VERIFICATION = true
```

If verification still fails:

```text
STOP
ERROR = VERIFICATION_FAILURE
```

---

## STEP 20 â€” ALTERNATIVE VALIDITY

Every alternative exposed in `TEST` mode MUST independently satisfy the complete protocol.

Each alternative MUST independently pass:

- source-boundary dependency;
- complete-source-coverage dependency;
- groundedness;
- discriminability;
- bidirectional relation resolution;
- topology;
- composite fidelity;
- `MIN_SEGMENTS`;
- `MAX_SEGMENTS`;
- overflow calculation;
- compression;
- stability check;
- hard-reject rules;
- verification.

Do not expose:

- discarded candidates;
- incomplete candidates;
- structurally invalid candidates;
- candidates exceeding `MAX_SEGMENTS`;
- candidates with ambiguous topology;
- candidates failing composite fidelity.

Alternative candidates are complete titles.

Each alternative occupies one output line.

Semantic separators MUST NOT delimit separate candidate titles.

---

# EXECUTION MODES

## LOCAL MODE

When:

```text
EXECUTION_MODE = LOCAL
```

only one `SOURCE` conversation is available for semantic analysis.

Set:

```text
SEMANTIC_EVIDENCE = SOURCE
COMPARISON_EVIDENCE = NONE
```

Interpret discriminability as:

```text
Would this title likely distinguish SOURCE from plausible alternative conversations?
```

Do not claim actual corpus-level uniqueness.

---

## CORPUS MODE

When:

```text
EXECUTION_MODE = CORPUS
```

multiple conversations are available.

For each conversation independently:

```text
SEMANTIC_EVIDENCE = that conversation's SOURCE
SOURCE_COVERAGE_REQUIRED = COMPLETE
```

Set:

```text
COMPARISON_EVIDENCE = complete available corpus
```

Use `COMPARISON_EVIDENCE` only for:

- exact collision detection;
- near-duplicate detection;
- generic segment detection;
- corpus ambiguity detection;
- recurring codename detection;
- overused project-label detection;
- ranking grounded alternatives.

Corpus comparison MUST NOT introduce unsupported semantic cues.

Groundedness remains local to each conversation's `SOURCE`.

---

# FLAGS

Initialize:

```text
FLAGS = []
```

Available flags:

```text
LOW_SIGNAL
AMBIGUOUS
GENERIC_RISK
MULTI_TOPIC
HYBRID
OVERFLOW
```

Add flags using:

```text
ADD_FLAG(<flag>)
```

Do not replace existing flags when adding another flag.

## LOW_SIGNAL

Add when `SOURCE` contains insufficient distinctive retrieval evidence.

## AMBIGUOUS

Add when multiple materially different valid title interpretations remain similarly defensible.

## GENERIC_RISK

Add when the best grounded title remains weakly discriminative.

## MULTI_TOPIC

Add when two or more independent material clusters are represented.

## HYBRID

Add when both `/` and `|` are required.

## OVERFLOW

Add when one or more independent material clusters remain unrepresented after segment allocation.

---

# LANGUAGE

Use the dominant language of `SOURCE`.

Preserve foreign-language terminology when it provides stronger retrieval identity.

Do not translate solely for stylistic consistency:

- names;
- project identifiers;
- acronyms;
- distinctive expressions.

---

# STYLE CONTRACT

Each valid title MUST:

```text
semantic segment count >= MIN_SEGMENTS
semantic segment count <= MAX_SEGMENTS
```

The title MAY append `+N` after semantic segments.

The title MUST:

- use `/` only for related components;
- use `|` only for independent components;
- preserve mixed topology when required;
- avoid complete sentences;
- avoid explanations;
- avoid decorative language;
- avoid emoji;
- avoid generic filler;
- avoid invented categorization;
- avoid unnecessary connective wording.

---

# FAILURE CONTRACT

Failure conditions:

```text
SOURCE_EMPTY
SOURCE_COVERAGE_INCOMPLETE
VERIFICATION_FAILURE
```

Failure takes precedence over normal output.

If any failure condition is active:

```text
DO_NOT_EMIT_TITLE = true
```

---

# OUTPUT CONTRACT

## TEST MODE

When:

```text
OUTPUT_MODE = TEST
```

and no failure condition is active, output exactly:

```text
TITLE: <best title>
ALT_1: <candidate 2>
ALT_2: <candidate 3>
TOPOLOGY: <RELATED | INDEPENDENT | HYBRID>
SEGMENTS: <2 | 3 | 4>
FLAGS: <NONE or comma-separated flags>
```

Rules:

```text
ALT_1 = complete valid title
ALT_2 = complete valid title
```

Do not output:

- reasoning;
- scores;
- coverage map;
- phases;
- clusters;
- internal candidate list;
- analysis;
- commentary.

If a failure condition is active, output exactly:

```text
ERROR: <failure condition>
```

---

## APPLY MODE

When:

```text
OUTPUT_MODE = APPLY
```

and no failure condition is active, output only:

```text
<best title>
```

Output nothing else.

If a failure condition is active, output exactly:

```text
ERROR: <failure condition>
```

---

# TERMINATION

Successful execution requires:

```text
PROTOCOL_BOUNDARY resolved
SOURCE constructed
SOURCE_COVERAGE_COMPLETE = true
CANDIDATE_GATE = OPEN
material phases resolved
material clusters resolved
bidirectional relations resolved
retrieval cues extracted
candidate set generated
composite fidelity checked
2â€“4 semantic segments selected
topology encoded
represented clusters resolved
overflow computed post-allocation
compression completed
alternatives validated when TEST
verification passed
output contract satisfied
```

Any unmet mandatory condition triggers the `FAILURE CONTRACT`.

---

`END CHAT_TITLE_PROTOCOL_V1.2.3`
