HTML AND WEBSITE DISCOVERY SET PROTOCOL
Version: v1.2
Type: LLM operational protocol
Scope: machine-readable discovery layer for static HTML pages, websites, GitHub Pages, and other static publication surfaces

---

CORE PRINCIPLE

Discovery Set is infrastructure.

It helps crawlers, bots, LLM readers, and external systems understand the published artifact.

It must not compete with the human page.

---

PUBLICATION MODEL

This protocol applies to static HTML pages and websites in general.

Use GitHub Pages only as a special deployment case, not as the default model.

The default model is:

- a static HTML artifact;
- one absolute publication root;
- one machine-readable discovery root;
- one or more canonical HTML URLs;
- discovery files that help machines understand the artifact without competing with the human page.

---

PUBLICATION VARIABLES

Before generating discovery files, close these variables.

SITE_ROOT:
absolute URL where the published artifact begins.

DOMAIN_ROOT:
absolute URL of the bare host or domain.

PROJECT_ROOT:
optional subpath root below DOMAIN_ROOT. When present, SITE_ROOT usually equals PROJECT_ROOT.

CURRENT_PAGE_URL:
absolute canonical URL of the current HTML page.

DISCOVERY_ROOT:
root where llms.txt, raw-manifest.json, sitemap.xml, and any project-level discovery companion files live.

Default:
DISCOVERY_ROOT = SITE_ROOT

LLMS_URL:
resolved URL to llms.txt.
Default: URL_JOIN(DISCOVERY_ROOT, "llms.txt")

RAW_MANIFEST_URL:
resolved URL to raw-manifest.json.
Default: URL_JOIN(DISCOVERY_ROOT, "raw-manifest.json")

SITEMAP_URL:
resolved URL to sitemap.xml.
Default: URL_JOIN(DISCOVERY_ROOT, "sitemap.xml")

ROBOTS_URL:
resolved URL to robots.txt when robots.txt is applicable.
Default authoritative robots: URL_JOIN(DOMAIN_ROOT, "robots.txt")
Default project companion robots: URL_JOIN(DISCOVERY_ROOT, "robots.txt")

Examples:

Domain-root site:
SITE_ROOT = https://example.com/
DISCOVERY_ROOT = https://example.com/

Subpath site:
SITE_ROOT = https://example.com/project/
DISCOVERY_ROOT = https://example.com/project/

GitHub Pages project site:
SITE_ROOT = https://USER.github.io/REPO/
DISCOVERY_ROOT = https://USER.github.io/REPO/

URL JOIN RULE

SITE_ROOT and DISCOVERY_ROOT may be written with or without a trailing slash.

When constructing URLs, join path segments with exactly one slash.

Correct:
- https://example.com/llms.txt
- https://example.com/project/llms.txt
- https://USER.github.io/REPO/llms.txt

Wrong:
- https://example.com//llms.txt
- https://example.comproject/llms.txt
- https://USER.github.io/REPO//llms.txt

LLMS_URL = URL_JOIN(DISCOVERY_ROOT, "llms.txt")
RAW_MANIFEST_URL = URL_JOIN(DISCOVERY_ROOT, "raw-manifest.json")
SITEMAP_URL = URL_JOIN(DISCOVERY_ROOT, "sitemap.xml")

Do not construct discovery URLs through raw string concatenation.

Never assume a root-relative discovery path until SITE_ROOT and DOMAIN_ROOT are closed.

Prefer absolute URLs when in doubt.

---

GITHUB PAGES PROJECT-SITE RULE

GitHub Pages project sites are a special risk case.

For GitHub Pages project sites, SITE_ROOT is usually:

https://USER.github.io/REPO/

Root-relative paths such as:

/llms.txt
/raw-manifest.json
/sitemap.xml

usually point to:

https://USER.github.io/

not to:

https://USER.github.io/REPO/

For GitHub Pages project sites, use absolute URLs or correct relative paths that preserve /REPO/.

---

GITHUB PAGES GATE

If the deployment target is GitHub Pages, determine before generating any URL:

- USER or organization name
- repository name
- whether the site is a user/org site or project site
- whether a custom domain is active
- exact SITE_ROOT
- exact DOMAIN_ROOT
- exact DISCOVERY_ROOT

If any of these values are missing, do not guess paths.
Ask for the missing deployment root or produce placeholders only.

