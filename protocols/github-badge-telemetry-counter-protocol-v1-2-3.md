# GitHub Badge, Telemetry & Counter Protocol

Version: v1.2.3
Type: LLM operational protocol
Scope: deciding which GitHub repository and GitHub Pages badges, counters, telemetry, checks, and related signal layers are justified.

---

## Core Object

A signal layer is one of:

- badge;
- counter;
- telemetry or analytics tag;
- validation script;
- verification workflow;
- external signal service;
- traffic or observability review.

This protocol may read repository, license, release, workflow, Page, and metadata state only as evidence.

This protocol must not create or govern:

- publication packages;
- licensing choices;
- repository identity;
- repository settings;
- discovery files;
- citation infrastructure;
- funding or support setup;
- release strategy;
- changelog strategy.

---

## Core Principle

Signals are not decoration.

A signal is justified only when it improves one of:

- understanding;
- verification;
- observability;
- maintenance;
- reuse confidence;
- operational decision-making.

Do not add a signal to make a repository look more mature than it is.

Do not create infrastructure only to justify a badge.

Do not measure a surface before its relevant integrity is closed.

---

## Decision States

Allowed decisions:

- APPLY: use now because evidence and prerequisites are satisfied.
- SKIP: do not use because the signal is not justified.
- DEFER: may become valid after a concrete trigger.
- BLOCKED_INTEGRITY: cannot decide because the relevant surface has not passed the required validation gate.
- BLOCKED_PAGE_STATE: cannot decide because a requested Page-dependent signal lacks required Page evidence.
- BLOCKED_EXTERNAL_SERVICE: cannot decide because external service behavior, privacy, dependency, or purpose is unresolved.
- BLOCKED_SIGNAL_EVIDENCE: cannot decide because validation is not the blocker, but a specific backing fact required by the requested signal is missing.

For every DEFER decision, output:

- unblock trigger;
- owner of trigger, if known;
- required evidence after trigger;
- signal to re-evaluate.

BLOCKED is not a softer DEFER.

If no concrete trigger exists, use SKIP or a BLOCKED state.

### Blocked State Disambiguation

Use BLOCKED_INTEGRITY when the relevant surface has not passed the required validation gate.

Use BLOCKED_SIGNAL_EVIDENCE when the gate is not the problem, but signal backing evidence is missing.

Use BLOCKED_PAGE_STATE when Page existence, URL, deployment state, or insertion surface blocks a Page-dependent signal.

Use BLOCKED_EXTERNAL_SERVICE when external service behavior, privacy, dependency, or purpose is unresolved.

Examples:

- license badge requested, but license file or license recognition state is unknown: BLOCKED_SIGNAL_EVIDENCE;
- workflow badge requested, but workflow existence or status is unknown: BLOCKED_SIGNAL_EVIDENCE;
- package/service badge requested, but backing package or service state is unknown: BLOCKED_SIGNAL_EVIDENCE;
- workflow exists, but has not passed the required run: BLOCKED_INTEGRITY;
- Page analytics requested, but Page URL is unknown: BLOCKED_PAGE_STATE;
- analytics service privacy behavior is unknown: BLOCKED_EXTERNAL_SERVICE.

---

## Phase 1 - Classify Signal Context

Determine only what affects signal choice:

- repository name;
- repository type;
- primary published unit;
- primary reader;
- signal purpose;
- existing README;
- existing license state;
- existing release or tag state;
- existing scripts;
- existing workflows;
- existing badges;
- existing counters;
- existing analytics or telemetry;
- existing external signal services;
- GitHub Page state, only if:
  - a requested signal depends on a Page; or
  - the operator explicitly asks to evaluate Page-dependent signals;
- maintenance model;
- observability need.

Supported repository types:

- PROFILE_HUB;
- PROTOCOL_REPO;
- KIT_DOCS_REPO;
- TECHNICAL_REPO;
- STATIC_PAGE_REPO;
- CONTENT_REPO;
- ARCHIVE_REPO;
- INTERNAL_OPERATIONAL_REPO;
- HYBRID_REPO.

Do not recommend repository settings from this phase.

Do not recommend description, topics, homepage, social preview, or repository features.

---

## Phase 2 - Detect Existing Signals

Inspect enough evidence to classify:

- badges: none / semantic / dynamic / service / stale / unknown;
- counters: none / README hit counter / profile counter / service counter / unknown;
- telemetry: none / Page analytics / product analytics / unknown / misplaced;
- validation scripts: none / local script / package script / custom validator / unknown;
- verification workflows: none / existing workflow / passing workflow / failing workflow / unknown;
- external services: none / badge service / analytics service / counter service / status service / unknown;
- traffic review source: GitHub-native / external / none / unknown.

If a signal exists but its backing evidence does not exist, mark it stale or invalid and report it under Existing Signal Cleanup.

