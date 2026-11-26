import fs from "node:fs";
import vm from "node:vm";
import { expect, it } from "vite-plus/test";

const source = fs.readFileSync(new URL("../components/components.js", import.meta.url), "utf8");

interface ClickEvent {
  target: FakeElement;
}

interface KeyEvent {
  target: FakeElement;
  key: string;
  preventDefault: () => void;
}

type ClickHandler = (event: ClickEvent) => void | Promise<void>;
type KeyHandler = (event: KeyEvent) => void;

class FakeElement {
  selector: string | null;
  tablist: FakeElement | null = null;
  dialog: FakeElement | null = null;
  tabChildren: FakeElement[] = [];
  dataset: Record<string, string> = {};
  attributes = new Map<string, string>();
  children: FakeElement[] = [];
  clickHandlers: ClickHandler[] = [];
  keydownHandlers: KeyHandler[] = [];
  className = "";
  textContent = "";
  innerHTML = "";
  hidden = false;
  focused = false;

  constructor(selector: string | null = "[data-theme-toggle]") {
    this.selector = selector;
  }

  closest(selector: string): FakeElement | null {
    if (selector === this.selector) return this;
    if (selector === '[role="tablist"]' && this.tablist) return this.tablist;
    if (selector === "dialog" && this.dialog) return this.dialog;
    return null;
  }

  querySelectorAll(selector: string): FakeElement[] {
    return selector === '[role="tab"]' ? this.tabChildren : [];
  }

  setAttribute(name: string, value: string): void {
    this.attributes.set(name, value);
  }

  getAttribute(name: string): string | null {
    return this.attributes.get(name) ?? null;
  }

  append(...children: FakeElement[]): void {
    this.children.push(...children);
  }

  focus(): void {
    this.focused = true;
  }

  addEventListener(type: string, handler: ClickHandler | KeyHandler): void {
    // The event name selects the handler shape.
    if (type === "click") this.clickHandlers.push(handler as ClickHandler);
    if (type === "keydown") this.keydownHandlers.push(handler as KeyHandler);
  }
}

class FakeHTMLElement extends FakeElement {}

class FakeDialogElement extends FakeHTMLElement {
  open = false;

  showModal(): void {
    this.open = true;
  }

  close(): void {
    this.open = false;
  }
}

interface PageStub {
  tablist?: FakeElement;
  dialog?: FakeDialogElement;
  dialogSelector?: string;
  toastRegion?: FakeElement;
  copyTarget?: FakeElement;
  copySelector?: string;
  panels?: Record<string, FakeElement>;
}

interface Handlers {
  click: ClickHandler[];
}

interface ClipboardStub {
  copied: string;
  writeText: (text: string) => Promise<void>;
}

interface Timer {
  callback: () => void;
  delay: number;
}

interface RootStub {
  dataset: { theme?: string };
  classList: { contains: (name: string) => boolean };
}

interface MediaStub {
  matches: boolean;
  listener: (event: { matches: boolean }) => void;
  addEventListener: (type: string, listener: (event: { matches: boolean }) => void) => void;
}

interface StorageStub {
  value: string | null;
  getItem: () => string | null;
  setItem: (key: string, value: string) => void;
}

interface BootOptions {
  stored?: string | null;
  theme?: string;
  hasDarkClass?: boolean;
  systemDark?: boolean;
  page?: PageStub;
}

function boot({
  stored = null,
  theme,
  hasDarkClass = false,
  systemDark = false,
  page = {},
}: BootOptions = {}) {
  const root: RootStub = {
    dataset: theme ? { theme } : {},
    classList: { contains: (name) => hasDarkClass && name === "dark" },
  };
  const media: MediaStub = {
    matches: systemDark,
    listener: () => {},
    addEventListener: (type, listener) => {
      if (type === "change") media.listener = listener;
    },
  };
  const storage: StorageStub = {
    value: stored,
    getItem: () => storage.value,
    setItem: (_key, value) => {
      storage.value = value;
    },
  };
  const handlers: Handlers = { click: [] };
  const timers: Timer[] = [];
  const clipboard: ClipboardStub = {
    copied: "",
    writeText: async (text) => {
      clipboard.copied = text;
    },
  };
  const sandbox = {
    document: {
      documentElement: root,
      addEventListener: (type: string, handler: ClickHandler) => {
        if (type === "click") handlers.click.push(handler);
      },
      querySelectorAll: (selector: string): FakeElement[] => {
        if (selector === '[role="tablist"]') return page.tablist ? [page.tablist] : [];
        if (selector === "dialog.uh-dialog") return page.dialog ? [page.dialog] : [];
        return [];
      },
      querySelector: (selector: string): FakeElement | null => {
        if (selector === "[data-toast-region]") return page.toastRegion ?? null;
        if (selector === page.dialogSelector) return page.dialog ?? null;
        if (selector === page.copySelector) return page.copyTarget ?? null;
        return null;
      },
      getElementById: (id: string): FakeElement | null => page.panels?.[id] ?? null,
      createElement: (): FakeHTMLElement => new FakeHTMLElement(null),
    },
    window: {
      matchMedia: () => media,
      setTimeout: (callback: () => void, delay: number): number => {
        timers.push({ callback, delay });
        return timers.length;
      },
    },
    localStorage: storage,
    navigator: { clipboard },
    Element: FakeElement,
    HTMLElement: FakeHTMLElement,
    HTMLDialogElement: FakeDialogElement,
  };
  vm.runInNewContext(source, sandbox);
  return { root, media, storage, handlers, timers, clipboard, Element: FakeElement };
}

