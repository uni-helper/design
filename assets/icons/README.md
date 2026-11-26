# Icons

`uni-helper-icons.svg` is a 24px stroke sprite with 24 symbols and one consistent family: 2px stroke, round caps and joins, `currentColor`, no fills.

Use an icon at 16px, 20px or 24px with the matching token:

```html
<svg class="icon" width="16" height="16" aria-hidden="true">
  <use href="/assets/icons/uni-helper-icons.svg#icon-check"></use>
</svg>
```

- Decorative icons get `aria-hidden="true"`.
- An icon-only button needs an `aria-label`; the icon itself stays hidden.
- Do not mix filled and outlined icons at the same level.
- Do not redraw the uni-helper marks as UI icons; use `../logos/` for brand marks.
- Keep one stroke width across a view. The sprite uses 2px at 24px; at 16px the browser scales it proportionally.

The gallery in `components/index.html` references the sprite with `<use>`. Apply `fill: none`, `stroke: currentColor`, and the stroke width on the surrounding `<svg>` so the symbol inherits them in every browser.
