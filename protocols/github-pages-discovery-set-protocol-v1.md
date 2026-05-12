GITHUB PAGES DISCOVERY SET PROTOCOL
Version: v1
Type: LLM operational protocol
Series: GitHub operational protocols
Scope: machine-readable discovery layer for GitHub Pages user/org sites, project sites, and GitHub Pages sites using a custom domain

---

PRIORITY

This protocol applies only to artifacts published through GitHub Pages.

Do not apply this protocol to generic static hosting, non-GitHub web hosting, SaaS apps, backend apps, CMS sites, or deployment targets that are not GitHub Pages.

A custom domain is in scope only when it is configured for GitHub Pages.

If the deployment target is not GitHub Pages, stop and use a general website discovery protocol instead.

---

CORE PRINCIPLE

Discovery Set is infrastructure.

It helps crawlers, bots, LLM readers, and external systems understand the published GitHub Pages artifact.

It must not compete with the human page.

GitHub Pages path rules are part of the artifact.

Never generate discovery URLs before the GitHub Pages publication root is closed.

---

GITHUB PAGES GATE

Before generating discovery files, classify the GitHub Pages deployment.

Required values:

- OWNER: GitHub user or organization name
- REPO: repository name
- PAGES_TYPE: USER_OR_ORG_SITE, PROJECT_SITE, or CUSTOM_DOMAIN_SITE
- SOURCE_BRANCH: branch used by GitHub Pages when known
- SOURCE_PATH: root or /docs when known
- CUSTOM_DOMAIN: active custom domain or NONE
- DOMAIN_ROOT
- SITE_ROOT
- DISCOVERY_ROOT
- CURRENT_PAGE_URL for each canonical HTML page

If OWNER, REPO, PAGES_TYPE, CUSTOM_DOMAIN state, SITE_ROOT, or DISCOVERY_ROOT is missing, do not guess paths.

Ask for the missing deployment root or produce placeholders only.

---

GITHUB PAGES DEPLOYMENT TYPES

USER_OR_ORG_SITE

Repository pattern:

OWNER.github.io

Default SITE_ROOT:

https://OWNER.github.io/

DOMAIN_ROOT usually equals SITE_ROOT.

Root-relative discovery paths may be valid only when DOMAIN_ROOT and SITE_ROOT are the same.

PROJECT_SITE

Repository pattern:

any repository published under the owner GitHub Pages domain.

Default SITE_ROOT:

https://OWNER.github.io/REPO/

DOMAIN_ROOT:

https://OWNER.github.io/

PROJECT_SITE is the highest-risk case for broken discovery paths.

Root-relative paths usually point to DOMAIN_ROOT, not SITE_ROOT.

CUSTOM_DOMAIN_SITE

A custom domain configured for GitHub Pages.

SITE_ROOT depends on the configured custom domain and path.

Do not assume OWNER.github.io path behavior when a custom domain is active.

Do not assume the custom domain is domain-root unless confirmed.

---

PUBLICATION VARIABLES

SITE_ROOT:
absolute URL where the GitHub Pages artifact begins.

DOMAIN_ROOT:
absolute URL of the bare Pages host or custom domain.

PROJECT_ROOT:
optional project subpath below DOMAIN_ROOT. For project sites without custom domain, usually /REPO/.

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

USER_OR_ORG_SITE:
OWNER = example-user
REPO = example-user.github.io
SITE_ROOT = https://example-user.github.io/
DISCOVERY_ROOT = https://example-user.github.io/

PROJECT_SITE:
OWNER = example-user
REPO = example-project
SITE_ROOT = https://example-user.github.io/example-project/
DISCOVERY_ROOT = https://example-user.github.io/example-project/

CUSTOM_DOMAIN_SITE:
CUSTOM_DOMAIN = example.com
SITE_ROOT = https://example.com/
DISCOVERY_ROOT = https://example.com/

---

URL JOIN RULE

SITE_ROOT and DISCOVERY_ROOT may be written with or without a trailing slash.

When constructing URLs, join path segments with exactly one slash.

Correct:

- https://OWNER.github.io/REPO/llms.txt
- https://OWNER.github.io/REPO/raw-manifest.json
- https://OWNER.github.io/REPO/sitemap.xml
- https://example.com/llms.txt

Wrong:

- https://OWNER.github.io/REPO//llms.txt
- https://OWNER.github.io/REPOllms.txt
- https://OWNER.github.io/llms.txt for a project site

