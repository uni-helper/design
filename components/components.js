(() => {
  const root = document.documentElement;
  const storageKey = "uh-theme";
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  /** @returns {string | null} */
  const readStoredTheme = () => {
    try {
      return localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  };

  /** @returns {string} */
  const currentTheme = () => {
    if (root.dataset.theme === "dark") return "dark";
    if (root.dataset.theme === "light") return "light";
    return root.classList.contains("dark") ? "dark" : "light";
  };

  /** @returns {void} */
  const syncThemeControls = () => {
    const dark = currentTheme() === "dark";
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.setAttribute("aria-pressed", String(dark));
      const label = button.querySelector("[data-theme-label]");
      if (label) label.textContent = dark ? "浅色模式" : "深色模式";
    });
  };

  /**
   * @param {string} theme
   * @param {boolean} persist
   * @returns {void}
   */
  const applyTheme = (theme, persist) => {
    root.dataset.theme = theme;
    if (persist) {
      try {
        localStorage.setItem(storageKey, theme);
      } catch {
        // Theme still applies for this page when storage is unavailable.
      }
    }
    syncThemeControls();
  };

  const storedTheme = readStoredTheme();
  const attributeTheme =
    root.dataset.theme === "dark" || root.dataset.theme === "light" ? root.dataset.theme : null;
  const authoredTheme = attributeTheme || (root.classList.contains("dark") ? "dark" : null);
  const initialTheme =
    storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : authoredTheme || (media.matches ? "dark" : "light");
  applyTheme(initialTheme, false);

  /** @param {Event} event @param {string} selector */
  const closest = (event, selector) =>
    event.target instanceof Element ? event.target.closest(selector) : null;

  document.addEventListener("click", (event) => {
    const toggle = closest(event, "[data-theme-toggle]");
    if (!toggle) return;
    applyTheme(currentTheme() === "dark" ? "light" : "dark", true);
  });

  media.addEventListener("change", (event) => {
    if (readStoredTheme() || authoredTheme) return;
    applyTheme(event.matches ? "dark" : "light", false);
  });

  /**
   * @param {Element} tab
   * @param {boolean} focus
   * @returns {void}
   */
  const activateTab = (tab, focus) => {
    const list = tab.closest('[role="tablist"]');
    if (!list) return;
    const tabs = Array.from(list.querySelectorAll('[role="tab"]'));
    const panelId = tab.getAttribute("aria-controls");
    tabs.forEach((item) => {
      const selected = item === tab;
      item.setAttribute("aria-selected", String(selected));
      item.setAttribute("tabindex", selected ? "0" : "-1");
      const itemPanelId = item.getAttribute("aria-controls");
      const panel = itemPanelId ? document.getElementById(itemPanelId) : null;
      if (panel) panel.hidden = !selected;
    });
    if (panelId) {
      const panel = document.getElementById(panelId);
      if (panel) panel.hidden = false;
    }
    if (focus && tab instanceof HTMLElement) tab.focus();
  };

  document.querySelectorAll('[role="tablist"]').forEach((list) => {
    const tabs = Array.from(list.querySelectorAll('[role="tab"]'));
    if (!tabs.length) return;
    const selected = tabs.find((tab) => tab.getAttribute("aria-selected") === "true") || tabs[0];
    activateTab(selected, false);

    list.addEventListener("click", (event) => {
      const tab = closest(event, '[role="tab"]');
      if (tab) activateTab(tab, false);
    });

    list.addEventListener("keydown", (event) => {
      const tab = closest(event, '[role="tab"]');
      if (!tab) return;
      const index = tabs.indexOf(tab);
      let next = index;
      const key = /** @type {KeyboardEvent} */ (event).key;
      if (key === "ArrowRight") next = (index + 1) % tabs.length;
      else if (key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      else if (key === "Home") next = 0;
      else if (key === "End") next = tabs.length - 1;
      else return;
      event.preventDefault();
      activateTab(tabs[next], true);
    });
  });

  document.addEventListener("click", (event) => {
    const opener = closest(event, "[data-dialog-open]");
    if (opener instanceof HTMLElement) {
      const dialog = opener.dataset.dialogOpen
        ? document.querySelector(opener.dataset.dialogOpen)
        : null;
      if (dialog instanceof HTMLDialogElement) dialog.showModal();
      return;
    }

    const closer = closest(event, "[data-dialog-close]");
    if (closer) {
      const dialog = closer.closest("dialog");
      if (dialog instanceof HTMLDialogElement) dialog.close();
    }
  });

  document.querySelectorAll("dialog.uh-dialog").forEach((dialog) => {
    if (!(dialog instanceof HTMLDialogElement)) return;
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  });

  const toastRegion = document.querySelector("[data-toast-region]");

  /**
   * @param {string} title
   * @param {string} body
   * @returns {void}
   */
  const showToast = (title, body) => {
    if (!toastRegion) return;
    const toast = document.createElement("div");
    toast.className = "uh-toast";
    toast.setAttribute("role", "status");
    const content = document.createElement("div");
    const heading = document.createElement("p");
    heading.className = "uh-toast__title";
    heading.textContent = title;
    const copy = document.createElement("p");
    copy.className = "uh-toast__body";
    copy.textContent = body;
    content.append(heading, copy);
    toast.append(content);
    toastRegion.append(toast);
    window.setTimeout(() => toast.remove(), 5000);
  };

  document.addEventListener("click", (event) => {
    const trigger = closest(event, "[data-toast-trigger]");
    if (!(trigger instanceof HTMLElement)) return;
    showToast(
      trigger.dataset.toastTitle || "已保存",
      trigger.dataset.toastBody || "你的更改已经保存。",
    );
  });

  document.addEventListener("click", async (event) => {
    const button = closest(event, "[data-copy-target]");
    if (!(button instanceof HTMLElement) || !button.dataset.copyTarget) return;
    const target = document.querySelector(button.dataset.copyTarget);
    if (!target) return;
    const text = target.textContent ?? "";
    try {
      await navigator.clipboard.writeText(text);
      const content = button.innerHTML;
      button.textContent = "已复制";
      window.setTimeout(() => {
        button.innerHTML = content;
      }, 1600);
    } catch {
      showToast("复制失败", "请手动选择代码后复制。");
    }
  });
})();