GITHUB PAGES DEPLOYMENT TYPES

USER / ORG SITE:
https://USER.github.io/

SITE_ROOT usually equals DOMAIN_ROOT.
Root-relative discovery paths may be valid.

PROJECT SITE:
https://USER.github.io/REPO/

SITE_ROOT does not equal DOMAIN_ROOT.
Root-relative discovery paths are usually wrong.

CUSTOM DOMAIN:
https://example.com/

Rules depend on the configured publication root.
Do not assume GitHub Pages path behavior when a custom domain is active.

For GitHub Pages project sites, never use:

/llms.txt
/raw-manifest.json
/sitemap.xml

unless DOMAIN_ROOT and SITE_ROOT are confirmed to be the same.

Use one of these instead:

llms.txt
raw-manifest.json
sitemap.xml

or absolute URLs under SITE_ROOT.

---

ROBOTS AUTHORITY RULE

robots.txt has a crawler-standard location:

DOMAIN_ROOT/robots.txt

If the deployment controls DOMAIN_ROOT, place authoritative robots.txt there.

If the artifact is published under a subpath and does not control DOMAIN_ROOT, a project-level robots.txt at DISCOVERY_ROOT may be included as a discovery companion, but it must not be treated as authoritative crawler control.

sitemap.xml may still be cited from an authoritative domain-root robots.txt when domain-root control exists.

---

BINARY CLASSIFIER

Q: does this published artifact expose more than one canonical HTML URL under the same SITE_ROOT?

YES → TYPE: SITE
NO  → TYPE: PAGE

Notes:
- anchor links do not make a SITE
- repository links outside SITE_ROOT do not make a SITE
- links to llms.txt, raw-manifest.json, sitemap.xml, assets, or external pages do not make a SITE
- only multiple canonical HTML pages under the same SITE_ROOT make a SITE

---

TYPE: PAGE

Definition:
single canonical HTML URL, usually one index.html.

HEAD

Required:
- `<title>`
- `<meta name="description">`
- `<meta name="robots" content="index, follow">`
- `<link rel="canonical" href="[CURRENT_PAGE_URL]">`
- `<link rel="alternate" type="text/plain" href="[LLMS_URL]" title="LLM-readable index">`
- `<link rel="alternate" type="application/json" href="[RAW_MANIFEST_URL]" title="Machine-readable manifest">`
- Open Graph:
  - og:title
  - og:description
  - og:type="website"
  - og:url = [CURRENT_PAGE_URL]
  - og:image = absolute image URL
- JSON-LD:
  - SoftwareSourceCode if the page represents a repo, protocol, tool, kernel, framework, or code artifact
  - WebPage if the page is editorial/static only
- favicon

DISCOVERY ROOT

Required files:
- llms.txt
- raw-manifest.json
- sitemap.xml

robots.txt:
- required only when DOMAIN_ROOT is controlled
- optional project-level discovery companion when DOMAIN_ROOT is not controlled

sitemap.xml:
- single `<url>` entry for CURRENT_PAGE_URL

FOOTER

Low-noise machine links:

- llms.txt
- raw-manifest.json
- sitemap.xml

Example for a page published at DISCOVERY_ROOT:

```html
<!-- Discovery Set: low-noise links for crawlers, bots, and LLM readers. -->
<div class="machine-links" aria-label="Machine-readable project files">
  <span>Machine-readable:</span>
  <a href="llms.txt">llms.txt</a>
  <a href="raw-manifest.json">manifest</a>
  <a href="sitemap.xml">sitemap</a>
</div>
```

If CURRENT_PAGE_URL is not at DISCOVERY_ROOT, use correct relative paths or absolute URLs.

---

TYPE: SITE

Definition:
multiple canonical HTML URLs under the same SITE_ROOT.

Example:
- https://example.com/
- https://example.com/docs/
- https://example.com/reference/

Subpath example:
- https://example.com/project/
- https://example.com/project/docs/
- https://example.com/project/reference/

HEAD — EVERY PAGE

