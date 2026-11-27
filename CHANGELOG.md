The first release of the complete system. `tokens.json` is now the only source of truth.

### Added

- `tokens.json` and `tokens.schema.json` with semantic colour, type, spacing, radius, border, shadow, motion, layout, control, icon, and opacity tokens.
- Generated `tokens.css` with light, dark, and `prefers-color-scheme` themes, `uh-type-*` classes, Chinese line-height overrides, `uh-nums`, and `uh-measure`.
- Tailwind CSS v4, Nuxt UI v4, and shadcn/ui Base UI bridges.
- 30+ primitives: layout, buttons, links, badges, fields, inputs, selects, textareas, checkboxes, radios, switches, alerts, toasts, spinners, skeletons, empty states, tabs, breadcrumbs, pagination, sidebars, navigation items, TOCs, cards, tables, prose, code blocks, dialogs, separators, and the interactive hover button.
- Optional `components/components.js` for theme persistence, tab keyboard navigation, native dialogs, toasts, and code copy.
- `components/index.html` gallery in light and dark mode.
- `docs/tokens.md`, `docs/components.md`, and `docs/integration.md`.
- `assets/icons/uni-helper-icons.svg` with 24 symbols.
- A self-contained Agent Skill with generated tokens, components, fonts, icons, and logos.
- `scripts/build.ts` and Vitest design tests, including generated-file parity, raw colour/font checks, and contrast audits.
- `release-it` and `@release-it/conventional-changelog` for version bumps, local changelog updates, and tags.
- Vite+ for format, lint, and type checks.
- GitHub Actions checks on pushes to `main`, and a tag-triggered release workflow that publishes to npm and creates the GitHub release with `changelogithub`.

### Changed

- **Primary is ink, not brand green.** `--primary` and the default button now use zinc ink. Use `--brand-cta` or `uh-btn--brand` for an explicit brand action.
- **Full colour values replace HSL channel triples.** Variables now hold values such as `#ffffff`, not `0 0% 100%`. Remove `hsl(var(--token))` wrappers when migrating.
- **Control borders are stronger.** `--input` is a separate token and clears 3:1; `--border` remains decorative.
- **`--muted-foreground` is darker in light mode and lighter in dark mode.** Secondary text now clears 4.5:1 on `background` and `muted`.
- **The dark card is lighter than the page.** `--card` is `#141416`; the page stays `#09090b`.
- **Type classes use `uh-type-*`.** The old bare class names are gone.
- **The component count and scope grew.** The previous nine-component set is a subset of this release.
- **Generated files are not edited by hand.** Change `tokens.json`, component CSS/JS, or the scripts, then run `pnpm build`.

### Fixed

- Input boundaries no longer rely on a decorative border.
- Focus rings are consistent and survive forced-colors mode.
- The shadcn/ui bridge sets `--radius` from `--radius-md`; the integration docs cover the generated Geist font import and the overlay class.
- Chinese headings no longer receive Latin negative tracking.
- Reduced motion stops skeleton and spinner loops, not only transitions.
- The interactive hover button expands with `clip-path`, so long labels keep a complete fill.
- Dark shadows are visible against the near-black page.
- Chart, syntax, and status colours have dedicated, audited slots.
- The skill assets are generated and stay in sync with the repository.

### Breaking

- Old colour variables that were HSL triples must be wrapped differently. Use `var(--token)` or `color-mix()`.
- Old component class names from the pre-1.0 set are not preserved. Use the class names in `docs/components.md`.
- `--border` is no longer the form-control outline. Use `--input` for controls and `--border-strong` for interactive boundaries.
- `--primary` no longer means brand green. Audit any page that assumed a green primary fill.

### Not in this release

- The `website` app is not migrated. `docs/integration.md` documents the migration path.
- No Vue or React component package is included. The system is CSS-first; frameworks own state and use the documented classes.
- No CJK font is bundled. The stack uses the system CJK face.
