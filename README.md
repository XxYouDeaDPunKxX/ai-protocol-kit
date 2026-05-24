# 🧰 ai-protocol-kit

A collection of AI protocols I use to make AI-assisted work more structured, inspectable, and easier to repeat.

Some protocols help shape rough ideas before asking an AI to build or write. Some help review findings, bugs, repo changes, public pages, README files, or GitHub publication steps. Others are meant for more complex sessions, where the AI needs stronger rails before it answers, reviews, or produces final output.

These protocols are experimental and made for my own real workflows. I share them because they may be useful to other people working with AI in practical, messy, non-theoretical situations.

They are not magic prompts. They are working contracts: instructions you give to the AI so it knows how to approach a task, what to check, what not to assume, when to stop, and what kind of output is acceptable.

## 🗃️ What is inside

| Protocol | Use when |
|---|---|
| 🧿[GitHub Pages Discovery Set Protocol v1](protocols/github-pages-discovery-set-protocol-v1.md)  | Use when preparing GitHub Pages user/org sites, project sites, or custom-domain Pages sites with correct publication roots, discovery files, canonical URLs, sitemap, robots handling, and low-noise machine-readable footer links without breaking GitHub Pages path rules. |
| 🚦[GitHub Repository Publication Preparation Protocol v2](protocols/github-repository-publication-preparation-protocol-v2.md)  | Use before making a repository public or preparing it for clean GitHub publication, forcing project classification, workspace and risk audit, minimal file/package decisions, GitHub feature choices, and confirmation before commits, remotes, Pages, or push. |
| 📊[GitHub Badge, Telemetry & Counter Protocol v1.2.3](protocols/github-badge-telemetry-counter-protocol-v1-2-3.md) | Use when deciding which badges, counters, analytics, traffic checks, or validation checks actually make sense for a GitHub repo or GitHub Page, without adding vanity widgets or numbers that do not mean anything useful. |
| 📝[GitHub README Framing and Authoring Protocol v2](protocols/github-readme-framing-authoring-protocol-v2.md)  | Use when writing or restructuring a GitHub repository README from repository evidence, reader fit, and the real job the README must perform, instead of relying on chat momentum, summaries, or generic README templates. |
| 🌐[Public Page Publication Protocol v2](protocols/public-page-publication-protocol-v2.md)  | Use when preparing, restructuring, or publishing a public page, landing page, showcase, portfolio page, documentation entrypoint, or GitHub Pages site, forcing page role, audience, structure, links, metadata, visual identity, accessibility, and publication risks to close before deploy or push. |
| 🧩[Idea Shaping Protocol v1](protocols/idea-shaping-protocol-v1.md)  | Use when an idea is still rough and you need to turn it into a clear structure before asking AI to write, plan, design, or build anything. |
| 🧱[HTML Page & Tool Briefing Protocol v2](protocols/html-page-and-tool-briefing-protocol-v2.md)  | Use when you need to guide an AI from raw intake to a complete implementation brief for a static HTML page, web surface, or local tool, with explicit structure, DOM order, responsive behavior, copy, data schema, and implementation rails. |
| 🐞[Field Findings & Bugs Protocol v2](protocols/field-findings-and-bugs-protocol-v2.md)  | Use during reviews or multi-lens analysis to capture findings and bugs as a structured artifact, keeping evidence, inference, uncertainty, relations, and later promotion separate. |
| 🛰️[HTML and Website Discovery Set Protocol v1.2](protocols/html-and-website-discovery-set-protocol-v1-2.md)  | Use when preparing static HTML pages or websites with machine-readable discovery files, head metadata, canonical URLs, sitemap, robots rules, and low-noise footer links, especially for GitHub Pages and other static publication surfaces. |
| 🌀[PHI-Lens Protocol v4.a](protocols/phi-lens-protocol-v4-a.md)  | Use for non-trivial AI tasks where constraints interact, keeping multiple lenses active and resolving conflicts through golden-ratio-inspired asymmetry, Fibonacci-like non-uniform growth, and explicit dominant/counterforce priority instead of flat compromise. |
| 🔍[Pre-Task Expansion Protocol v1](protocols/pre-task-expansion-protocol-v1.md)  | Use when you need to stop an AI from collapsing too quickly into the obvious answer, making it expose alternative readings, lay the problem flat, group the real tensions, and build down only after the surrounding shape is visible. |
| 🗣️[Output for Real Readers Protocol v2](protocols/output-for-real-readers-protocol-v2.md)  | Use when asking AI to write guides, README text, emails, pages, forms, instructions, or other reader-facing material, forcing reader, purpose, tone, constraints, and language to close before it writes in the wrong voice. |
| 🧬[Structural Shaping Protocol v1](protocols/structural-shaping-protocol-v1.md)  | Use when ambiguous input needs to be shaped into operational form before synthesis, with gates, evidence level, source boundaries, and artifact direction kept explicit. |
| 📡[System Reading Protocol v0.2](protocols/system-reading-protocol-v0-2.md)  | Use when reading the gap between declared intent and observable behavior to extract the operative principle of a system without producing premature solutions. |
| 🔺[Triad AI Orchestration Protocol v3](protocols/triad-ai-orchestration-protocol-v3.md)  | Use when running a review loop between an executing AI near the real target and a reviewing AI over snapshots, repo state, diffs, or files, with the operator mediating updates, preserving target authority, and keeping claims, patch status, and test evidence explicit. |

## 🧷 How to use a protocol

1. Pick the protocol closest to the actual job.
2. Paste the protocol into the AI context before execution.
3. State the task, the target files or material, and any hard constraints.
4. Let the protocol control the workflow: questions, gates, review, assumptions, and final output.

Do not stack protocols casually. Use the smallest set that fits the task.

For repository work, give the AI the repository state or a current snapshot. For GitHub-based loops, make sure the AI can inspect the current files, diffs, or pushed state before judging the work.

## 🚫 What this is not

This is not a replacement for judgment.

These protocols do not guarantee correctness. They reduce common failure modes: rushing to the obvious answer, writing for the wrong reader, inventing unsupported claims, treating chat summaries as repository truth, publishing before review, or letting AI tools approve their own work.

They also do not override higher-priority instructions. Safety, legality, privacy, data integrity, and tool limits remain above any protocol in this kit.

## 🔧 Repository status

Active working kit. Protocols may evolve as they are tested in real workflows.

## 🤖 AI-assisted development

This project was developed with AI assistance.

The project, documentation, and repository materials were shaped through human-directed work supported by AI tools during drafting, structuring, review, and refinement.

AI assistance does not make the project automatically correct, complete, or suitable for every use case. Read it, test it, and adapt it to your own context.

## 🏷️ License

Creative Commons Attribution-ShareAlike 4.0 International.

See [LICENSE](LICENSE).