Required:
- `<title>` page-specific
- `<meta name="description">` page-specific
- `<meta name="robots" content="index, follow">`
- `<link rel="canonical" href="[CURRENT_PAGE_URL]">`
- `<link rel="alternate" type="text/plain" href="[LLMS_URL]">`
- `<link rel="alternate" type="application/json" href="[RAW_MANIFEST_URL]">`
- Open Graph:
  - og:title page-specific
  - og:description page-specific
  - og:type="website"
  - og:url = [CURRENT_PAGE_URL]
  - og:image = absolute image URL
- favicon

JSON-LD:
- index page:
  - WebSite
  - optionally SoftwareSourceCode as mainEntity if the site represents a repo/tool/protocol
- subpages:
  - WebPage
  - optionally reference the parent WebSite

DISCOVERY ROOT

Required files:
- llms.txt
- raw-manifest.json
- sitemap.xml

robots.txt:
- required only when DOMAIN_ROOT is controlled
- optional project-level discovery companion when DOMAIN_ROOT is not controlled

sitemap.xml:
- one `<url>` entry per canonical HTML page

FOOTER — EVERY PAGE

Low-noise machine links.

For index page at DISCOVERY_ROOT, relative is acceptable:

```html
<a href="llms.txt">llms.txt</a>
<a href="raw-manifest.json">manifest</a>
<a href="sitemap.xml">sitemap</a>
```

For subpages, use either correct relative paths:

```html
<a href="../llms.txt">llms.txt</a>
```

or safer absolute paths:

```html
<a href="https://example.com/llms.txt">llms.txt</a>
<a href="https://example.com/raw-manifest.json">manifest</a>
<a href="https://example.com/sitemap.xml">sitemap</a>
```

For subpath deployments, absolute paths must include the subpath:

```html
<a href="https://example.com/project/llms.txt">llms.txt</a>
<a href="https://example.com/project/raw-manifest.json">manifest</a>
<a href="https://example.com/project/sitemap.xml">sitemap</a>
```

---

PATH RULES

canonical:
- always absolute URL
- equals CURRENT_PAGE_URL

og:url:
- always absolute URL
- equals CURRENT_PAGE_URL

og:image:
- always absolute URL

robots sitemap:
- must be absolute URL when used
- should point to the canonical sitemap.xml URL

llms.txt / raw-manifest.json in HEAD:
- PAGE at DISCOVERY_ROOT: relative allowed
- SITE index at DISCOVERY_ROOT: relative allowed
- subpages: absolute preferred
- subpath deployments: absolute preferred

Root-relative paths such as:

/llms.txt
/raw-manifest.json
/sitemap.xml

are allowed only when DISCOVERY_ROOT is the same as DOMAIN_ROOT.

If DISCOVERY_ROOT is below DOMAIN_ROOT, root-relative paths are wrong unless explicitly intended.

---

JSON-LD RULES

Use SoftwareSourceCode when the page represents:
- repo
- protocol
- framework
- kernel
- compiler
- developer tool
- operational system
- technical artifact

Use WebPage when the page represents:
- article
- documentation page
- static editorial page
- human-facing explainer without repo/tool identity

Use WebSite when:
- multiple canonical pages exist under the same SITE_ROOT

Do not spam:
- keywords must reflect the repo, page, site, or artifact
- about must reflect the repo, page, site, or artifact
- do not inject generic SEO terms
- do not list concepts that are not actually present

Recommended SoftwareSourceCode fields:
- @context
- @type
- name
- alternateName if useful
- description
- url
- mainEntityOfPage
- codeRepository
- license
- programmingLanguage
- runtimePlatform
- applicationCategory
- isAccessibleForFree
- author
- about
- keywords

---

ROBOTS.TXT MINIMUM — AUTHORITATIVE DOMAIN ROOT

Use only when DOMAIN_ROOT is controlled.

```txt
User-agent: *
Allow: /

Sitemap: [SITEMAP_URL]
```

---

ROBOTS.TXT MINIMUM — PROJECT-LEVEL COMPANION

Use only when DOMAIN_ROOT is not controlled and the artifact still needs a local discovery companion.

```txt
User-agent: *
Allow: /

Sitemap: [SITEMAP_URL]
```

This file is a project-level discovery companion, not authoritative crawler control unless served from DOMAIN_ROOT/robots.txt.

---

SITEMAP.XML — PAGE MINIMUM

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>[CURRENT_PAGE_URL]</loc>
  </url>
