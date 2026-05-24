window.APK_PICKER_DATA = {
  "site": {
    "name": "ai-protocol-kit",
    "url": "https://xxyoudeadpunkxx.github.io/ai-protocol-kit/",
    "repo": "https://github.com/XxYouDeaDPunKxX/ai-protocol-kit"
  },
  "copyInstruction": "Read this protocol exactly as written. Do not rewrite or shorten it. Use it as the behavioral contract for this task or session. If you need to explain something or ask me for input, use plain language. Do not use protocol wording, debug wording, or internal-process language.",
  "groups": [
    "All",
    "Shaping",
    "Writing",
    "Review",
    "Publication",
    "GitHub / Pages & Repo",
    "HTML / Web",
    "Orchestration",
    "System Reading"
  ],
  "steps": [
    {
      "id": "deal",
      "title": "What are you dealing with?",
      "choices": [
        {
          "label": "an idea",
          "tags": [
            "idea",
            "early-stage",
            "clarify",
            "no-start",
            "shaping"
          ]
        },
        {
          "label": "a text",
          "tags": [
            "text",
            "writing",
            "reader-facing",
            "tone",
            "readable"
          ]
        },
        {
          "label": "a public page",
          "tags": [
            "page",
            "public",
            "reader-facing",
            "website",
            "public-surface"
          ]
        },
        {
          "label": "a repository",
          "tags": [
            "repository",
            "github",
            "repo-state",
            "evidence",
            "files"
          ]
        },
        {
          "label": "a review",
          "tags": [
            "review",
            "evidence",
            "findings",
            "weak-points",
            "inspectable"
          ]
        },
        {
          "label": "a decision",
          "tags": [
            "decision",
            "next-move",
            "tradeoff",
            "priority",
            "unclear"
          ]
        },
        {
          "label": "a session",
          "tags": [
            "session",
            "context",
            "drift",
            "controlled-loop",
            "continuity"
          ]
        },
        {
          "label": "a workflow",
          "tags": [
            "workflow",
            "process",
            "controlled-loop",
            "multi-step",
            "coordination"
          ]
        },
        {
          "label": "messy material",
          "tags": [
            "messy",
            "ambiguous",
            "structure",
            "source-boundary",
            "synthesis"
          ]
        },
        {
          "label": "something I want to publish",
          "tags": [
            "publication",
            "public",
            "ready-to-publish",
            "risk",
            "deploy",
            "publishable"
          ]
        }
      ]
    },
    {
      "id": "off",
      "title": "What feels off?",
      "choices": [
        {
          "label": "it is unclear",
          "tags": [
            "unclear",
            "ambiguous",
            "clarify",
            "structure",
            "shaping"
          ]
        },
        {
          "label": "it is too vague",
          "tags": [
            "vague",
            "no-start",
            "clarify",
            "early-stage",
            "framing"
          ]
        },
        {
          "label": "it feels fragile",
          "tags": [
            "fragile",
            "trust-gap",
            "risk",
            "constraints",
            "harden"
          ]
        },
        {
          "label": "it keeps drifting",
          "tags": [
            "drift",
            "context",
            "session",
            "controlled-loop",
            "continuity"
          ]
        },
        {
          "label": "it sounds wrong",
          "tags": [
            "wrong-voice",
            "tone",
            "reader",
            "reader-mismatch",
            "readable"
          ]
        },
        {
          "label": "it looks almost right",
          "tags": [
            "plausible-but-weak",
            "hidden-gap",
            "review-needed",
            "inspectable",
            "weak-points"
          ]
        },
        {
          "label": "it is hard to trust",
          "tags": [
            "trust-gap",
            "evidence",
            "verify",
            "inspectable",
            "uncertainty"
          ]
        },
        {
          "label": "it is not ready",
          "tags": [
            "unready",
            "publication-risk",
            "risk",
            "cleanup",
            "ready-to-publish"
          ]
        },
        {
          "label": "there are too many moving parts",
          "tags": [
            "many-moving-parts",
            "complex",
            "workflow",
            "constraints",
            "priority"
          ]
        },
        {
          "label": "I do not know where to start",
          "tags": [
            "no-start",
            "unclear",
            "framing",
            "expansion",
            "next-move"
          ]
        }
      ]
    },
    {
      "id": "want",
      "title": "What do you want to make happen?",
      "choices": [
        {
          "label": "make it clearer",
          "tags": [
            "clarify",
            "shaping",
            "structure",
            "explanation",
            "usable"
          ]
        },
        {
          "label": "make it readable",
          "tags": [
            "readable",
            "reader",
            "writing",
            "tone",
            "reader-facing"
          ]
        },
        {
          "label": "make it publishable",
          "tags": [
            "publishable",
            "publication",
            "public-surface",
            "metadata",
            "ready-to-publish"
          ]
        },
        {
          "label": "make it inspectable",
          "tags": [
            "inspectable",
            "evidence",
            "review",
            "traceable",
            "verify"
          ]
        },
        {
          "label": "find what is weak",
          "tags": [
            "weak-points",
            "findings",
            "bugs",
            "review-needed",
            "adversarial-review"
          ]
        },
        {
          "label": "prepare the next move",
          "tags": [
            "next-move",
            "decision",
            "closure",
            "operational",
            "continuation"
          ]
        },
        {
          "label": "keep the work controlled",
          "tags": [
            "controlled-loop",
            "workflow",
            "boundaries",
            "session"
          ]
        },
        {
          "label": "turn it into a usable artifact",
          "tags": [
            "artifact",
            "usable",
            "synthesis",
            "structure"
          ]
        },
        {
          "label": "understand what is really happening",
          "tags": [
            "really-happening",
            "system",
            "behavior",
            "intent-gap",
            "diagnose"
          ]
        },
        {
          "label": "prepare implementation",
          "tags": [
            "implementation",
            "brief",
            "html",
            "build-ready",
            "data-schema"
          ]
        }
      ]
    }
  ],
  "protocols": [
    {
      "id": "github-pages-discovery-set-protocol-v1",
      "title": "GitHub Pages Discovery Set Protocol",
      "path": "protocols/github-pages-discovery-set-protocol-v1.md",
      "url": "https://github.com/XxYouDeaDPunKxX/ai-protocol-kit/blob/main/protocols/github-pages-discovery-set-protocol-v1.md",
      "rawUrl": "https://raw.githubusercontent.com/XxYouDeaDPunKxX/ai-protocol-kit/main/protocols/github-pages-discovery-set-protocol-v1.md",
      "group": "GitHub / Pages & Repo",
      "category": "GitHub Pages discovery",
      "shortDescription": "Prepare the machine-readable layer for a GitHub Pages site without breaking Pages path rules.",
      "useWhen": "Use when a GitHub Pages page or site needs correct canonical URLs, discovery files, sitemap, robots handling, and low-noise machine-readable links.",
      "bestFor": [
        "GitHub Pages project sites",
        "user/org sites",
        "custom-domain Pages sites",
        "llms.txt and raw-manifest.json",
        "sitemap.xml and canonical paths"
      ],
      "notFor": [
        "generic hosting",
        "backend apps",
        "SaaS apps",
        "non-GitHub publication targets"
      ],
      "needs": [
        "owner and repo",
        "Pages type",
        "source branch/path",
        "custom domain state",
        "site root and discovery root"
      ],
      "outputMode": "Discovery file plan and publication-safe metadata rules.",
      "searchKeywords": [
        "GitHub Pages",
        "gh-pages",
        "custom domain",
        "sitemap",
        "robots",
        "llms.txt",
        "raw manifest",
        "canonical URL",
        "discovery files",
        "metadata",
        "project site"
      ],
      "primaryTags": [
        "github-pages",
        "discovery",
        "metadata",
        "canonical-url",
        "sitemap",
        "robots",
        "static-page"
      ],
      "secondaryTags": [
        "public",
        "page",
        "website",
        "repository",
        "machine-readable",
        "deploy-ready",
        "publishable",
        "publication"
      ],
      "avoidTags": [
        "non-github-hosting",
        "backend-app",
        "private-only"
      ],
      "companions": [
        "public-page-publication-protocol-v2",
        "html-and-website-discovery-set-protocol-v1-2",
        "html-page-and-tool-briefing-protocol-v2"
      ],
      "order": 1,
      "contextRequired": true,
      "contextTags": [
        "github-pages",
        "github",
        "gh-pages",
        "discovery",
        "canonical-url",
        "sitemap",
        "robots",
        "machine-readable"
      ],
      "intentTags": [
        "metadata",
        "publishable",
        "discovery",
        "canonical-url",
        "sitemap",
        "robots"
      ]
    },
    {
      "id": "github-repository-publication-preparation-protocol-v2",
      "title": "GitHub Repository Publication Preparation Protocol",
      "path": "protocols/github-repository-publication-preparation-protocol-v2.md",
      "url": "https://github.com/XxYouDeaDPunKxX/ai-protocol-kit/blob/main/protocols/github-repository-publication-preparation-protocol-v2.md",
      "rawUrl": "https://raw.githubusercontent.com/XxYouDeaDPunKxX/ai-protocol-kit/main/protocols/github-repository-publication-preparation-protocol-v2.md",
      "group": "GitHub / Pages & Repo",
      "category": "Repository publication",
      "shortDescription": "Prepare a repository before making it public or presenting it as clean GitHub work.",
      "useWhen": "Use when a repository needs a publication audit before visibility changes, Pages setup, commits, remotes, packaging, or push.",
      "bestFor": [
        "repo cleanup",
        "public release prep",
        "GitHub feature choices",
        "file/package decisions",
        "workspace risk checks"
      ],
      "notFor": [
        "writing the actual project page",
        "replacing a project-specific technical review"
      ],
      "needs": [
        "current repo state",
        "target visibility",
        "publication goal",
        "files/package context",
        "GitHub settings if relevant"
      ],
      "outputMode": "Publication readiness checklist and blocked/allowed next actions.",
      "searchKeywords": [
        "repository",
        "publish repo",
        "make public",
        "GitHub",
        "release prep",
        "cleanup",
        "visibility",
        "Pages setup",
        "push",
        "remote"
      ],
      "primaryTags": [
        "repository",
        "github",
        "audit",
        "cleanup",
        "release-ready",
        "repo-state"
      ],
      "secondaryTags": [
        "visibility",
        "risk",
        "files",
        "pages",
        "push",
        "publishable",
        "publication",
        "public",
        "ready-to-publish"
      ],
      "avoidTags": [
        "non-repository",
        "pure-writing",
        "live-webpage-only"
      ],
      "companions": [
        "github-readme-framing-authoring-protocol-v2",
        "public-page-publication-protocol-v2",
        "github-pages-discovery-set-protocol-v1"
      ],
      "order": 2,
      "contextRequired": true,
      "contextTags": [
        "repository",
        "github",
        "repo-state",
        "files",
        "visibility",
        "push",
        "remote"
      ],
      "intentTags": [
        "publishable",
        "publication",
        "ready-to-publish",
        "risk",
        "cleanup"
      ]
    },
    {
      "id": "github-badge-telemetry-counter-protocol-v1-2-3",
      "title": "GitHub Badge, Telemetry & Counter Protocol",
      "path": "protocols/github-badge-telemetry-counter-protocol-v1-2-3.md",
      "url": "https://github.com/XxYouDeaDPunKxX/ai-protocol-kit/blob/main/protocols/github-badge-telemetry-counter-protocol-v1-2-3.md",
      "rawUrl": "https://raw.githubusercontent.com/XxYouDeaDPunKxX/ai-protocol-kit/main/protocols/github-badge-telemetry-counter-protocol-v1-2-3.md",
      "group": "GitHub / Pages & Repo",
      "category": "Badges, counters, and repo signals",
      "shortDescription": "Choose useful badges, counters, analytics, and checks without adding vanity numbers.",
      "useWhen": "Use when a repo or GitHub Page might need badges, counters, analytics, traffic review, or validation checks, and you want to know what is actually worth adding.",
      "bestFor": [
        "GitHub repo badges",
        "README counters",
        "Page analytics",
        "traffic review",
        "validation checks"
      ],
      "notFor": [
        "publishing a repository from scratch",
        "creating discovery files",
        "choosing a license or release strategy"
      ],
      "needs": [
        "current repo or Page state",
        "existing badges or counters",
        "existing workflows or scripts",
        "Page URL if analytics are involved",
        "what decision the signal should help"
      ],
      "outputMode": "Signal decisions: add, skip, defer, block, or clean up existing badges and counters.",
      "searchKeywords": [
        "badge",
        "badges",
        "counter",
        "counters",
        "analytics",
        "telemetry",
        "traffic",
        "GitHub Traffic",
        "workflow badge",
        "validation check",
        "vanity metrics",
        "README counter",
        "Page analytics"
      ],
      "primaryTags": [
        "repository",
        "github",
        "trust-gap",
        "verify",
        "inspectable",
        "repo-state"
      ],
      "secondaryTags": [
        "page",
        "github-pages",
        "public",
        "public-surface",
        "fragile",
        "harden",
        "metrics",
        "workflow",
        "evidence",
        "cleanup",
        "publishable"
      ],
      "avoidTags": [
        "non-repository",
        "pure-writing",
        "idea-only"
      ],
      "companions": [
        "github-repository-publication-preparation-protocol-v2",
        "github-pages-discovery-set-protocol-v1",
        "github-readme-framing-authoring-protocol-v2"
      ],
      "order": 3,
      "contextRequired": true,
      "contextTags": [
        "repository",
        "github",
        "repo-state",
        "github-pages",
        "page"
      ],
      "intentTags": [
        "inspectable",
        "verify",
        "trust-gap",
        "cleanup",
        "publishable"
      ]
    },
    {
      "id": "github-readme-framing-authoring-protocol-v2",
      "title": "GitHub README Framing and Authoring Protocol",
      "path": "protocols/github-readme-framing-authoring-protocol-v2.md",
      "url": "https://github.com/XxYouDeaDPunKxX/ai-protocol-kit/blob/main/protocols/github-readme-framing-authoring-protocol-v2.md",
      "rawUrl": "https://raw.githubusercontent.com/XxYouDeaDPunKxX/ai-protocol-kit/main/protocols/github-readme-framing-authoring-protocol-v2.md",
      "group": "Writing",
      "category": "Repository README",
      "shortDescription": "Write or restructure a GitHub README from repo evidence instead of chat momentum.",
      "useWhen": "Use when a README needs to explain the real project, fit the reader, and avoid generic templates or claims not supported by the repository.",
      "bestFor": [
        "GitHub README work",
        "project framing",
        "repo overview",
        "usage explanation",
        "evidence-based writing"
      ],
      "notFor": [
        "marketing pages",
        "long documentation sites",
        "README rewrites based only on recent chat context"
      ],
      "needs": [
        "repository files",
        "current project state",
        "intended reader",
        "project purpose",
        "constraints"
      ],
      "outputMode": "README structure and reader-facing copy.",
      "searchKeywords": [
        "README",
        "GitHub README",
        "repo description",
        "project framing",
        "documentation",
        "reader",
        "template",
        "repository evidence"
      ],
      "primaryTags": [
        "readme",
        "project-explanation",
        "generic-template"
      ],
      "secondaryTags": [
        "writing",
        "evidence",
        "tone",
        "wrong-voice",
        "readable",
        "repository",
        "github",
        "reader",
        "public",
        "repo-state",
        "reader-facing",
        "files",
        "text",
        "generic-template"
      ],
      "avoidTags": [
        "non-repository",
        "private-note-only"
      ],
      "companions": [
        "output-for-real-readers-protocol-v2",
        "github-repository-publication-preparation-protocol-v2",
        "structural-shaping-protocol-v1"
      ],
      "order": 4,
      "contextRequired": true,
      "contextTags": [
        "repository",
        "github",
        "repo-state",
        "files",
        "readme"
      ],
      "intentTags": [
        "readable",
        "reader",
        "writing",
        "project-explanation",
        "evidence"
      ]
    },
    {
      "id": "gpt-agentic-posture-contract",
      "title": "GPT Agentic Posture Contract",
      "path": "protocols/gpt-agentic-posture-contract.md",
      "url": "https://github.com/XxYouDeaDPunKxX/ai-protocol-kit/blob/main/protocols/gpt-agentic-posture-contract.md",
      "rawUrl": "https://raw.githubusercontent.com/XxYouDeaDPunKxX/ai-protocol-kit/main/protocols/gpt-agentic-posture-contract.md",
      "group": "Orchestration",
      "category": "Agentic execution posture",
      "shortDescription": "Make ChatGPT work more like Codex: tool-aware, grounded in real files, and strict about verification.",
      "useWhen": "Use when ChatGPT needs to act as a Codex-like working agent: operate on real files and artifacts, use Canvas as an execution ledger, verify before claiming, respect repository boundaries, and stop when the task is not ready to proceed.",
      "bestFor": [
        "Codex-like ChatGPT sessions",
        "tool-mediated work",
        "repository and artifact work",
        "multi-step execution",
        "Canvas execution ledger use"
      ],
      "notFor": [
        "simple one-shot answers",
        "pure writing tasks",
        "metadata-only publication checks",
        "static page discovery by itself"
      ],
      "needs": [
        "task boundary",
        "available tools or MCPs",
        "real files or artifacts when involved",
        "Canvas execution ledger for long or systemic work",
        "repository state when repository work is involved"
      ],
      "outputMode": "Codex-like operating posture with verified state, tool use, execution ledger updates, and explicit stop conditions.",
      "searchKeywords": [
        "Codex-like",
        "ChatGPT agent",
        "agentic posture",
        "tool-aware",
        "MCP",
        "Canvas",
        "execution ledger",
        "real files",
        "artifacts",
        "repository boundaries",
        "verification",
        "stateful session",
        "write safety",
        "workflow control"
      ],
      "primaryTags": [
        "agentic-posture",
        "codex-like",
        "tool-aware",
        "real-objects",
        "execution-ledger"
      ],
      "secondaryTags": [
        "session",
        "workflow",
        "controlled-loop",
        "verify",
        "evidence",
        "repository",
        "repo-state",
        "files",
        "artifacts",
        "drift",
        "continuity",
        "many-moving-parts",
        "complex",
        "boundaries",
        "next-move",
        "operational",
        "inspectable",
        "trust-gap",
        "canvas-ledger",
        "grounded-execution",
        "write-safety",
        "runtime-state",
        "artifact-work",
        "multi-step",
        "coordination"
      ],
      "avoidTags": [
        "pure-writing",
        "reader-facing",
        "static-page-only",
        "metadata-only",
        "simple-task",
        "final-output-only",
        "review-needed",
        "weak-points",
        "findings",
        "bugs",
        "idea",
        "early-stage",
        "no-start",
        "public-surface",
        "website",
        "page"
      ],
      "companions": [
        "triad-ai-orchestration-protocol-v3",
        "github-repository-publication-preparation-protocol-v2",
        "field-findings-and-bugs-protocol-v2",
        "pre-task-expansion-protocol-v1"
      ],
      "order": 5,
      "contextRequired": true,
      "contextTags": [
        "session",
        "workflow",
        "repository",
        "repo-state",
        "files",
        "artifacts",
        "tool-aware",
        "runtime-state",
        "execution-ledger",
        "canvas-ledger",
        "drift",
        "continuity",
        "controlled-loop"
      ],
      "intentTags": [
        "controlled-loop",
        "verify",
        "inspectable",
        "next-move",
        "grounded-execution",
        "codex-like",
        "write-safety",
        "boundaries"
      ]
    },
    {
      "id": "public-page-publication-protocol-v2",
      "title": "Public Page Publication Protocol",
      "path": "protocols/public-page-publication-protocol-v2.md",
      "url": "https://github.com/XxYouDeaDPunKxX/ai-protocol-kit/blob/main/protocols/public-page-publication-protocol-v2.md",
      "rawUrl": "https://raw.githubusercontent.com/XxYouDeaDPunKxX/ai-protocol-kit/main/protocols/public-page-publication-protocol-v2.md",
      "group": "Publication",
      "category": "Public page readiness",
      "shortDescription": "Prepare a public page so it is clear, intentional, and ready before publishing.",
      "useWhen": "Use when a public page, landing page, showcase, portfolio entry, documentation entrypoint, or GitHub Pages page needs role, audience, structure, metadata, links, and publication risks checked before release.",
      "bestFor": [
        "public pages",
        "page role",
        "audience fit",
        "publication checks",
        "page structure",
        "deploy readiness"
      ],
      "notFor": [
        "private notes",
        "generic README writing",
        "pages that are not ready to become public"
      ],
      "needs": [
        "current page files or draft",
        "public goal",
        "audience",
        "links",
        "deployment target",
        "known constraints"
      ],
      "outputMode": "Publication-ready page plan, risk check, and file/package decisions.",
      "searchKeywords": [
        "public page",
        "landing page",
        "publish",
        "deployment",
        "GitHub Pages",
        "audience",
        "metadata",
        "accessibility",
        "page structure",
        "portfolio"
      ],
      "primaryTags": [
        "public-page",
        "publication",
        "page",
        "website",
        "ready-to-publish",
        "public-surface",
        "risk",
        "publishable",
        "public",
        "publication-risk",
        "unready"
      ],
      "secondaryTags": [
        "reader-facing",
        "metadata",
        "structure",
        "accessibility",
        "links",
        "visual-identity",
        "deploy"
      ],
      "avoidTags": [
        "private-only",
        "backend-only",
        "non-public"
      ],
      "companions": [
        "github-pages-discovery-set-protocol-v1",
        "html-page-and-tool-briefing-protocol-v2",
        "output-for-real-readers-protocol-v2"
      ],
      "order": 6,
      "contextRequired": false,
      "contextTags": [
        "page",
        "public-page",
        "public-surface",
        "website",
        "reader-facing",
        "public"
      ],
      "intentTags": [
        "publishable",
        "publication",
        "ready-to-publish",
        "metadata",
        "public-surface"
      ]
    },
    {
      "id": "idea-shaping-protocol-v1",
      "title": "Idea Shaping Protocol",
      "path": "protocols/idea-shaping-protocol-v1.md",
      "url": "https://github.com/XxYouDeaDPunKxX/ai-protocol-kit/blob/main/protocols/idea-shaping-protocol-v1.md",
      "rawUrl": "https://raw.githubusercontent.com/XxYouDeaDPunKxX/ai-protocol-kit/main/protocols/idea-shaping-protocol-v1.md",
      "group": "Shaping",
      "category": "Idea shaping",
      "shortDescription": "Turn a rough idea into a clearer structure before asking AI to write, plan, design, or build.",
      "useWhen": "Use when the idea is still vague, mixed, or unstable and needs shape before execution.",
      "bestFor": [
        "rough ideas",
        "early concepts",
        "messy intent",
        "planning before writing or building"
      ],
      "notFor": [
        "final review",
        "publication packaging",
        "implementation details after the idea is already clear"
      ],
      "needs": [
        "the rough idea",
        "intended use",
        "constraints",
        "what feels unclear",
        "examples or non-goals"
      ],
      "outputMode": "Structured idea, boundaries, and next artifact direction.",
      "searchKeywords": [
        "idea",
        "concept",
        "shape idea",
        "unclear idea",
        "brainstorming",
        "planning",
        "structure",
        "early stage"
      ],
      "primaryTags": [
        "idea",
        "unclear",
        "early-stage",
        "shaping",
        "clarify",
        "concept",
        "no-start"
      ],
      "secondaryTags": [
        "vague",
        "messy",
        "structure",
        "next-move",
        "usable"
      ],
      "avoidTags": [
        "already-implemented",
        "final-review-only"
      ],
      "companions": [
        "pre-task-expansion-protocol-v1",
        "structural-shaping-protocol-v1",
        "system-reading-protocol-v0-2"
      ],
      "order": 7,
      "contextRequired": false,
      "contextTags": [
        "idea",
        "early-stage",
        "concept",
        "no-start",
        "vague"
      ],
      "intentTags": [
        "clarify",
        "shaping",
        "structure",
        "usable"
      ]
    },
    {
      "id": "html-page-and-tool-briefing-protocol-v2",
      "title": "HTML Page & Tool Briefing Protocol",
      "path": "protocols/html-page-and-tool-briefing-protocol-v2.md",
      "url": "https://github.com/XxYouDeaDPunKxX/ai-protocol-kit/blob/main/protocols/html-page-and-tool-briefing-protocol-v2.md",
      "rawUrl": "https://raw.githubusercontent.com/XxYouDeaDPunKxX/ai-protocol-kit/main/protocols/html-page-and-tool-briefing-protocol-v2.md",
      "group": "HTML / Web",
      "category": "HTML implementation brief",
      "shortDescription": "Create a complete implementation brief for a static HTML page, web surface, or local tool.",
      "useWhen": "Use when an AI needs to build an HTML page or tool from a closed brief with structure, copy, DOM order, responsive behavior, data schema, and implementation rails.",
      "bestFor": [
        "static HTML",
        "local tools",
        "web surfaces",
        "implementation briefs",
        "DOM order",
        "responsive behavior"
      ],
      "notFor": [
        "live backend apps",
        "vague page ideas that still need public-role decisions",
        "visual styling without structure"
      ],
      "needs": [
        "purpose",
        "views",
        "content",
        "behavior",
        "storage/data needs if any",
        "responsive targets",
        "constraints"
      ],
      "outputMode": "Complete build brief for one-shot implementation.",
      "searchKeywords": [
        "HTML",
        "CSS",
        "static page",
        "web tool",
        "implementation",
        "brief",
        "DOM order",
        "responsive",
        "data schema",
        "local tool"
      ],
      "primaryTags": [
        "html",
        "web",
        "implementation",
        "brief",
        "static-page",
        "tool",
        "structure",
        "responsive",
        "build-ready",
        "data-schema"
      ],
      "secondaryTags": [
        "page",
        "website",
        "copy",
        "data-schema",
        "accessibility",
        "dom-order"
      ],
      "avoidTags": [
        "non-html",
        "pure-text",
        "backend-app"
      ],
      "companions": [
        "public-page-publication-protocol-v2",
        "html-and-website-discovery-set-protocol-v1-2",
        "output-for-real-readers-protocol-v2"
      ],
      "order": 8,
      "contextRequired": false,
      "contextTags": [
        "html",
        "web",
        "implementation",
        "brief",
        "static-page",
        "tool",
        "data-schema",
        "build-ready",
        "page",
        "website",
        "public-surface"
      ],
      "intentTags": [
        "implementation",
        "brief",
        "html",
        "build-ready",
        "data-schema"
      ]
    },
    {
      "id": "field-findings-and-bugs-protocol-v2",
      "title": "Field Findings & Bugs Protocol",
      "path": "protocols/field-findings-and-bugs-protocol-v2.md",
      "url": "https://github.com/XxYouDeaDPunKxX/ai-protocol-kit/blob/main/protocols/field-findings-and-bugs-protocol-v2.md",
      "rawUrl": "https://raw.githubusercontent.com/XxYouDeaDPunKxX/ai-protocol-kit/main/protocols/field-findings-and-bugs-protocol-v2.md",
      "group": "Review",
      "category": "Findings and bugs",
      "shortDescription": "Capture findings and bugs without mixing evidence, inference, uncertainty, and fixes.",
      "useWhen": "Use when a review produces multiple findings and they need to stay structured instead of becoming noisy notes.",
      "bestFor": [
        "bug reviews",
        "field findings",
        "multi-lens analysis",
        "evidence tracking",
        "review artifacts"
      ],
      "notFor": [
        "general brainstorming",
        "final copywriting",
        "simple single-issue bug reports"
      ],
      "needs": [
        "artifact under review",
        "observations",
        "source material",
        "uncertainty level",
        "relation between findings if known"
      ],
      "outputMode": "Structured findings artifact.",
      "searchKeywords": [
        "bugs",
        "findings",
        "review",
        "evidence",
        "uncertainty",
        "issue",
        "audit",
        "analysis",
        "defects",
        "report"
      ],
      "primaryTags": [
        "review",
        "bugs",
        "findings",
        "evidence",
        "inspectable",
        "weak-points",
        "review-needed",
        "plausible-but-weak",
        "hidden-gap",
        "trust-gap"
      ],
      "secondaryTags": [
        "plausible-but-weak",
        "trust-gap",
        "messy",
        "validation",
        "audit",
        "defects",
        "verify",
        "plausible",
        "almost-right",
        "review",
        "inspectable"
      ],
      "avoidTags": [
        "pure-creation",
        "no-review-needed"
      ],
      "companions": [
        "triad-ai-orchestration-protocol-v3",
        "phi-lens-protocol-v4-a",
        "structural-shaping-protocol-v1"
      ],
      "order": 9,
      "contextRequired": false,
      "contextTags": [
        "review",
        "findings",
        "bugs",
        "weak-points",
        "review-needed",
        "plausible-but-weak",
        "trust-gap"
      ],
      "intentTags": [
        "weak-points",
        "findings",
        "bugs",
        "review-needed",
        "inspectable",
        "verify"
      ]
    },
    {
      "id": "html-and-website-discovery-set-protocol-v1-2",
      "title": "HTML and Website Discovery Set Protocol",
      "path": "protocols/html-and-website-discovery-set-protocol-v1-2.md",
      "url": "https://github.com/XxYouDeaDPunKxX/ai-protocol-kit/blob/main/protocols/html-and-website-discovery-set-protocol-v1-2.md",
      "rawUrl": "https://raw.githubusercontent.com/XxYouDeaDPunKxX/ai-protocol-kit/main/protocols/html-and-website-discovery-set-protocol-v1-2.md",
      "group": "HTML / Web",
      "category": "Website discovery",
      "shortDescription": "Prepare discovery files and metadata for static HTML pages or websites.",
      "useWhen": "Use when a static site needs metadata, canonical URLs, sitemap, robots rules, llms.txt, raw manifest, and footer machine links.",
      "bestFor": [
        "static HTML",
        "website metadata",
        "discovery files",
        "crawler/LLM readable surfaces"
      ],
      "notFor": [
        "GitHub Pages-specific path decisions when the GitHub-exclusive protocol is needed first"
      ],
      "needs": [
        "site root",
        "canonical pages",
        "publication target",
        "metadata",
        "discovery file locations"
      ],
      "outputMode": "Website discovery set and metadata checklist.",
      "searchKeywords": [
        "website",
        "static HTML",
        "discovery",
        "metadata",
        "sitemap",
        "robots",
        "llms",
        "manifest",
        "canonical",
        "crawler"
      ],
      "primaryTags": [
        "website",
        "html",
        "discovery",
        "metadata",
        "canonical-url",
        "sitemap",
        "robots",
        "machine-readable"
      ],
      "secondaryTags": [
        "static-page",
        "public",
        "github-pages",
        "deploy",
        "page",
        "publishable"
      ],
      "avoidTags": [
        "backend-app",
        "non-web",
        "private-only"
      ],
      "companions": [
        "github-pages-discovery-set-protocol-v1",
        "public-page-publication-protocol-v2",
        "html-page-and-tool-briefing-protocol-v2"
      ],
      "order": 10,
      "contextRequired": false,
      "contextTags": [
        "website",
        "html",
        "discovery",
        "metadata",
        "canonical-url",
        "sitemap",
        "robots",
        "machine-readable"
      ],
      "intentTags": [
        "metadata",
        "publishable",
        "discovery",
        "canonical-url"
      ]
    },
    {
      "id": "phi-lens-protocol-v4-a",
      "title": "PHI-Lens Protocol",
      "path": "protocols/phi-lens-protocol-v4-a.md",
      "url": "https://github.com/XxYouDeaDPunKxX/ai-protocol-kit/blob/main/protocols/phi-lens-protocol-v4-a.md",
      "rawUrl": "https://raw.githubusercontent.com/XxYouDeaDPunKxX/ai-protocol-kit/main/protocols/phi-lens-protocol-v4-a.md",
      "group": "Shaping",
      "category": "Constraint conflict resolution",
      "shortDescription": "Handle non-trivial AI tasks where constraints interact and flat compromise would weaken the result.",
      "useWhen": "Use when the work has competing pressures and needs one priority to lead without ignoring the other constraints.",
      "bestFor": [
        "complex constraints",
        "trade-offs",
        "conflicting goals",
        "priority resolution",
        "multi-lens tasks"
      ],
      "notFor": [
        "simple tasks",
        "direct edits",
        "cases where one obvious constraint already decides the work"
      ],
      "needs": [
        "goal",
        "constraints",
        "tensions",
        "the priority that should lead if known",
        "constraints that still matter"
      ],
      "outputMode": "Constraint reading and priority-shaped direction.",
      "searchKeywords": [
        "constraints",
        "tradeoff",
        "conflict",
        "priority",
        "lens",
        "complex task",
        "balance",
        "decision",
        "structure",
        "golden ratio",
        "fibonacci"
      ],
      "primaryTags": [
        "constraints",
        "tradeoff",
        "conflict",
        "multi-lens",
        "complex",
        "priority",
        "tension",
        "many-moving-parts"
      ],
      "secondaryTags": [
        "fragile",
        "unclear",
        "system",
        "non-trivial",
        "balance",
        "decision",
        "idea",
        "many-moving-parts",
        "complex",
        "priority",
        "risk"
      ],
      "avoidTags": [
        "simple-task",
        "single-answer",
        "quick-copy"
      ],
      "companions": [
        "pre-task-expansion-protocol-v1",
        "structural-shaping-protocol-v1",
        "field-findings-and-bugs-protocol-v2"
      ],
      "order": 11,
      "contextRequired": false,
      "contextTags": [
        "constraints",
        "tradeoff",
        "conflict",
        "complex",
        "priority",
        "many-moving-parts",
        "decision"
      ],
      "intentTags": [
        "decision",
        "next-move",
        "priority",
        "structure"
      ]
    },
    {
      "id": "pre-task-expansion-protocol-v1",
      "title": "Pre-Task Expansion Protocol",
      "path": "protocols/pre-task-expansion-protocol-v1.md",
      "url": "https://github.com/XxYouDeaDPunKxX/ai-protocol-kit/blob/main/protocols/pre-task-expansion-protocol-v1.md",
      "rawUrl": "https://raw.githubusercontent.com/XxYouDeaDPunKxX/ai-protocol-kit/main/protocols/pre-task-expansion-protocol-v1.md",
      "group": "Shaping",
      "category": "Pre-task expansion",
      "shortDescription": "Slow the AI down before it jumps to the obvious answer.",
      "useWhen": "Use when the task needs alternative readings, surrounding context, grouped tensions, and a better problem shape before execution.",
      "bestFor": [
        "pre-task thinking",
        "unclear requests",
        "alternative readings",
        "avoiding obvious answers",
        "expanding the problem frame"
      ],
      "notFor": [
        "tiny direct edits",
        "urgent one-step tasks",
        "already closed instructions"
      ],
      "needs": [
        "the task prompt",
        "available context",
        "constraints",
        "what kind of output may follow"
      ],
      "outputMode": "Expanded task reading and structured next move.",
      "searchKeywords": [
        "pre task",
        "expansion",
        "obvious answer",
        "alternative reading",
        "unclear request",
        "framing",
        "context",
        "before execution"
      ],
      "primaryTags": [
        "no-start",
        "obvious-answer",
        "expansion",
        "alternative-readings",
        "clarify",
        "framing"
      ],
      "secondaryTags": [
        "idea",
        "vague",
        "unclear",
        "fragile",
        "early-stage",
        "many-moving-parts",
        "next-move"
      ],
      "avoidTags": [
        "final-output-only",
        "already-decided"
      ],
      "companions": [
        "idea-shaping-protocol-v1",
        "structural-shaping-protocol-v1",
        "phi-lens-protocol-v4-a"
      ],
      "order": 12,
      "contextRequired": false,
      "contextTags": [
        "no-start",
        "framing",
        "expansion",
        "vague",
        "unclear",
        "alternative-readings"
      ],
      "intentTags": [
        "clarify",
        "framing",
        "next-move",
        "structure"
      ]
    },
    {
      "id": "output-for-real-readers-protocol-v2",
      "title": "Output for Real Readers Protocol",
      "path": "protocols/output-for-real-readers-protocol-v2.md",
      "url": "https://github.com/XxYouDeaDPunKxX/ai-protocol-kit/blob/main/protocols/output-for-real-readers-protocol-v2.md",
      "rawUrl": "https://raw.githubusercontent.com/XxYouDeaDPunKxX/ai-protocol-kit/main/protocols/output-for-real-readers-protocol-v2.md",
      "group": "Writing",
      "category": "Reader-facing output",
      "shortDescription": "Make AI write for people instead of sounding like it is writing for another AI.",
      "useWhen": "Use when guides, README text, emails, instructions, pages, forms, or other reader-facing material need purpose, tone, reader fit, and plain language closed before writing.",
      "bestFor": [
        "reader-facing text",
        "guides",
        "README sections",
        "public copy",
        "instructions",
        "emails",
        "forms"
      ],
      "notFor": [
        "internal reasoning notes",
        "raw technical specs",
        "protocol-authoring unless the output is meant for real readers"
      ],
      "needs": [
        "reader",
        "purpose",
        "tone",
        "constraints",
        "material to rewrite or produce",
        "where it will appear"
      ],
      "outputMode": "Reader-fit copy.",
      "searchKeywords": [
        "writing",
        "reader",
        "voice",
        "tone",
        "guide",
        "email",
        "instructions",
        "README",
        "public copy",
        "plain language",
        "wrong voice"
      ],
      "primaryTags": [
        "writing",
        "reader",
        "text",
        "wrong-voice",
        "readable",
        "reader-facing",
        "tone"
      ],
      "secondaryTags": [
        "public",
        "page",
        "readme",
        "guide",
        "instructions",
        "clarity",
        "usable"
      ],
      "avoidTags": [
        "machine-only",
        "internal-data-only"
      ],
      "companions": [
        "github-readme-framing-authoring-protocol-v2",
        "public-page-publication-protocol-v2",
        "html-page-and-tool-briefing-protocol-v2"
      ],
      "order": 13,
      "contextRequired": false,
      "contextTags": [
        "text",
        "reader-facing",
        "wrong-voice",
        "tone",
        "readable",
        "writing",
        "reader"
      ],
      "intentTags": [
        "readable",
        "reader",
        "writing",
        "tone",
        "reader-facing"
      ]
    },
    {
      "id": "structural-shaping-protocol-v1",
      "title": "Structural Shaping Protocol",
      "path": "protocols/structural-shaping-protocol-v1.md",
      "url": "https://github.com/XxYouDeaDPunKxX/ai-protocol-kit/blob/main/protocols/structural-shaping-protocol-v1.md",
      "rawUrl": "https://raw.githubusercontent.com/XxYouDeaDPunKxX/ai-protocol-kit/main/protocols/structural-shaping-protocol-v1.md",
      "group": "Shaping",
      "category": "Operational structure",
      "shortDescription": "Shape ambiguous input into operational form before synthesis.",
      "useWhen": "Use when material is ambiguous and needs clearer boundaries, evidence, uncertainty, and final direction before producing output.",
      "bestFor": [
        "ambiguous input",
        "mixed source material",
        "synthesis prep",
        "unclear artifact direction",
        "deciding what belongs and what does not"
      ],
      "notFor": [
        "direct copy edits",
        "simple summaries",
        "already well-structured tasks"
      ],
      "needs": [
        "input material",
        "intended artifact",
        "what counts as source material",
        "what is uncertain",
        "known constraints"
      ],
      "outputMode": "Operational structure and synthesis frame.",
      "searchKeywords": [
        "structure",
        "ambiguous input",
        "source boundaries",
        "synthesis",
        "gates",
        "evidence",
        "artifact",
        "organize material"
      ],
      "primaryTags": [
        "structure",
        "ambiguous",
        "shaping",
        "evidence",
        "boundaries",
        "artifact",
        "source-boundary"
      ],
      "secondaryTags": [
        "unclear",
        "messy",
        "synthesis",
        "framing",
        "inspectable",
        "usable",
        "idea",
        "early-stage",
        "clarify",
        "no-start",
        "decision",
        "next-move",
        "fragile"
      ],
      "avoidTags": [
        "simple-copy",
        "no-ambiguity"
      ],
      "companions": [
        "idea-shaping-protocol-v1",
        "pre-task-expansion-protocol-v1",
        "system-reading-protocol-v0-2"
      ],
      "order": 14,
      "contextRequired": false,
      "contextTags": [
        "ambiguous",
        "messy",
        "structure",
        "source-boundary",
        "synthesis",
        "fragile",
        "evidence"
      ],
      "intentTags": [
        "structure",
        "clarify",
        "artifact",
        "usable",
        "inspectable"
      ]
    },
    {
      "id": "system-reading-protocol-v0-2",
      "title": "System Reading Protocol",
      "path": "protocols/system-reading-protocol-v0-2.md",
      "url": "https://github.com/XxYouDeaDPunKxX/ai-protocol-kit/blob/main/protocols/system-reading-protocol-v0-2.md",
      "rawUrl": "https://raw.githubusercontent.com/XxYouDeaDPunKxX/ai-protocol-kit/main/protocols/system-reading-protocol-v0-2.md",
      "group": "System Reading",
      "category": "System interpretation",
      "shortDescription": "Understand the gap between what a system claims to do and what it actually does before proposing fixes.",
      "useWhen": "Use when a system, workflow, project, or behavior needs to be understood before anyone jumps into solutions.",
      "bestFor": [
        "system behavior",
        "mismatch between stated and actual function",
        "diagnosis before fixing",
        "understanding what is really driving the behavior"
      ],
      "notFor": [
        "immediate implementation",
        "quick copywriting",
        "tasks where the cause is already known"
      ],
      "needs": [
        "declared intent",
        "observed behavior",
        "examples",
        "context",
        "what must not be assumed"
      ],
      "outputMode": "System reading and behavior explanation.",
      "searchKeywords": [
        "system",
        "behavior",
        "diagnosis",
        "intent",
        "observable behavior",
        "principle",
        "mismatch",
        "reading",
        "analysis"
      ],
      "primaryTags": [
        "system",
        "behavior",
        "intent-gap",
        "observe",
        "understand",
        "diagnose",
        "really-happening"
      ],
      "secondaryTags": [
        "unclear",
        "trust-gap",
        "no-premature-solution",
        "analysis",
        "workflow"
      ],
      "avoidTags": [
        "direct-build",
        "final-copy-only"
      ],
      "companions": [
        "structural-shaping-protocol-v1",
        "idea-shaping-protocol-v1",
        "phi-lens-protocol-v4-a"
      ],
      "order": 15,
      "contextRequired": false,
      "contextTags": [
        "system",
        "behavior",
        "intent-gap",
        "really-happening",
        "diagnose",
        "workflow"
      ],
      "intentTags": [
        "really-happening",
        "system",
        "diagnose",
        "behavior"
      ]
    },
    {
      "id": "triad-ai-orchestration-protocol-v3",
      "title": "Triad AI Orchestration Protocol",
      "path": "protocols/triad-ai-orchestration-protocol-v3.md",
      "url": "https://github.com/XxYouDeaDPunKxX/ai-protocol-kit/blob/main/protocols/triad-ai-orchestration-protocol-v3.md",
      "rawUrl": "https://raw.githubusercontent.com/XxYouDeaDPunKxX/ai-protocol-kit/main/protocols/triad-ai-orchestration-protocol-v3.md",
      "group": "Orchestration",
      "category": "Multi-AI review loop",
      "shortDescription": "Run a review loop between an executing AI and a reviewing AI while you keep final control.",
      "useWhen": "Use when Codex, ChatGPT, repo snapshots, pushed diffs, files, or review findings need a controlled loop across tools.",
      "bestFor": [
        "multi-AI workflows",
        "Codex review",
        "repo diffs",
        "adversarial review",
        "snapshot-based review",
        "patch checks",
        "test evidence"
      ],
      "notFor": [
        "single-turn chat answers",
        "simple writing tasks",
        "cases where only one AI/tool is involved and no review loop exists"
      ],
      "needs": [
        "target repo or files",
        "current state",
        "proposed changes",
        "review findings or diff",
        "your decisions",
        "test evidence if available"
      ],
      "outputMode": "Controlled review loop with clear claims, patch state, and evidence.",
      "searchKeywords": [
        "triad",
        "multi AI",
        "Codex",
        "ChatGPT",
        "review loop",
        "diff",
        "repo",
        "snapshot",
        "patch",
        "test evidence",
        "orchestration"
      ],
      "primaryTags": [
        "workflow",
        "multi-ai",
        "review-loop",
        "repo-state",
        "diffs",
        "controlled-loop",
        "session"
      ],
      "secondaryTags": [
        "github",
        "evidence",
        "testing",
        "patch",
        "adversarial-review",
        "review",
        "repository",
        "idea",
        "drift",
        "continuity",
        "coordination",
        "process",
        "many-moving-parts",
        "context",
        "session",
        "controlled-loop",
        "workflow"
      ],
      "avoidTags": [
        "single-message-task",
        "no-files",
        "no-loop"
      ],
      "companions": [
        "field-findings-and-bugs-protocol-v2",
        "github-repository-publication-preparation-protocol-v2",
        "structural-shaping-protocol-v1"
      ],
      "order": 16,
      "contextRequired": true,
      "contextTags": [
        "session",
        "workflow",
        "controlled-loop",
        "drift",
        "continuity",
        "coordination",
        "repo-state",
        "repository",
        "review",
        "diffs",
        "multi-ai"
      ],
      "intentTags": [
        "controlled-loop",
        "workflow",
        "boundaries",
        "session",
        "review",
        "evidence"
      ]
    }
  ],
  "scoring": {
    "tieMargin": 1.6,
    "choicePrimary": 2.0,
    "choiceSecondary": 0.75,
    "choiceAvoid": -3.5,
    "stepWeights": {
      "deal": 0.75,
      "off": 1,
      "want": 1.45
    },
    "intentBonus": 1.2,
    "contextBonus": 1.1,
    "missingContextPenalty": -1.25,
    "contextSoftCap": 0.55,
    "dealContextBonus": 1.6
  },
  "uiCopy": {
    "emptyResult": "Start with one signal in the first row. Add friction only if it changes the path.",
    "noMatch": "This kit may not cover the whole job. Use the closest protocol only for the part it actually covers."
  }
};