async function click(handlers: Handlers, event: ClickEvent): Promise<void> {
  await Promise.all(handlers.click.map((handler) => Promise.resolve(handler(event))));
}

it("follows the system theme when nothing is stored or authored", () => {
  const { root, media } = boot({ systemDark: false });
  expect(root.dataset.theme).toBe("light");
  media.listener({ matches: true });
  expect(root.dataset.theme).toBe("dark");
});

it("a stored theme wins over the system and survives system changes", () => {
  const { root, media } = boot({ stored: "light", systemDark: true });
  expect(root.dataset.theme).toBe("light");
  media.listener({ matches: false });
  expect(root.dataset.theme).toBe("light");
});

it("the dark class is an explicit theme", () => {
  const { root, media } = boot({ hasDarkClass: true, systemDark: false });
  expect(root.dataset.theme).toBe("dark");
  media.listener({ matches: false });
  expect(root.dataset.theme).toBe("dark");
});

it("an authored data-theme survives a system change", () => {
  const { root, media } = boot({ theme: "dark", systemDark: true });
  expect(root.dataset.theme).toBe("dark");
  media.listener({ matches: false });
  expect(root.dataset.theme).toBe("dark");
});

it("the toggle stores the opposite theme", async () => {
  const { root, storage, handlers, Element } = boot({ systemDark: false });
  await click(handlers, { target: new Element() });
  expect(root.dataset.theme).toBe("dark");
  expect(storage.value).toBe("dark");
});

it("tabs switch panels with click and arrow keys", () => {
  const tablist = new FakeElement(null);
  const tabs = ["README", "版本", "设置"].map((label, index) => {
    const tab = new FakeHTMLElement('[role="tab"]');
    tab.tablist = tablist;
    tab.setAttribute("aria-controls", `panel-${index}`);
    tab.setAttribute("aria-selected", index === 0 ? "true" : "false");
    tab.textContent = label;
    return tab;
  });
  tablist.tabChildren = tabs;
  const panels = {
    "panel-0": new FakeHTMLElement(null),
    "panel-1": new FakeHTMLElement(null),
    "panel-2": new FakeHTMLElement(null),
  };
  boot({ page: { tablist, panels } });
  expect(tabs[0].getAttribute("aria-selected")).toBe("true");
  expect(panels["panel-0"].hidden).toBe(false);
  expect(panels["panel-1"].hidden).toBe(true);

  for (const handler of tablist.clickHandlers) void handler({ target: tabs[1] });
  expect(tabs[1].getAttribute("aria-selected")).toBe("true");
  expect(panels["panel-1"].hidden).toBe(false);

  let prevented = false;
  for (const handler of tablist.keydownHandlers)
    handler({
      target: tabs[1],
      key: "ArrowRight",
      preventDefault: () => {
        prevented = true;
      },
    });
  expect(prevented).toBe(true);
  expect(tabs[2].getAttribute("aria-selected")).toBe("true");
  expect(tabs[2].focused).toBe(true);
});

it("opens and closes the dialog", async () => {
  const dialog = new FakeDialogElement();
  const opener = new FakeHTMLElement("[data-dialog-open]");
  opener.dataset.dialogOpen = "#gallery-dialog";
  const closer = new FakeHTMLElement("[data-dialog-close]");
  closer.dialog = dialog;
  const { handlers } = boot({ page: { dialog, dialogSelector: "#gallery-dialog" } });

  await click(handlers, { target: opener });
  expect(dialog.open).toBe(true);

  await click(handlers, { target: closer });
  expect(dialog.open).toBe(false);
});

it("adds a toast to the region", async () => {
  const toastRegion = new FakeElement(null);
  const trigger = new FakeHTMLElement("[data-toast-trigger]");
  trigger.dataset.toastTitle = "已保存";
  trigger.dataset.toastBody = "你的更改已经保存。";
  const { handlers } = boot({ page: { toastRegion } });

  await click(handlers, { target: trigger });
  const toast = toastRegion.children[0];
  expect(toast.className).toBe("uh-toast");
  expect(toast.getAttribute("role")).toBe("status");
  const content = toast.children[0];
  expect(content.children[0].textContent).toBe("已保存");
  expect(content.children[1].textContent).toBe("你的更改已经保存。");
});

it("copies code and restores the button markup", async () => {
  const button = new FakeHTMLElement("[data-copy-target]");
  button.dataset.copyTarget = "#code";
  button.innerHTML = "<svg></svg>复制";
  const target = new FakeHTMLElement(null);
  target.textContent = "const answer = 42";
  const { handlers, timers, clipboard } = boot({
    page: { copyTarget: target, copySelector: "#code" },
  });

  await click(handlers, { target: button });
  expect(clipboard.copied).toBe("const answer = 42");
  expect(button.textContent).toBe("已复制");

  const restore = timers.find((timer) => timer.delay === 1600);
  expect(restore).toBeDefined();
  restore?.callback();
  expect(button.innerHTML).toBe("<svg></svg>复制");
});