GitHub Traffic review is operator-facing by default.

It must not be exposed as a public signal unless explicitly exported by the operator.

Stars, forks, and watchers are public counters, not GitHub Traffic review.

---

## Existing Signal Cleanup

Existing invalid signals are not APPLY, SKIP, or DEFER decisions.

If an existing signal is stale, invalid, misleading, or unsupported, report it under Signal cleanup.

Existing signal cleanup may be reported even when integrity is blocked, if the cleanup removes or blocks a misleading unsupported signal.

For each cleanup item, output:

- signal;
- current target;
- problem;
- missing or invalid backing evidence;
- minimum action: remove / replace / block until evidence exists;
- risk if left unchanged.

Examples:

- CI badge exists but workflow is absent: remove badge, or block until a real workflow exists and passes.
- Release badge exists but no release or tag exists: remove badge, or block until release or tag exists.
- Analytics script exists but service or privacy behavior is unknown: block external service, or remove script.

---

## Phase 3 - Integrity Gate

Before recommending public badges, counters, analytics, external services, or public status signals, close the relevant integrity gate.

Relevant integrity may include:

- README links;
- docs links;
- image paths;
- relative links;
- release or download links;
- script commands;
- validation command;
- workflow state;
- Page URL and insertion surface, only for Page-dependent signals.

A recommendation to run a check is not a passing gate.

Integrity passes only when one of these is true:

- the check was executed successfully;
- a passing result is available from reliable evidence;
- an existing workflow covers the relevant surface and passes;
- the operator explicitly provides a passing result.

If no relevant integrity surface exists for the requested signals, Integrity gate status = NOT_APPLICABLE.

Do not create a validation script, workflow, or check only to avoid NOT_APPLICABLE.

Integrity gate does not block recommendations whose only purpose is to create or make repeatable the integrity check itself.

Allowed while integrity is blocked:

- recommend a validation script;
- recommend a verification workflow;
- recommend an exact check command;
- recommend removal of a stale or unsupported existing signal.

Not allowed while integrity is blocked:

- public badge;
- counter;
- analytics;
- external public signal;
- public status signal.

If integrity is blocked, output only the unblock report for the blocked signal or blocked task, plus any allowed recommendation needed to create or repeat the integrity check.

---

## Phase 4 - Page Signal Gate

Activate this phase only if at least one requested signal depends on a GitHub Page, or the operator explicitly asks to evaluate Page-dependent signals.

If no requested signal depends on a GitHub Page and the operator did not ask to evaluate Page-dependent signals, skip this phase.

Required evidence:

- Page exists: YES / NO / UNKNOWN;
- Page planned: YES / NO / UNKNOWN;
- Page URL known: YES / NO / UNKNOWN;
- deployment state known: YES / NO / UNKNOWN;
- insertion surface known: YES / NO / UNKNOWN;
- requested signal depends on Page: YES / NO.

Allowed Page-dependent signals:

- Page analytics;
- Page hit counter;
- Page availability badge;
- uptime badge;
- external Page telemetry.

Not in scope:

- discovery files;
- canonical URLs;
- Open Graph;
- sitemap;
- robots;
- llms.txt;
- raw-manifest;
- footer discovery links.

If requested signal depends on a GitHub Page and Page exists = UNKNOWN:

- mark Page-dependent signals as BLOCKED_PAGE_STATE.

If requested signal depends on a GitHub Page and Page exists = NO:

- if Page planned = UNKNOWN: mark Page-dependent signals as BLOCKED_PAGE_STATE;
- if Page planned = NO: SKIP;
- if Page planned = YES: DEFER;
- DEFER unblock trigger = Page exists + Page URL known + deployment state known + insertion surface known.

Deployment or status badge must be classified by backing evidence:

- GitHub Actions workflow badge: workflow evidence;
- Page availability badge: Page state + external service gate;
- uptime badge: Page state + external service gate.

---

## Phase 5 - Signal Families

Evaluate only these families:

1. Semantic badges
2. Dynamic GitHub badges
3. Service badges
4. README or profile counters
5. Page analytics or telemetry
6. Validation scripts
7. Verification workflows
8. Workflow or status badges
9. External signal services
10. GitHub Traffic or observability review
11. Signal-tied reporting

Evaluate each relevant family using the rules below.

Skip families that do not match the requested signal or available evidence.

---

## Semantic Badge Vocabulary

Use controlled semantic badge values unless the operator explicitly approves a new one.

STATUS:

- experimental;
- active;
- stable;
- maintained;
- archived;
- deprecated.

TYPE:

- profile_hub;
- ai_protocol;
- skill_system;
- docs_kit;
- technical_tool;
- static_page;
- operational_system;
- content_repo;
- archive;
- hybrid.

USE:

- read;
- load_in_ai;
- copy;
- adapt;
- run;
- deploy;
- reference;
- package.

