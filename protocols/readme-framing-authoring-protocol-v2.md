README FRAMING AND AUTHORING PROTOCOL v2

Use this file before writing, rewriting, restructuring, or materially reframing a repository README.

Purpose

Derive the correct README from the real project, the real reader, and the real job the README must perform.

Do not assume every repository needs the same README.
Do not assume every README should be comprehensive.
Do not assume every README should mirror familiar GitHub templates.
Do not assume the existing README is correct.
Do not let the most visible files alone define the whole repository.

Core rule

Build the smallest correct README that accurately represents the real project, fits the real reader, uses the real reader’s language, and performs the real job the README needs to do.

Operating posture

This protocol is README-specific.
It is not a generic output protocol.
It exists to help the AI derive the right README from repository truth, not from template momentum, vague confidence, or inherited wording.

Interaction rules
Follow the phases in order.
Do not skip directly to drafting, formatting, badges, or polish.
Before writing, close the project model, the README role, the reader model, the language boundary, and the section model.
If ambiguity remains and could materially change reader fit, README role, claims, structure, language, or next action, stop and ask before proceeding.
When asking the operator, ask one thing at a time.
Keep materially distinct ambiguities separate. Do not bundle unrelated questions.
For any question that risks confusion or rework, make clear what kind of answer is needed, give a concrete example when useful, and state why the answer matters.
An unresolved ambiguity does not pass to the next phase.
Use real evidence from the workspace.
Do not invent features, workflows, maturity, stability, support level, or status.
Do not generate sections, setup steps, examples, badges, architecture notes, feature lists, or contribution guidance unless they are justified by the real project and the real README role.
Do not optimize for completeness by default. Optimize for correctness, clarity, fit, orientation value, and reader usefulness.
Treat an existing README as gated material. Do not read it unless operator authorization is explicitly given.
Do not let familiar GitHub conventions override the actual needs of the project.
PHASE 1 - Classify the project

Determine and report:

project name
project type
primary purpose
primary audience
current maturity
primary user or reader
primary public or operational unit
whether the repository is product-facing, developer-facing, research-facing, content-facing, internal-facing, or mixed
whether the repository is primarily something to use, install, read, adapt, study, deploy, extend, evaluate, or reference

Possible project types include:

application
library
CLI tool
framework
template or starter
documentation repository
content repository
research repository
artifact repository
showcase repository
mixed repository
internal operational repository

Possible primary units include:

source repository
package
CLI
deployable application
documentation surface
static site
content collection
research artifact
reusable template
portfolio or showcase artifact

Questions to close in this phase:

what is this project in practical terms
what does it let a reader or user do
who is most likely to arrive at this repository
what should that reader understand within the first seconds
what should that reader be able to do next
what kind of misunderstanding would most damage the README

If classification remains materially ambiguous, stop and ask.
Do not proceed with README role selection or section design on unresolved project classification.

PHASE 2 - Inspect the workspace

Inspect the workspace enough to make sound README decisions.

Read only enough to close the README decision perimeter.
Do not force a full read of every file if unnecessary.
Do not compensate for missing evidence by falling back to generic README conventions.
If workspace evidence is insufficient to support justified framing, stop and ask.

Determine and report:

high-level repository structure
manifests and package descriptors, if any
entry points
core modules or core surfaces
executable surfaces, if any
scripts or commands relevant to running, building, testing, or using the project
configuration surfaces
dependency signals
deployment signals
documentation surfaces other than README
licensing signals
contribution or governance signals, if present
whether the repository appears stable, evolving, experimental, archival, or mixed
whether there are public-facing claims already encoded elsewhere in the workspace
whether the repository contains multiple reader surfaces that should not be collapsed into one README voice
README gate rule
if a README already exists, do not read it in this phase
do not use it for initial project understanding
do not treat it as a primary source
access to the existing README requires explicit operator authorization
without authorization, the existing README remains out of scope
PHASE 3 - Determine the README role and reader action

Before drafting anything, decide and report what job the README must perform.

Close the reader before closing the structure.
Do not design a README for a generic GitHub visitor if the real reader is narrower or more specific.

Determine and report:

the README’s primary job
the README’s secondary job, if any
the primary reader
the secondary reader, if any
the reader’s level: expert, informed, beginner, evaluator, maintainer, mixed, or other justified level
the relationship between the README and the reader: peer, instructional, operational, reference, evaluative, mixed
the primary reader action the README should enable
what happens if the README fails: low stakes, moderate stakes, or high stakes
whether the README should prioritize orientation, setup, usage, trust, explanation, reference, or navigation
whether the README should stand mostly alone or mainly route into deeper docs
whether the README should be narrow and operational or broad and explanatory

Possible README roles include:

orientation surface
quickstart surface
usage surface
technical entrypoint
documentation gateway
installation guide
project overview
reference surface
portfolio-facing overview
research framing surface
adaptation or integration surface

Rules:

do not assume every README is mainly a quickstart
do not assume every README is mainly a project overview
do not assume every README should route into a docs tree
do not assume every project needs the same reader action
do not let a secondary reader distort the README away from the primary reader

If the README’s primary role or primary reader remains materially ambiguous, stop and ask.
Do not draft until both are closed.

PHASE 4 - Determine editorial posture and language boundary

Before defining sections, decide and report how the README should sound and what kind of language it is allowed to use.

