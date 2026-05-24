# 🧰 AI Protocol Kit GitHub Page

Static GitHub Pages branch for the `ai-protocol-kit` public picker.

This branch is the active GitHub Pages source for the protocol discovery page.

The page is a static tool for choosing which AI behavior contract or operational protocol to use in a real task.

It is not the source of the protocols. The protocol files live on `main`.

This branch exposes them through a human-facing picker, a protocol index, copy actions, and public discovery files.

Public page:

```text
https://xxyoudeadpunkxx.github.io/ai-protocol-kit/
```

## 🔀 Branches

```text
main        protocol source files, repository README, license
gh-pages    active GitHub Pages source, static picker page
```

## 📌 What It Contains

The page includes:

* a static GitHub Pages interface;
* a “What should I use now?” picker;
* a protocol path result area;
* selected-signal feedback;
* related protocol suggestions;
* copy actions for protocol text and use instructions;
* an all-protocols index;
* public files for discovery context.

The picker is not a separate product layer. It is a page surface built around the protocol files in `main`.

## 🧾 Why The Extra Files Exist

This branch keeps a few public files next to the page:

* `llms.txt`;
* `raw-manifest.json`;
* `robots.txt`;
* `sitemap.xml`.

They are there so the page is easier to inspect from outside the interface: by people, search crawlers, and tools that read plain or structured project context.

They do not replace the page and they do not replace the protocol files.

They keep the project visible in more than one form.

## ♻️ Reuse Notes

If you fork or reuse this branch:

* replace the repository owner and repository name;
* replace public page URLs;
* update protocol links in `picker-data.js`;
* update raw protocol URLs used by copy actions;
* update `llms.txt`;
* update `raw-manifest.json`;
* update `robots.txt`;
* update `sitemap.xml`;
* test every protocol link;
* test copy actions in a browser;
* test the picker on desktop and mobile;
* keep the license notice.

No build step is required.

## 🗂️ Files

```text
index.html          page shell, metadata, visible sections, discovery links
style.css           visual system, responsive layout, surfaces, controls
picker-data.js      protocol registry, picker choices, groups, matching data
app.js              rendering, picker behavior, filtering, copy actions
llms.txt            plain-text protocol index for external readers/tools
raw-manifest.json   structured project and protocol manifest
robots.txt          crawler rules and sitemap pointer
sitemap.xml         public page URL for discovery
favicon.svg         small inline site icon
```

## 🧬 Protocol Data

Edit `picker-data.js` when the public picker needs to know about protocol changes.

Each protocol entry feeds:

```text
picker matching
protocol result
related suggestions
all-protocols index
open protocol action
copy protocol action
copy instructions action
```

Expected protocol fields include:

```text
id
title
group
category
shortDescription
useWhen
notFor
needs
outputMode
url
rawUrl
primaryTags
secondaryTags
avoidTags
companions
order
searchKeywords
```

Adding a protocol should not require layout edits if the data shape stays aligned.

## 📡 Discovery Files

Keep `llms.txt` and `raw-manifest.json` aligned with `picker-data.js` when protocol names, descriptions, groups, URLs, or use cases change.

Keep `robots.txt` and `sitemap.xml` aligned with the deployed GitHub Pages URL.

The page is a project site, not a user-root site:

```text
https://xxyoudeadpunkxx.github.io/ai-protocol-kit/
```

## ➕ Adding A Protocol

When a new protocol is added on `main`, update the public page data on `gh-pages`.

Do not edit protocol content on `gh-pages`.

### 🔍 Files To Check

```text
main/protocols/*.md          source protocol files
gh-pages/picker-data.js      public picker registry
gh-pages/llms.txt            plain-text protocol index
gh-pages/raw-manifest.json   structured protocol manifest
```

### ✏️ Usually Update

```text
picker-data.js
llms.txt
raw-manifest.json
```

### 🚫 Usually Do Not Update

```text
index.html
style.css
app.js
robots.txt
sitemap.xml
favicon.svg
```

Only update `index.html`, `style.css`, or `app.js` if the page structure or behavior changes.

### 🧩 Required Protocol Data

Each new protocol entry in `picker-data.js` should include:

```text
id
title
group
category
shortDescription
useWhen
notFor
needs
outputMode
url
rawUrl
primaryTags
secondaryTags
avoidTags
companions
order
searchKeywords
```

### 🧭 Update Rule

Use the protocol file on `main` as the source.

Then update the public surfaces so they describe the same protocol:

```text
picker-data.js       used by the interactive page
llms.txt             readable external index
raw-manifest.json    structured external index
```

### ✅ Validation

Before publishing:

* open the page locally;
* check that the new protocol appears under `All`;
* search for the protocol by name and use case;
* test picker choices that should lead to it;
* test `Open`;
* test `Copy protocol`;
* test `Copy instructions`;
* check that `rawUrl` points to the raw file on `main`;
* check that `llms.txt` and `raw-manifest.json` include the same protocol.

## ⚙️ Runtime Structure

<details>
<summary>File and runtime map</summary>

### 🚚 Load Model

The page is served as static GitHub Pages content.

The browser loads `index.html`, `style.css`, `picker-data.js`, and `app.js` directly.

There is no backend, build step, package runtime, server-side rendering, or database.

### 🏗️ HTML Shell

`index.html` contains the fixed document shell.

It defines the metadata, JSON-LD block, header, introduction, picker surface, protocol result area, how-to section, all-protocols area, footer, and links to public discovery files.

Repeated protocol rows and picker controls are not written one by one in the HTML. They are rendered by `app.js` from `picker-data.js`.

The DOM order should match the real usage order:

```text
what this is
use now picker
how to use
all protocols
footer
```

### 🎛️ CSS Layer

`style.css` controls the visual system.

It defines page surfaces, responsive layout, spacing, picker rows, chips, result states, all-protocols rows, details states, copy buttons, focus states, and mobile behavior.

The CSS is presentation. It does not store protocol data or decide protocol matches.

The visual direction is a dark static tool surface: clear panels, readable controls, low-noise borders, and a practical picker-first layout.

### 🗃️ Protocol Registry

`picker-data.js` is the public page data source.

It contains:

* picker choices;
* protocol groups;
* protocol entries;
* matching tags;
* companion relationships;
* copy instruction text.

The protocol files themselves remain on `main`.

`gh-pages` points to them through GitHub file URLs and raw URLs.

### ⚡ Runtime Script

`app.js` connects the HTML shell with the protocol registry.

On load, it reads `picker-data.js`, renders the picker, renders the protocol index, and prepares the protocol result state.

When the user selects picker choices, the script scores matching protocols, updates the selected path, shows the recommended protocol, and lists related protocols.

It also handles:

* group filtering;
* protocol search;
* open protocol links;
* copy protocol text;
* copy use instructions;
* reset behavior;
* small copy-status feedback.

### 🧲 Picker Behavior

The picker starts from the task, not from the protocol list.

The user answers practical signals:

```text
what is in front of me?
what feels wrong?
what do I need to happen?
```

The page then returns a protocol path.

The page does not claim that the result is the only possible answer. It suggests a usable starting point and related protocols.

### 🗄️ All-Protocols Area

The all-protocols area is a fallback surface.

It is there for users who already know the protocol name, group, or use case.

It should not replace the picker as the primary way to use the page.

### ⧉ Copy Actions

The page has two practical copy actions.

`Copy protocol` fetches the raw protocol file from `main` and copies the full protocol text.

`Copy instructions` copies a short instruction for using that protocol in an AI session, together with the protocol title and URL.

The raw protocol URL must stay aligned with the file location on `main`.

### 📍 Source Of Truth

`main` is the source of truth for protocol files.

`gh-pages` is the public page surface.

Do not edit protocol content only on `gh-pages`.

If a protocol changes on `main`, update the public page data and discovery files when needed.

</details>

## 🤖 AI-assisted development

This project was developed with AI assistance.

The project, documentation, and repository materials were shaped through human-directed work supported by AI tools during drafting, structuring, review, and refinement.

AI assistance does not make the project automatically correct, complete, or suitable for every use case. Read it, test it, and adapt it to your own context.

## 📜 License

This project is licensed under `CC BY-SA 4.0` (`Creative Commons Attribution-ShareAlike 4.0 International`).

See [`LICENSE`](LICENSE).