SCOPE:

- personal;
- public;
- reusable;
- internal;
- experimental.

New semantic badge values require operator approval.

Do not create synonyms when an existing value works.

Do not use semantic badges to make the project sound more mature than it is.

---

## Signal-Only Presets

Use presets only to guide signal selection.

Do not use presets to recommend repository settings, publication work, discovery files, citation infrastructure, funding, or release strategy.

### PROFILE_HUB

- profile counter: optional;
- profile/status semantic badge: conditional;
- GitHub Traffic review: optional/internal;
- stats widgets: usually SKIP;
- project badge wall: SKIP.

### PROTOCOL_REPO

- semantic badges: status / type / use;
- dynamic badges: license if license state is known;
- GitHub Traffic review: optional/internal;
- validation script or workflow: conditional if real check surface exists;
- workflow badge: only if real workflow exists and passes;
- release/version/download badge: only if release/tag/artifact evidence exists;
- Page analytics: only if Page signal gate passes.

### KIT_DOCS_REPO

- semantic badges: status / type;
- dynamic badges: license if license state is known;
- integrity workflow: conditional if docs/links/check surface exists;
- counters: optional;
- GitHub Traffic review: optional/internal;
- Page analytics: only if Page signal gate passes.

### TECHNICAL_REPO

- validation script or workflow: core if real check surface exists;
- workflow badge: only after passing workflow;
- release/download badge: only if artifacts exist;
- service/package badge: only if backing service/package exists;
- README hit counter: usually SKIP.

### STATIC_PAGE_REPO

- Page analytics: conditional if Page signal gate passes and a maintenance decision exists;
- uptime/Page availability badge: conditional after Page state and external service gate pass;
- deployment workflow badge: only if workflow evidence exists;
- badge wall on page: SKIP.

### CONTENT_REPO

- semantic badges: optional;
- link/integrity workflow: conditional if many references exist;
- GitHub Traffic review: optional/internal;
- Page analytics: only if Page signal gate passes;
- technical badges: usually SKIP.

### ARCHIVE_REPO

- archive/status badge: conditional;
- active status badge: SKIP;
- analytics/counters: SKIP unless a real review decision exists;
- workflow badge: SKIP unless integrity still matters.

### INTERNAL_OPERATIONAL_REPO

- public counters: SKIP by default;
- README hit counters: SKIP by default;
- public badges: SKIP unless explicitly public-facing;
- validation scripts/workflows: conditional if operational checks exist;
- GitHub Traffic review: internal only.

### HYBRID_REPO

For hybrid repositories:

1. Identify component repository types.
2. Choose one PRIMARY signal preset.
3. Choose SECONDARY presets only for signal families they actually justify.
4. Resolve public signal conflicts by choosing the smaller public signal surface.
5. Do not combine presets by simple addition.
6. Never suppress a real validation script or verification workflow just because it belongs to a secondary component.

HYBRID_REPO output must state:

- PRIMARY_PRESET;
- SECONDARY_PRESETS;
- INCLUDED_SIGNAL_FAMILIES;
- EXCLUDED_SIGNAL_FAMILIES;
- conflict decisions.

---

## Validation Scripts vs Verification Workflows

Validation script:

- local or package command;
- checks repository or artifact state;
- may exist without public badge;
- may be recommended when it makes integrity repeatable.

Validation scripts may be recommended only when:

- a real repeated integrity check is needed;
- the check cannot be expressed adequately as an existing command;
- the repository has a stable artifact or rule to validate;
- the script is part of making signal decisions repeatable.

Do not create validation scripts only to make the repository look more mature.

Verification workflow:

- automated run, usually GitHub Actions;
- produces observable pass/fail state;
- may justify workflow/status badge only after it exists and passes.

A verification workflow may be recommended as integrity infrastructure without recommending a public workflow badge.

Workflow badge is a separate signal decision and requires:

- workflow exists;
- workflow passes at least once;
- the pass/fail state helps the reader.

Rules:

- workflow badge requires real workflow evidence;
- validation script does not imply CI badge;
- do not create workflow only to justify badge.

---

## Badge Rules

A badge is allowed only if it answers a useful reader question.

Allowed:

- status;
- type;
- use;
- license, if license exists and is recognized;
- workflow status, if workflow exists and passes;
- release/version, if release or tag exists;
- downloads, if downloadable artifacts matter;
- package/service badge, if backing service exists.

Forbidden:

- fake build badge;
- fake package badge;
- coverage badge without coverage evidence;
- release badge without release/tag evidence;
- badge wall;
- maturity-signaling badge unsupported by project state.

---

## Counter and Telemetry Rules

Separate counters from analytics.

Counters:

- public, weak signals;
- may count image hits or requests;
- not reliable unique-user analytics.

Telemetry / analytics:

- belongs only on web/Page surfaces;
- requires Page state and insertion surface;
- requires privacy and dependency review;
- must inform a real decision.

Do not add counters or analytics when no maintenance or decision use exists.

---

## External Service Gate

External Service Gate applies to third-party or non-native services.

Before selecting any third-party badge, counter, analytics script, hosted widget, metric card, or status service, evaluate:

- service name;
- purpose;
- service class: hosted / self-hosted;
- data collected;
- cookie/fingerprint behavior;
- public/private output;
- script weight, if web analytics;
- README image request behavior, if badge/counter;
- dependency risk;
- failure behavior;
- maintenance burden;
- whether GitHub-native data can satisfy the same need.

If privacy behavior is unknown, use BLOCKED_EXTERNAL_SERVICE.

If the service is cosmetic, SKIP.

---

## GitHub-Native Signal Check

For GitHub-native signals, evaluate:

- backing evidence;
- permission/visibility constraints;
- public/private nature;
- whether the signal helps the reader or operator.

---

## Release and License Evidence Rule

License state may be read only to decide:

- license badge.

Release or tag state may be read only to decide:

- release badge;
- version badge;
- download badge.

Do not decide:

- create release;
- define versioning;
- write changelog;
- publish assets;
- choose license.

---

## Signal-Tied Reporting

Reporting is justified only when collected signal data changes a maintenance or operating decision.

Allowed reporting outputs:

- GitHub Traffic review snapshot;
- workflow failure review;
- counter snapshot if intentionally used;
- Page analytics summary if Page analytics is intentionally used;
- external service dependency review.

Reporting must define:

- cadence;
- source;
- owner;
- retention;
- decision it informs.

If no decision is attached, SKIP reporting.

Reporting must not become passive metric hoarding.

Signal-tied reporting is operator-facing by default.

Do not publish reporting outputs unless the operator explicitly requests public reporting and the external/privacy implications pass the relevant gate.

---

## Output

Produce a signal decision table:

| Signal | Decision | Why | Target | Evidence | Prerequisite | Unblock trigger | Risk |
|---|---|---|---|---|---|---|---|

Targets allowed:

- README;
- profile README;
- GitHub Actions;
- local scripts;
- GitHub Page;
- external service;
- existing signal cleanup;
- operator review.

For every DEFER decision, output:

- unblock trigger;
- owner of trigger, if known;
- required evidence after trigger;
- signal to re-evaluate.

Output sections:

- Applied signals;
- Deferred signals;
- Skipped signals;
- Blocked signals;
- Signal cleanup;
- Evidence read;
- Integrity gate;
- Page signal gate, only if relevant;
- External service gate, only if relevant;
- Next minimum action.

If any requested signal is blocked, output blocked entries only for those signals.

If the requested task is entirely blocked, use only the blocked output template.

Do not output Applied/Deferred/Skipped sections for signals not evaluated.

Output must not contain:

- selected repo settings;
- description recommendation;
- topics recommendation;
- homepage recommendation;
- social preview recommendation;
- repository feature recommendation;
- discovery file recommendation;
- citation/funding/release strategy.

---

## Blocked Output Template

```text
SIGNAL SET BLOCKED REPORT

Repository:
Requested signal:
Blocked state:
- BLOCKED_INTEGRITY / BLOCKED_PAGE_STATE / BLOCKED_EXTERNAL_SERVICE / BLOCKED_SIGNAL_EVIDENCE

Why blocked:
- ...

Missing evidence:
- ...

Minimum unblock action:
- ...

Not evaluated yet:
- badges
- counters
- telemetry / analytics
- external services
- public signal rollout
```

---

## Validation Checklist

Before declaring the Signal Set complete, verify:

- only signal layers were evaluated;
- repository settings were not recommended;
- publication, licensing, discovery, citation, funding, release strategy, and changelog strategy were not governed;
- semantic badge values use the controlled vocabulary unless the operator approved a new value;
- every badge has backing evidence;
- workflow badge is backed by a real passing workflow;
- validation script was not used to imply a CI badge;
- public counters are not described as reliable analytics;
- GitHub Traffic review remains operator-facing unless explicitly exported;
- Page-dependent signals passed Page Signal Gate;
- external services passed External Service Gate;
- every DEFER has unblock trigger, owner of trigger if known, required evidence after trigger, and signal to re-evaluate;
- stale, invalid, misleading, or unsupported existing signals were reported under Signal cleanup;
- blocked tasks did not output unevaluated recommendation sections;
- no signal was added for decoration.

---

## Final Rule

A signal is correct only when it has a job.

If it does not improve understanding, verification, observability, maintenance, reuse confidence, or operational decision-making, skip it.

If evidence is missing, block it.

If the trigger is known but not yet satisfied, defer it with the trigger.

If it is decorative, reject it.