LLMS_URL = URL_JOIN(DISCOVERY_ROOT, "llms.txt")
RAW_MANIFEST_URL = URL_JOIN(DISCOVERY_ROOT, "raw-manifest.json")
SITEMAP_URL = URL_JOIN(DISCOVERY_ROOT, "sitemap.xml")

Do not construct discovery URLs through raw string concatenation.

Never assume a root-relative discovery path until PAGES_TYPE, SITE_ROOT, DOMAIN_ROOT, and DISCOVERY_ROOT are closed.

Prefer absolute URLs when in doubt.

---

PROJECT-SITE PATH RULE

For GitHub Pages project sites, SITE_ROOT is usually:

https://OWNER.github.io/REPO/

Root-relative paths such as:

/llms.txt
/raw-manifest.json
/sitemap.xml

usually point to:

https://OWNER.github.io/

not to:

https://OWNER.github.io/REPO/

For PROJECT_SITE, never use:

/llms.txt
/raw-manifest.json
/sitemap.xml

unless DOMAIN_ROOT and SITE_ROOT are confirmed to be the same.

Use one of these instead:

- llms.txt from the index page at DISCOVERY_ROOT
- raw-manifest.json from the index page at DISCOVERY_ROOT
- sitemap.xml from the index page at DISCOVERY_ROOT
- absolute URLs under SITE_ROOT
- correct relative paths from subpages

---

ROBOTS AUTHORITY RULE

robots.txt has a crawler-standard location:

DOMAIN_ROOT/robots.txt

If the GitHub Pages deployment controls DOMAIN_ROOT, place authoritative robots.txt there.

If the GitHub Pages artifact is a PROJECT_SITE under OWNER.github.io/REPO/ and does not control DOMAIN_ROOT, a robots.txt at DISCOVERY_ROOT may be included as a project-level discovery companion, but it must not be treated as authoritative crawler control.

sitemap.xml may still be cited from an authoritative domain-root robots.txt when domain-root control exists.

If a project-level companion robots.txt is used, it must cite SITEMAP_URL with an absolute URL.

---

BINARY CLASSIFIER

Q: does this GitHub Pages artifact expose more than one canonical HTML URL under the same SITE_ROOT?

YES → TYPE: SITE
NO  → TYPE: PAGE

Notes:

- anchor links do not make a SITE
- GitHub repository links do not make a SITE
- links to llms.txt, raw-manifest.json, sitemap.xml, assets, or external pages do not make a SITE
- only multiple canonical HTML pages under the same SITE_ROOT make a SITE

---

TYPE: PAGE

Definition:
single canonical HTML URL, usually one index.html at SITE_ROOT.

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
  - SoftwareSourceCode if the page represents a repo, protocol, tool, kernel, framework, developer tool, operational system, or technical artifact
  - WebPage if the page is editorial/static only
  - ProfilePage if the page represents a person/profile surface
- favicon

DISCOVERY ROOT

Required files:

- index.html
- llms.txt
- raw-manifest.json
- sitemap.xml

robots.txt:

- authoritative only when DOMAIN_ROOT is controlled
- optional project-level discovery companion when DOMAIN_ROOT is not controlled

sitemap.xml:

- single `<url>` entry for CURRENT_PAGE_URL
- do not list llms.txt
- do not list raw-manifest.json
- do not list robots.txt
- do not list sitemap.xml

FOOTER

Low-noise machine links:

- llms.txt
- raw-manifest.json
- sitemap.xml

Example for index page at DISCOVERY_ROOT:

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

Project-site example:

- https://OWNER.github.io/REPO/
- https://OWNER.github.io/REPO/docs/
- https://OWNER.github.io/REPO/reference/

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

- index.html
- llms.txt
- raw-manifest.json
- sitemap.xml

robots.txt:

- authoritative only when DOMAIN_ROOT is controlled
- optional project-level discovery companion when DOMAIN_ROOT is not controlled

sitemap.xml:

- one `<url>` entry per canonical HTML page
- do not list llms.txt
- do not list raw-manifest.json
- do not list robots.txt
- do not list sitemap.xml

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

or safer absolute paths under SITE_ROOT:

```html
<a href="https://OWNER.github.io/REPO/llms.txt">llms.txt</a>
<a href="https://OWNER.github.io/REPO/raw-manifest.json">manifest</a>
<a href="https://OWNER.github.io/REPO/sitemap.xml">sitemap</a>
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
- should point to SITEMAP_URL

llms.txt / raw-manifest.json in HEAD:

- PAGE index at DISCOVERY_ROOT: relative allowed
- SITE index at DISCOVERY_ROOT: relative allowed
- subpages: absolute preferred
- PROJECT_SITE: absolute preferred when there is any risk of path confusion

Root-relative paths such as:

/llms.txt
/raw-manifest.json
/sitemap.xml

are allowed only when DISCOVERY_ROOT is the same as DOMAIN_ROOT.

If DISCOVERY_ROOT is below DOMAIN_ROOT, root-relative paths are wrong unless explicitly intended and verified.

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

Use ProfilePage when the page represents:

- GitHub profile page
- personal project index
- public profile surface

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

Use only when DOMAIN_ROOT is not controlled and the GitHub Pages artifact still needs a local discovery companion.

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
    <loc>https://OWNER.github.io/REPO/</loc>
  </url>
  <url>
    <loc>https://OWNER.github.io/REPO/docs/</loc>
  </url>
  <url>
    <loc>https://OWNER.github.io/REPO/reference/</loc>
  </url>
</urlset>
```

For custom domains, every `<loc>` must use the confirmed custom-domain SITE_ROOT.

---

DISCOVERY FILE LOCATION RULES

index.html:

- SITE_ROOT root for PAGE
- SITE_ROOT root plus subpages for SITE

llms.txt:

- DISCOVERY_ROOT only
- readable GitHub Pages project or site index for LLM/crawler use
- not stored in assets/

raw-manifest.json:

- DISCOVERY_ROOT only
- structured machine-readable GitHub Pages project or site manifest
- not stored in assets/

sitemap.xml:

- DISCOVERY_ROOT only
- lists canonical HTML URLs only

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

- deployment is confirmed as GitHub Pages
- OWNER is closed
- REPO is closed
- PAGES_TYPE is closed
- custom domain state is closed
- SITE_ROOT is closed
- DOMAIN_ROOT is closed
- DISCOVERY_ROOT is closed
- CURRENT_PAGE_URL is closed for every canonical HTML page
- USER_OR_ORG_SITE, PROJECT_SITE, or CUSTOM_DOMAIN_SITE classification is explicit
- PROJECT_SITE does not use root-relative discovery paths
- SITE_ROOT includes /REPO/ for project sites without custom domain
- custom domain paths use the confirmed custom-domain SITE_ROOT
- canonical is absolute
- canonical equals CURRENT_PAGE_URL
- og:url is absolute
- og:url equals CURRENT_PAGE_URL
- og:image is absolute
- robots.txt cites SITEMAP_URL with absolute URL when robots.txt is used
- llms.txt is in DISCOVERY_ROOT
- raw-manifest.json is in DISCOVERY_ROOT
- sitemap.xml is in DISCOVERY_ROOT
- sitemap.xml lists canonical HTML URLs only
- sitemap.xml does not list llms.txt
- sitemap.xml does not list raw-manifest.json
- footer machine links are visible but low-noise
- Discovery Set does not appear as main page content
- manifest data is not duplicated as a large visible UI block
- no root-relative discovery path is used unless DISCOVERY_ROOT equals DOMAIN_ROOT
- anchors, GitHub repository links, asset links, and machine-file links did not trigger SITE classification
- project-level robots.txt is not mistaken for authoritative crawler control when DOMAIN_ROOT is not controlled

---

MINIMUM PAGE TEMPLATE

VARIABLES:

- OWNER
- REPO
- PAGES_TYPE
- SOURCE_BRANCH if known
- SOURCE_PATH if known
- CUSTOM_DOMAIN or NONE
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

- index.html
- llms.txt
- raw-manifest.json
- sitemap.xml
- robots.txt only as project-level companion when authoritative placement is not available

DOMAIN ROOT:

- robots.txt when authoritative crawler control is required and DOMAIN_ROOT is controlled

FOOTER:

- machine-readable links

---

MINIMUM SITE TEMPLATE

VARIABLES:

- OWNER
- REPO
- PAGES_TYPE
- SOURCE_BRANCH if known
- SOURCE_PATH if known
- CUSTOM_DOMAIN or NONE
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

- index.html
- llms.txt
- raw-manifest.json
- sitemap.xml with all canonical HTML pages
- robots.txt only as project-level companion when authoritative placement is not available

DOMAIN ROOT:

- robots.txt when authoritative crawler control is required and DOMAIN_ROOT is controlled

EVERY PAGE FOOTER:

- low-noise machine-readable links
