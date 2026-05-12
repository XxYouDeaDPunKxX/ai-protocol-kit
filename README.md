# ai-protocol-kit

Operational protocols for AI-assisted work.

This repository is a protocol kit, not a software package. It contains reusable instructions for shaping, reviewing, publishing, and orchestrating AI-assisted work with stronger structure and fewer hidden assumptions.

## Who it is for

- operators using AI for real production work
- non-developers who need repeatable AI workflows
- builders who need cleaner briefs, publication checks, and review loops
- reviewers who need protocols that constrain AI output instead of merely prompting for style

## What is inside

| Protocol | Use when |
|---|---|
| [GitHub Pages Discovery Set Protocol v1](protocols/github-pages-discovery-set-protocol-v1.md) | Use when preparing GitHub Pages user/org sites, project sites, or custom-domain Pages sites with correct publication roots, discovery files, canonical URLs, sitemap, robots handling, and low-noise machine-readable footer links without breaking GitHub Pages path rules. |
| [GitHub README Framing and Authoring Protocol v2](protocols/github-readme-framing-authoring-protocol-v2.md) | Use when writing or restructuring a GitHub repository README from repository evidence, reader fit, and the real job the README must perform, instead of relying on chat momentum, summaries, or generic README templates. |
| [Idea Shaping Protocol v1](protocols/idea-shaping-protocol-v1.md) | Use when an idea is still rough and you need to turn it into a clear structure before asking AI to write, plan, design, or build anything. |
| [HTML Page & Tool Briefing Protocol v2](protocols/html%20page%20and%20tool%20briefing%20protocol%20v2.md) | Use when you need to guide an AI from raw intake to a complete implementation brief for a static HTML page, web surface, or local tool, with explicit structure, DOM order, responsive behavior, copy, data schema, and implementation rails. |
| [Field Findings & Bugs Protocol v2](protocols/field-findings-and-bugs-protocol-v2.md) | Use during reviews or multi-lens analysis to capture findings and bugs as a structured artifact, keeping evidence, inference, uncertainty, relations, and later promotion separate. |
| [HTML and Website Discovery Set Protocol v1.2](protocols/html-and-website-discovery-set-protocol-v1-2.md) | Use when preparing static HTML pages or websites with machine-readable discovery files, head metadata, canonical URLs, sitemap, robots rules, and low-noise footer links, especially for GitHub Pages and other static publication surfaces. |
| [PHI-Lens Protocol v4.a](protocols/phi-lens-protocol-v4-a.md) | Resolving multi-constraint AI tasks through asymmetric force hierarchy. Proportion and growth inspired by Fibonacci and golden ratio logic, not equal weight. |
| [Pre-Task Expansion Protocol v1](protocols/pre-task-expansion-protocol-v1.md) | Use when you need to stop an AI from collapsing too quickly into the obvious answer, making it expose alternative readings, lay the problem flat, group the real tensions, and build down only after the surrounding shape is visible. |
| [Output for Real Readers Protocol v2](protocols/output-for-real-readers-protocol-v2.md) | Building a closed brief for final output aimed at real readers. |
| [Public Page Publication Protocol v2](protocols/public-page-publication-protocol-v2.md) | Preparing a public page or site surface before publication. |
| [Structural Shaping Protocol v1](protocols/structural-shaping-protocol-v1.md) | Use when ambiguous input needs to be shaped into operational form before synthesis, with gates, evidence level, source boundaries, and artifact direction kept explicit. |
| [System Reading Protocol v0.2](protocols/system-reading-protocol-v0-2.md) | Use when reading the gap between declared intent and observable behavior to extract the operative principle of a system without producing premature solutions. |
| [Triad AI Orchestration Protocol v3](protocols/triad-ai-orchestration-protocol-v3.md) | Use when running a review loop between an executing AI near the real target and a reviewing AI over snapshots, repo state, diffs, or files, with the operator mediating updates, preserving target authority, and keeping claims, patch status, and test evidence explicit. |

## How to use

1. Choose the protocol closest to the task.
2. Paste it into the working context before execution.
3. Treat it as an operational contract for the AI session.
4. Keep higher-priority system, safety, legal, privacy, and tool instructions above any protocol.
5. Adapt only at the boundary of the specific task. Do not rewrite the protocol mid-run unless that is the task.

## What this is not

- not a prompt collection optimized for novelty
- not a software library
- not an automation framework
- not a guarantee of correctness
- not a substitute for human judgment

## Repository status

Active working kit. Protocols may evolve as they are tested in real workflows.

## License

Creative Commons Attribution-ShareAlike 4.0 International.

See [LICENSE](LICENSE).
