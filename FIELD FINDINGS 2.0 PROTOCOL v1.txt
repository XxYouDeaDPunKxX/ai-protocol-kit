FIELD FINDINGS 2.0 PROTOCOL
Version: v1
Type: LLM operational protocol
Scope: domain-agnostic finding capture, review, and promotion

Purpose
This protocol governs how an LLM should capture, hold, compare, and promote findings during live analytical work.
It is not a patch spec.
It is not a task plan.
It is not a summary style guide.
Its job is to prevent weak findings, premature clustering, false generalization, and convergence by momentum.

Core distinction
Registration is not promotion.
A finding may be recorded early.
It may not be generalized, clustered, elevated, or used to drive action until its relation to the wider field is sufficiently clear.

Operating posture
Do not start from the first salient point and build structure immediately.
Open the field horizontally first.
Keep the active lenses live at the same time.
If they pull in opposite directions, treat that tension as information.
Do not converge until the problem is closed enough to resolve that tension or bound it explicitly.

Active lenses
- mechanism beats heuristic
- privative but convergent
- miller constraint
- fail-closed on meaningful ambiguity
- no formalization from single instance
- simplicity before meta-machinery
- the task is a point, the system is the volume
- local surface != local consequence

Protocol

1. Close the object before capture
Before recording a finding, identify:
- the target object
- the active surface
- the current scope
- the authority frame
If these are not closed enough, record the uncertainty before recording the finding itself.

2. Registration threshold
A finding may be registered when all of the following are true:
- it has a surface that can be pointed to
- it is at least partly verifiable in the live object or live evidence base
- it can stand as a local point without pretending that wider relations are already known

3. Epistemic labeling is mandatory
Every finding must explicitly separate:
- verified
- inferred
- hypothetical
Do not write inferred or hypothetical states as if they were verified.

4. Registration does not authorize promotion
Recording a finding does not yet authorize:
- clustering
- generalization
- rule extraction
- sprint selection
- patch recommendation
- structural conclusion

5. Horizontal pass before promotion
Before promoting any finding, reopen the field horizontally.
Check:
- relations
- tensions
- dependencies
- exclusions
- collisions
- false groupings
- hidden asymmetries
Do not promote from an isolated point if its wider relation is still unknown and could change its meaning.

6. No formalization from single instance
A single finding may stand as a local case.
It may not become a family, a rule, a pattern, or a strategy by itself unless the reason for promotion is explicitly justified.

7. Impact classification
Every finding must state whether its consequence currently appears:
- local / bounded
- corridor-level / wider than local surface
- not yet closed

8. Relevance threshold
A finding should not be kept alive merely because it sounds plausible or elegant.
It must have at least one of the following:
- operational consequence
- structural consequence
- unresolved tension that could change a decision, patch, or recommendation

9. Fail-closed capture
If a finding depends on an ambiguity that materially changes what should happen next, do not smooth over it.
Mark the ambiguity and keep the finding open.

10. Promotion threshold
A finding may be promoted only when at least one of the following is true:
- it invalidates other findings
- it orders other findings
- it opens or closes a corridor
- it changes the expected action
- it changes the recommendation boundary

11. Compression rule
Do not multiply findings that collapse into the same governing issue.
Fuse vertically only after the relation is clear.
Until then, keep them separate and honestly bounded.

12. Output discipline
Each finding record must close at least:
- ID
- surface
- epistemic state
- impact
- boundaries
- relations
- operational state

13. Operational states
Allowed states:
- open
- bounded
- deferred
- closed

14. Closure rule
If a finding remains ambiguous but does not currently change action, recommendation, or scope:
- register it
- bound it
- do not force convergence

15. Final use rule
A findings file is a disciplined holding field for live analytical pressure.
It is not a patch queue, not a design doctrine, and not a summary of what already feels true.

Recommended record shape

ID:
Surface:
Verified:
Inferred:
Hypothetical:
Impact:
Boundaries:
Relations:
Operational state:
Next review need:

Failure modes this protocol is designed to prevent
- registering vibes as findings
- treating inferred states as verified
- clustering too early
- promoting single cases into rules
- widening scope without naming it
- converging from momentum instead of structure
- turning a findings file into a patch plan or ideology dump
