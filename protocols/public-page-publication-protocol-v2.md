PUBLIC PAGE PUBLICATION PROTOCOL v1

Use this file before preparing, publishing, or restructuring any public-facing page or site surface.

Purpose
Prepare a public page for clean publication as an intentional public surface.
Do not assume the page is technical documentation.
Do not assume the page belongs to a software project.
Do not assume every project needs a page.
Do not assume every page should behave like a landing page.

Core rule
Build the smallest correct public page that matches the real project, the real audience, and the real function of the page.

Operating rules

1. Follow the phases in order.
2. Do not skip directly to visual edits, file generation, branch setup, deployment, or push.
3. Before acting, identify the environment, understand what kind of public surface is being created, anticipate likely failure points for that surface, choose the method that avoids them, and then act.
4. If a meaningful ambiguity remains and could change public meaning, audience fit, structure, visibility, or publication scope, stop and ask before modifying anything.
5. Do not generate a page, subpage, docs surface, navigation structure, assets, or deployment setup unless they are justified by the actual project and the intended public surface.
6. Do not optimize for completeness by default. Optimize for correctness, clarity, minimality, and public-surface readiness.

PHASE 1 - Classify the project and the page role

Determine and report:

- project name
- project type
- primary purpose
- target audience
- current maturity
- intended public identity
- whether a page is justified at all
- the role of the page if it exists
- the primary public unit

Possible page roles include:

- landing page
- project overview
- orientation page
- documentation entrypoint
- showcase
- portfolio surface
- archive
- reading surface
- distribution surface
- support surface for a repository or product

Possible primary public units include:

- repository
- static page
- documentation surface
- artifact collection
- release surface
- portfolio entry
- institutional or informational page

Questions to close in this phase:

- what is this project in public terms
- what should a visitor understand within the first seconds
- what should a visitor do next
- what is the page's primary message
- what is the page's supporting message
- is the page the primary public surface or a supporting surface
- what belongs in the page
- what explicitly does not belong in the page

Use real evidence from the workspace.

Stop and ask if classification remains materially ambiguous.

PHASE 2 - Analyze the source surface

Inspect the workspace enough to make sound page-publication decisions.

Determine and report:

- current semantic HTML structure, if any
- whether the DOM order matches the intended reading order
- whether the page remains understandable before CSS is applied
- whether the page uses HTML5 semantic elements appropriately
- whether heading hierarchy is coherent
- whether layout depends on fixed widths, fixed heights, absolute positioning, or z-index layering
- whether any element causes or may cause horizontal overflow
- whether child elements exceed parent containers
- whether decorative elements are present in the DOM
- whether pseudo-elements are used for decoration, content, or structure
- whether JavaScript is present and whether each script has a justified behavior
- whether external CSS libraries or frameworks are present and justified
- whether accessibility baseline signals are present
- whether SEO metadata is present when the page is public-facing

- current page or site structure, if any
- current public-facing content already present
- whether page content is mixed with non-page material
- entry files or page entrypoints
- internal links the page depends on
- external links or external surfaces the page points to
- whether linked external surfaces are live, current, intended, and consistent with the page's public identity
- visual identity signals already present
- assets already present
- whether metadata already exists
- whether favicon, social preview, or canonical public identity elements already exist
- whether the page currently lives inside a broader project surface
- whether the page is isolated or entangled with non-page content
- whether the current location is appropriate for long-term maintenance
- whether the workspace is already a git repository
- whether remotes already exist
- whether a published page already exists

Do not generate files in this phase.

Read only enough to close the public-surface decision perimeter.

PHASE 3 - Run the public-surface risk audit

Check and report:

- sensitive or private content that should not appear on the page
- internal-only notes, drafts, backups, or operational material that should not be published
- assets whose license or attribution status is unclear
- content copied from other contexts that may not fit the intended public audience
- links that expose unfinished, internal, or unintended surfaces
- internal links or internal routes the page materially depends on but which are broken, missing, stale, or publicly incoherent
- linked external surfaces that are unready, stale, incoherent, or inconsistent with the intended public surface
- page content that misrepresents project status, scope, or maturity
- stale or aspirational claims presented as current public reality
- structural mixing between page content and repository-only content
- visual or messaging mismatch between the real project and the page surface
- technical deployment risks
- any anomaly that should block publication