</urlset>
```

---

SITEMAP.XML — SITE MINIMUM

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
  </url>
  <url>
    <loc>https://example.com/docs/</loc>
  </url>
  <url>
    <loc>https://example.com/reference/</loc>
  </url>
</urlset>
```

For subpath deployments, every `<loc>` must preserve the subpath.

---

DISCOVERY FILE LOCATION RULES

llms.txt:
- DISCOVERY_ROOT only
- readable project or site index for LLM/crawler use
- not stored in assets/

raw-manifest.json:
- DISCOVERY_ROOT only
- structured machine-readable project or site manifest
- not stored in assets/

sitemap.xml:
- DISCOVERY_ROOT only
- lists canonical HTML URLs

robots.txt:
- DOMAIN_ROOT only when authoritative crawler control is required and domain-root control exists
- DISCOVERY_ROOT only as a project-level discovery companion when domain-root control does not exist

---

FOOTER RULES

Footer links must be:
- visible
- low-noise
- small
- non-dominant
- machine-oriented
- not part of the main editorial hierarchy

Correct:
small raw-bus / machine-readable row in footer.

Wrong:
large visible manifest block inside the main page.

---

VALIDATION CHECKLIST

This checklist is non-normative.

It introduces no new rule.

If this checklist conflicts with a specific section above, the specific section wins.

Before publishing, verify:

- SITE_ROOT is closed
- DISCOVERY_ROOT is closed
- GitHub Pages deployment type is classified before URL generation when GitHub Pages is the target
- GitHub Pages project site does not use root-relative discovery paths
- custom domain state is confirmed before applying GitHub Pages path assumptions
- SITE_ROOT includes /REPO/ for GitHub Pages project sites without custom domain
- CURRENT_PAGE_URL is closed for every canonical HTML page
- canonical is absolute
- og:url is absolute
- og:image is absolute
- robots.txt cites sitemap.xml with absolute URL when robots.txt is used
- llms.txt is in DISCOVERY_ROOT
- raw-manifest.json is in DISCOVERY_ROOT
- sitemap.xml is in DISCOVERY_ROOT
- sitemap.xml lists canonical HTML URLs only
- footer machine links are visible but low-noise
- Discovery Set does not appear as main page content
- manifest data is not duplicated as a large visible UI block
- no root-relative discovery path is used unless DISCOVERY_ROOT equals DOMAIN_ROOT
- subpath publication roots are preserved in absolute URLs
- anchors, repository links, asset links, and machine-file links did not trigger SITE classification
- project-level robots.txt is not mistaken for authoritative crawler control when DOMAIN_ROOT is not controlled

---

MINIMUM PAGE TEMPLATE

VARIABLES:
- SITE_ROOT
- DOMAIN_ROOT
- CURRENT_PAGE_URL
- DISCOVERY_ROOT
- LLMS_URL
- RAW_MANIFEST_URL
- SITEMAP_URL
- ROBOTS_URL if applicable

HEAD:
- title
- description
- robots
- canonical
- alternate llms.txt
- alternate raw-manifest.json
- OG tags
- JSON-LD
- favicon

DISCOVERY ROOT:
- llms.txt
- raw-manifest.json
- sitemap.xml
- robots.txt only as project-level companion when DOMAIN_ROOT is not controlled

DOMAIN ROOT:
- robots.txt when authoritative crawler control is required and DOMAIN_ROOT is controlled

FOOTER:
- machine-readable links

---

MINIMUM SITE TEMPLATE

VARIABLES:
- SITE_ROOT
- DOMAIN_ROOT
- DISCOVERY_ROOT
- CURRENT_PAGE_URL for every canonical page
- LLMS_URL
- RAW_MANIFEST_URL
- SITEMAP_URL
- ROBOTS_URL if applicable

EVERY PAGE HEAD:
- page-specific title
- page-specific description
- robots
- absolute canonical for current page
- LLMS_URL
- RAW_MANIFEST_URL
- page-specific OG
- JSON-LD
- favicon

DISCOVERY ROOT:
- llms.txt
- raw-manifest.json
- sitemap.xml with all canonical HTML pages
- robots.txt only as project-level companion when DOMAIN_ROOT is not controlled

DOMAIN ROOT:
- robots.txt when authoritative crawler control is required and DOMAIN_ROOT is controlled

EVERY PAGE FOOTER:
- low-noise machine-readable links
