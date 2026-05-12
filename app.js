(() => {
  "use strict";

  const data = window.APK_PICKER_DATA;
  if (!data) return;

  const protocols = (data.protocols || []).slice().sort((a, b) => (a.order || 0) - (b.order || 0));

  let activeGroup = "All";
  let query = "";
  let recommended = new Set();

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));
  const escapeHtml = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);

  const stepsEl = $("#pickerSteps");
  const selectedRailEl = $("#selectedRail");
  const resultEl = $("#resultPanel");
  const relatedEl = $("#relatedList");
  const protocolGridEl = $("#protocolGrid");
  const groupFiltersEl = $("#groupFilters");
  const searchEl = $("#protocolSearch");
  const countEl = $("#resultCount");
  const resetEl = $("#resetAll");
  const toastEl = $("#toast");

  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.hidden = false;
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => {
      toastEl.hidden = true;
    }, 1600);
  }

  function copyText(text, message) {
    if (!navigator.clipboard) {
      showToast("Copy is not available here.");
      return;
    }

    navigator.clipboard.writeText(text)
      .then(() => showToast(message))
      .catch(() => showToast("Copy failed."));
  }

  function getProtocol(id) {
    return protocols.find((protocol) => protocol.id === id);
  }

  function getChoiceLabel(choice) {
    return Array.isArray(choice) ? choice[0] : choice.label || "";
  }

  function getChoiceTags(choice) {
    if (Array.isArray(choice)) {
      return String(choice[1] || "").split(/[|,]/).map((item) => item.trim()).filter(Boolean);
    }
    if (Array.isArray(choice.tags)) return choice.tags;
    return String(choice.tags || "").split(/[|,]/).map((item) => item.trim()).filter(Boolean);
  }

  function selectedChoices() {
    return $$('.choice-button[aria-pressed="true"]').map((button) => ({
      step: button.dataset.step,
      label: button.textContent.trim(),
      tags: String(button.dataset.tags || "").split("|").filter(Boolean)
    }));
  }

  function selectedByStep() {
    const map = { deal: [], off: [], want: [] };
    selectedChoices().forEach((choice) => {
      if (map[choice.step]) map[choice.step].push(choice.label);
    });
    return map;
  }

  function renderSteps() {
    if (!stepsEl) return;

    stepsEl.innerHTML = (data.steps || []).map((step, index) => `
      <section class="step-row">
        <div class="step-number">${index + 1}</div>
        <div class="step-title">
          <h3>${escapeHtml(step.title)}</h3>
        </div>
        <div class="choice-grid">
          ${(step.choices || []).map((choice) => `
            <button
              class="choice-button"
              type="button"
              aria-pressed="false"
              data-step="${escapeHtml(step.id)}"
              data-tags="${escapeHtml(getChoiceTags(choice).join("|"))}"
            >${escapeHtml(getChoiceLabel(choice))}</button>
          `).join("")}
        </div>
      </section>
    `).join("");
  }

  function renderGroups() {
    if (!groupFiltersEl) return;

    groupFiltersEl.innerHTML = (data.groups || ["All"]).map((group) => `
      <button
        class="group-chip"
        type="button"
        aria-pressed="${group === "All"}"
        data-group-filter="${escapeHtml(group)}"
      >${escapeHtml(group)}</button>
    `).join("");
  }

  function scoreProtocol(protocol, choices) {
    const scoring = data.scoring || {};
    const stepWeights = scoring.stepWeights || {};
    const allTags = new Set();

    choices.forEach((choice) => {
      choice.tags.forEach((tag) => allTags.add(tag));
    });

    let score = 0;

    choices.forEach((choice) => {
      const weight = stepWeights[choice.step] ?? 1;
      const primary = protocol.primaryTags || [];
      const secondary = protocol.secondaryTags || [];
      const avoid = protocol.avoidTags || [];
      const intent = protocol.intentTags || [];

      let partial = 0;
      if (choice.tags.some((tag) => avoid.includes(tag))) {
        partial = scoring.choiceAvoid ?? -3.5;
      } else if (choice.tags.some((tag) => primary.includes(tag))) {
        partial = scoring.choicePrimary ?? 2;
      } else if (choice.tags.some((tag) => secondary.includes(tag))) {
        partial = scoring.choiceSecondary ?? 0.75;
      }

      if (choice.step === "want" && choice.tags.some((tag) => intent.includes(tag))) {
        partial += scoring.intentBonus ?? 1.2;
      }

      score += partial * weight;
    });

    const contextTags = protocol.contextTags || [];
    if (contextTags.length) {
      const hasContext = contextTags.some((tag) => allTags.has(tag));
      const dealContext = choices.some((choice) =>
        choice.step === "deal" && choice.tags.some((tag) => contextTags.includes(tag))
      );

      if (hasContext) score += scoring.contextBonus ?? 1.1;
      if (dealContext) {
        score += scoring.dealContextBonus ?? 1.6;
      } else if (protocol.contextRequired && !hasContext) {
        score = (score * (scoring.contextSoftCap ?? 0.55)) + (scoring.missingContextPenalty ?? -1.25);
      }
    }

    return score;
  }

  function rankedProtocols() {
    const choices = selectedChoices();
    return protocols
      .map((protocol) => ({ protocol, score: scoreProtocol(protocol, choices) }))
      .sort((a, b) => b.score - a.score || (a.protocol.order || 0) - (b.protocol.order || 0));
  }

  function compactLabels(labels) {
    if (!labels.length) return "<em>not chosen yet</em>";
    const visible = labels.slice(0, 3).map((label) => `<span>${escapeHtml(label)}</span>`).join("");
    const rest = labels.length > 3 ? `<span>+${labels.length - 3}</span>` : "";
    return visible + rest;
  }

  function renderSelectedRail() {
    if (!selectedRailEl) return;
    const selected = selectedByStep();

    selectedRailEl.innerHTML = `
      <div class="path-item">
        <strong>have</strong>
        <div class="path-tags">${compactLabels(selected.deal)}</div>
      </div>
      <div class="path-item">
        <strong>friction</strong>
        <div class="path-tags">${compactLabels(selected.off)}</div>
      </div>
      <div class="path-item">
        <strong>shift</strong>
        <div class="path-tags">${compactLabels(selected.want)}</div>
      </div>
    `;
  }

  function actionSet(protocol, primaryLabel = "Open") {
    return `
      <a class="btn btn-primary" href="${escapeHtml(protocol.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(primaryLabel)}</a>
      <button class="btn" type="button" data-copy-protocol="${escapeHtml(protocol.id)}">Copy protocol</button>
      <button class="btn" type="button" data-copy-instructions="${escapeHtml(protocol.id)}">Copy instructions</button>
    `;
  }

  function relatedProtocols(bestProtocol, ranked) {
    const ids = [];

    (bestProtocol.companions || []).forEach((id) => ids.push(id));
    ranked
      .filter((item) => item.protocol.id !== bestProtocol.id && item.score > 0)
      .slice(0, 5)
      .forEach((item) => ids.push(item.protocol.id));

    return Array.from(new Set(ids))
      .map(getProtocol)
      .filter(Boolean)
      .slice(0, 3);
  }

  function renderRelated(list) {
    if (!relatedEl) return;

    if (!list.length) {
      relatedEl.innerHTML = "";
      return;
    }

    relatedEl.innerHTML = list.map((protocol) => `
      <article class="related-card">
        <div>
          <h4>${escapeHtml(protocol.title)}</h4>
          <p>${escapeHtml(protocol.category)}</p>
        </div>
        <a href="${escapeHtml(protocol.url)}" target="_blank" rel="noopener noreferrer">Open</a>
      </article>
    `).join("");
  }

  function renderResult() {
    renderSelectedRail();

    const choices = selectedChoices();
    const ranked = rankedProtocols();
    recommended = new Set();

    if (!choices.length) {
      resultEl.innerHTML = `<p class="empty-result">${escapeHtml(data.uiCopy?.emptyResult || "Choose a few signals. The path will appear here.")}</p>`;
      renderRelated([]);
      highlightRecommended();
      return;
    }

    const best = ranked[0];
    if (!best || best.score <= 0) {
      resultEl.innerHTML = `<p class="empty-result">${escapeHtml(data.uiCopy?.noMatch || "This kit may not cover the whole job.")}</p>`;
      renderRelated([]);
      highlightRecommended();
      return;
    }

    const close = ranked[1] && best.score - ranked[1].score <= (data.scoring?.tieMargin || 1.25);
    const label = close ? "Possible starting point" : "Use now";
    const related = relatedProtocols(best.protocol, ranked);

    recommended.add(best.protocol.id);
    related.forEach((protocol) => recommended.add(protocol.id));

    resultEl.innerHTML = `
      <p class="result-label">${escapeHtml(label)}</p>
      <h3 class="result-title">${escapeHtml(best.protocol.title)}</h3>
      <p class="result-copy">${escapeHtml(best.protocol.shortDescription)}</p>
      <div class="result-actions">${actionSet(best.protocol, "Open")}</div>
      <details class="why-toggle">
        <summary>Why this path</summary>
        <p>${escapeHtml(best.protocol.useWhen)}</p>
        <p><strong>Not for:</strong> ${escapeHtml((best.protocol.notFor || []).slice(0, 2).join("; ") || "nothing obvious from this path")}</p>
      </details>
    `;

    renderRelated(related);
    highlightRecommended();
  }

  function detailBlock(kind, title, value) {
    const body = Array.isArray(value)
      ? `<ul>${value.slice(0, 4).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
      : `<p>${escapeHtml(value || "")}</p>`;

    return `<div class="detail-cell detail-${kind}"><h4>${escapeHtml(title)}</h4>${body}</div>`;
  }

  function protocolSearchText(protocol) {
    return [
      protocol.title,
      protocol.group,
      protocol.category,
      protocol.shortDescription,
      protocol.useWhen,
      Array.isArray(protocol.searchKeywords) ? protocol.searchKeywords.join(" ") : protocol.searchKeywords || ""
    ].join(" ").toLowerCase();
  }

  function protocolRow(protocol) {
    return `
      <article class="protocol-row" data-protocol-id="${escapeHtml(protocol.id)}" data-group="${escapeHtml(protocol.group)}" data-search="${escapeHtml(protocolSearchText(protocol))}">
        <div class="row-meta">
          <span>${escapeHtml(protocol.group)}</span>
          <span>${escapeHtml(protocol.category)}</span>
        </div>
        <div class="row-main">
          <h3 class="row-title">${escapeHtml(protocol.title)}</h3>
          <p class="row-desc">${escapeHtml(protocol.shortDescription)}</p>
        </div>
        <div class="row-actions">
          <a class="btn btn-primary btn-small" href="${escapeHtml(protocol.url)}" target="_blank" rel="noopener noreferrer">Open</a>
        </div>
        <details class="row-details">
          <summary><span class="closed-label">Show details</span><span class="open-label">Hide details</span></summary>
          <div class="detail-actions">
            <button class="btn btn-small" type="button" data-copy-protocol="${escapeHtml(protocol.id)}">Copy protocol</button>
            <button class="btn btn-small" type="button" data-copy-instructions="${escapeHtml(protocol.id)}">Copy instructions</button>
          </div>
          <div class="detail-grid">
            ${detailBlock("best", "Best for", protocol.bestFor || [])}
            ${detailBlock("needs", "Needs", protocol.needs || [])}
            ${detailBlock("warn", "Not for", protocol.notFor || [])}
            ${detailBlock("out", "Output", protocol.outputMode || "")}
          </div>
        </details>
      </article>
    `;
  }

  function renderProtocolIndex() {
    if (!protocolGridEl) return;
    protocolGridEl.innerHTML = protocols.map(protocolRow).join("");
    filterProtocolIndex();
  }

  function filterProtocolIndex() {
    let visible = 0;
    const normalizedQuery = query.trim().toLowerCase();

    $$("#protocolGrid .protocol-row").forEach((row) => {
      const groupMatch = activeGroup === "All" || row.dataset.group === activeGroup;
      const searchMatch = !normalizedQuery || (row.dataset.search || "").includes(normalizedQuery);
      const show = groupMatch && searchMatch;

      row.hidden = !show;
      if (show) visible += 1;
    });

    if (countEl) countEl.textContent = `${visible} ${visible === 1 ? "protocol" : "protocols"}`;
    highlightRecommended();
  }

  function highlightRecommended() {
    $$("#protocolGrid .protocol-row").forEach((row) => {
      row.classList.toggle("is-recommended", recommended.has(row.dataset.protocolId));
    });
  }

  function copyInstructions(id) {
    const protocol = getProtocol(id);
    if (!protocol) return;

    copyText(`${data.copyInstruction}\n\nProtocol: ${protocol.title}\nURL: ${protocol.url}`, "Instructions copied.");
  }

  function copyProtocol(id) {
    const protocol = getProtocol(id);
    if (!protocol) return;

    showToast("Copying protocol…");
    fetch(protocol.rawUrl, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("fetch failed");
        return response.text();
      })
      .then((text) => copyText(text, "Protocol copied."))
      .catch(() => showToast("Could not copy the protocol. Open it manually."));
  }

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const choiceButton = target.closest(".choice-button");
    if (choiceButton) {
      const nextValue = choiceButton.getAttribute("aria-pressed") !== "true";
      choiceButton.setAttribute("aria-pressed", nextValue ? "true" : "false");
      renderResult();
      return;
    }

    const groupButton = target.closest("[data-group-filter]");
    if (groupButton) {
      activeGroup = groupButton.dataset.groupFilter || "All";
      $$("[data-group-filter]").forEach((button) => {
        button.setAttribute("aria-pressed", button === groupButton ? "true" : "false");
      });
      filterProtocolIndex();
      return;
    }

    const copyProtocolButton = target.closest("[data-copy-protocol]");
    if (copyProtocolButton) {
      copyProtocol(copyProtocolButton.dataset.copyProtocol);
      return;
    }

    const copyInstructionsButton = target.closest("[data-copy-instructions]");
    if (copyInstructionsButton) {
      copyInstructions(copyInstructionsButton.dataset.copyInstructions);
    }
  });

  searchEl?.addEventListener("input", () => {
    query = searchEl.value || "";
    filterProtocolIndex();
  });

  resetEl?.addEventListener("click", () => {
    $$(".choice-button").forEach((button) => button.setAttribute("aria-pressed", "false"));
    recommended = new Set();
    renderResult();
    filterProtocolIndex();
    showToast("Reset.");
  });

  renderSteps();
  renderGroups();
  renderProtocolIndex();
  renderResult();
})();