If publication-blocking issues are found, stop and provide remediation steps before continuing.

Treat the following as publication-blocking unless explicitly justified:

- uncontrolled horizontal page scroll
- broken responsive behavior on mobile or desktop
- overlapping content at normal viewport sizes
- invalid or non-standard HTML used as structure
- essential content generated only through CSS pseudo-elements
- public-facing page without a coherent h1/title relationship
- public-facing page with materially missing metadata
- JavaScript required for basic reading of static content
- visual structure that misrepresents the page's actual public role


External-link stop rule:

- if the page materially depends on internal routes or internal surfaces that are broken, missing, stale, or incoherent, stop before publication
- if the page materially depends on external surfaces that are not ready, not verified, stale, or publicly incoherent, stop before publication
- do not publish a page that creates a false sense of readiness by pointing users into broken, abandoned, contradictory, or premature external surfaces
- do not publish a page that creates a false sense of completeness through broken or misleading internal navigation

PHASE 4 - Design the public page model

Before generating or editing files, decide and report:

- the semantic HTML5 skeleton of the page
- the logical DOM order
- the heading hierarchy
- the responsive model for mobile, tablet, and desktop when relevant
- whether layout should use normal flow, flex, grid, or a combination
- whether grid is genuinely needed or flex is sufficient
- the spacing scale
- the maximum content width strategy
- the decorative background strategy
- whether pseudo-elements are allowed and for what purpose
- whether JavaScript is needed at all
- whether any external CSS library or framework is justified
- the accessibility baseline required for this public surface
- the SEO baseline required for this public surface

- whether the page should exist now, later, or not at all
- the role of the page
- what content categories the page should contain
- what content categories must stay out of the page
- what the visitor should see first
- what the primary message is
- what the supporting message is
- what the next action is, if any
- whether the page should be single-surface or multi-page
- whether the page should be isolated from the main project surface
- where the page source should live
- what deployment model applies
- what level of visual identity is justified
- what metadata is required
- whether a favicon is justified
- whether a share image or social preview is justified
- whether analytics, forms, comments, or extra integrations are justified
- whether the page should prioritize clarity, conversion, orientation, reading, or reference

Visual identity guidance:

- minimal identity: use when the page is primarily functional, referential, internal-adjacent, temporary, or low-maintenance
- coherent identity: use when the page should feel intentional and project-specific without requiring a full brand system
- strong branded identity: use when the page is a flagship public surface, a showcase, a portfolio-facing surface, or a primary discovery surface

To choose the level of visual identity, explicitly consider:

- how public-facing the page is
- whether the page is a primary impression surface
- whether the project already has recognizable visual signals
- whether stronger identity improves comprehension or only adds aesthetic work
- whether the page will be maintained enough to justify a stronger visual layer
- whether the chosen identity level matches the project's real maturity and public ambition

Identity containment rule:

- if the project does not yet have stable identity signals, do not invent a strong branded layer
- when identity is still unclear, default to minimal identity or coherent identity
- do not let the page look more resolved, formalized, or mature than the actual project

Rules:

- do not generate extra sections by default
- do not generate multi-page structure by default
- do not generate decorative assets by default
- do not generate interactivity by default
- do not let visual ambition outrun project identity
- do not let page structure expand beyond the real role of the page
- if the page has no meaningful next action, it must still close cleanly through orientation, understanding, or reference value rather than feeling unfinished
- prefer the smallest correct public surface

PHASE 5 - Define the minimum page package

Generate only the elements justified by the page model.

Possible elements include:

- page entry file
- stylesheet
- script
- favicon
- social/share preview image
- title
- description
- canonical link
- navigation
- footer
- public links
- minimal supporting assets

Generation rules:

- build semantic HTML before writing CSS
- keep DOM order aligned with reading order
- use HTML5 semantic elements where appropriate
- keep heading hierarchy coherent
- separate content structure from visual decoration
- use CSS backgrounds instead of empty background elements where possible
- use ::before and ::after only for non-essential decoration
- define a spacing scale before applying margins, padding, and gaps
- use flex for simple one-dimensional layouts
- use grid only when the page model requires two-dimensional layout
- avoid fixed widths and heights unless explicitly justified
- constrain media and wide elements to their containers
- ensure child elements do not unintentionally exceed parent containers
- prevent uncontrolled horizontal scroll
- do not solve overflow by blindly applying overflow-x: hidden
- avoid absolute positioning and z-index layering as the primary layout method
- add JavaScript only for justified behavior
- scope JavaScript and avoid unnecessary global variables
- add external CSS libraries or frameworks only if justified by the page model
- include title and description for public-facing pages
- include accessibility basics appropriate to the surface

- infer from the real project and the real role of the page
- extend existing files when appropriate instead of replacing them
- do not generate placeholder sections
- do not create pages or assets only because they are common
- if an element is skipped, state why
- if an element requires unresolved policy or identity input, stop and ask before generating it

Generate a coherent public page package.

PHASE 6 - Review before any publication action

Before committing, deploying, configuring a page source, or pushing, produce a concise review that states:

- whether the HTML structure is semantic and coherent
- whether DOM order matches the intended reading order
- whether CSS is only handling presentation/layout and not compensating for wrong structure
- whether responsive behavior was checked across relevant viewport sizes
- whether horizontal scroll is absent or explicitly justified
- whether any element overflows, overlaps, or escapes its container
- whether decorative layers are implemented without polluting the DOM
- whether pseudo-elements are only decorative
- whether JavaScript is justified and scoped
- whether external CSS libraries or frameworks are justified
- whether accessibility baseline is satisfied
- whether SEO metadata is present when relevant

- what the page is for
- what the page includes
- what the page excludes
- what public claims the page makes
- which files were added or modified
- where the page source will live
- what remains repository-only or otherwise outside the page
- which decisions are now frozen
- which decisions still require confirmation
- which risks remain

Do not commit, deploy, configure, or push until this review is complete and the page package is confirmed.

PHASE 7 - Execute publication

After confirmation, perform the minimum clean publication sequence required by the environment.

Possible actions include:

- isolate the page source if needed
- create or update the page surface
- execute the publication sequence required by the actual deployment model
- stage files intentionally
- commit intentionally
- push the page source
- configure the page source location
- publish metadata and page identity elements
- verify the live public surface

Do not assume publication means only pushing files.
Publication includes the visible public surface, its identity, its scope, and its deployment behavior.

Possible deployment models include:

- source-based deployment
- artifact-based deployment
- platform-managed page hosting
- externally hosted static deployment

PHASE 8 - Final post-publication checklist

After publication, produce a checklist containing only the relevant remaining manual tasks.

Possible items include:

- verify semantic structure in the rendered page
- verify logical reading order
- verify heading hierarchy
- verify no unintended horizontal scroll
- verify responsive behavior by resizing the viewport
- verify that no content overlaps at normal viewport sizes
- verify that media and wide elements stay inside their containers
- verify that decorative layers do not interfere with reading, interaction, or layout
- verify that JavaScript is not required for basic reading of static content
- verify keyboard navigation for interactive elements
- verify visible focus states
- verify basic contrast readability
- verify alt text where images carry meaning

- verify live rendering
- verify mobile rendering
- verify title and description
- verify share preview
- verify favicon
- verify links
- verify that excluded material stayed excluded
- verify that the page matches the intended role
- verify that the page does not overstate the project
- verify that no unintended files or surfaces became public

Final safeguards

- Never assume every project needs a public page.
- Never assume every page is a landing page.
- Never assume the page should contain all public project material.
- Never assume the page belongs inside the main project surface.
- Never assume a repository and a page have the same publication model.
- Never optimize for maximum surface area.
- Always optimize for a clean, justified, publication-ready public surface.