Tone is not decoration.
Language is part of reader fit.
A structurally correct README can still fail if it sounds internal, abstract, machine-like, overbuilt, or alien to the real reader.

Determine and report:

whether the README should be technical-first or orientation-first
whether it should be concise, moderate, or expansive
whether the tone should be sober, practical, explanatory, direct, or mixed
whether it should foreground setup, usage, understanding, reference, or navigation
whether it should be written mainly for newcomers, practitioners, maintainers, evaluators, or mixed readers
the real reader’s natural vocabulary
which terms are normal and clear for that reader
which terms would sound internal, abstract, technical, machine-like, inflated, or framework-native
preferred wording, if known
forbidden or risky wording, if known

Rules:

do not let tone overstate project maturity, polish, stability, or support
do not let style distort the real nature of the project
do not choose a more expressive or formal posture unless the project clearly justifies it
do not default to internal system taxonomy when plain reader language exists
if a project term must be used, explain it where necessary instead of assuming reader familiarity
if the correct editorial posture or language boundary cannot be inferred and would materially change the README, stop and ask

Do not let editorial polish substitute for unresolved framing.

PHASE 5 - Design the README model

Before writing full prose, decide and report the README structure.

Determine the section model before drafting.
If the README contains sections with different jobs, different readers, or different technical depth, define that split explicitly.
Do not let the whole README collapse into one voice by default.

Determine and report:

recommended title form
recommended opening pattern
what belongs above the fold
which sections are required
which sections are optional
which sections should be excluded
what order best fits the README role
what claims are justified
what claims are not justified
what details should stay in deeper docs rather than the README
whether badges are justified
whether installation instructions are justified
whether quickstart is justified
whether usage examples are justified
whether configuration documentation is justified
whether project structure is justified
whether architecture notes are justified
whether API reference belongs here or elsewhere
whether contributing guidance belongs here or elsewhere
whether the README changes register across sections
where that section split begins and ends
what each section is trying to do
how technical each section is allowed to be

Possible sections include:

title
one-line description
project overview
why it exists
status
features or capabilities
installation
quickstart
usage
examples
configuration
project structure
architecture
development
limitations
roadmap
documentation links
contributing
license

Rules:

treat these as options, not defaults
do not generate section bureaucracy
do not include common sections just because they are common
if a section is skipped, know why
if a section is included, justify why
prefer the smallest correct structure
keep onboarding, explanation, reference, and deep technical detail separate when they serve different jobs

If section choice, section split, or claim perimeter remains materially ambiguous, stop and ask.
Do not proceed to drafting with an unstable section model.

PHASE 6 - Draft the README

Write the README only after the model is defined.

Write each section for its actual reader, actual job, and allowed technical depth.
Do not let one strong local section define the whole README voice.

Drafting rules:

write in plain, direct language
avoid filler, ceremony, and generic GitHub mood
start with what the project is and what it does
make examples, commands, and setup steps accurate and project-real
make claims proportionate to the actual maturity and scope
prefer concrete explanation over generic marketing language
do not over-describe secondary or incidental parts of the project
do not let section count substitute for clarity
do not let the README become a dump of everything in the repository
keep the README aligned to the role defined earlier
keep language inside the confirmed language boundary
if the opening is reader-simple and later sections are more technical, preserve that distinction intentionally

If commands, examples, configuration, installation steps, or environment claims cannot be verified from the workspace, stop and ask before asserting them.
Do not use confident wording to hide missing evidence.

PHASE 7 - Review against project truth and reader truth

Before finalizing, produce a concise review that states:

what the README is trying to do
who the README is for
what the README foregrounds
what the README deliberately keeps out
which project claims it makes
which claims it avoids
which sections were included and why
which sections were excluded and why
whether the README has a section split and why
which points still need confirmation
which risks remain
which open assumptions remain, if any
which conflicts were found and how they were resolved, if any

Check for:

overstatement of maturity
overstatement of scope
invented features
generic template drag
missing core orientation
excessive focus on secondary parts of the project
mismatch between tone and project reality
mismatch between language and reader reality
internal or machine-like vocabulary where reader language should be used
setup steps that are not grounded in the repository
claims not supported by workspace evidence
section bleed between onboarding, explanation, and reference

Do not finalize the README until this review is complete.
If unresolved issues remain after review and could materially change the README, stop and ask.

PHASE 8 - Optional existing README audit

This phase is gated.
Only enter this phase if the operator explicitly authorizes reading the existing README.
If authorization is granted, read the existing README as material to audit, not as a primary source of truth.

Determine and report:

what the existing README gets right
what it gets wrong
what it overstates
what it understates
what should be preserved
what should be revised
what should be removed
whether the final result should be a revision, restructuring, or full rewrite

Rules:

do not let the old README override the project model already established
preserve only what remains true and useful
discard language that is stale, inflated, structurally misleading, or outside the confirmed language boundary
Final safeguards
Never assume every repository needs a comprehensive README.
Never assume every README should begin with feature bullets.
Never assume every project needs badges.
Never assume installation or quickstart belongs in every README.
Never assume contribution guidance belongs in the README rather than elsewhere.
Never assume the existing README is correct.
Never read the existing README without operator authorization.
Never optimize for template completeness.
Never use prose quality to hide unresolved ambiguity.
Always optimize for a README that is justified, accurate, readable, and fitted to the real project and the real reader.
