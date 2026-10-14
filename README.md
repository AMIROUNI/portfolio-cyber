# Arbia Bouzidi — Cybersecurity Portfolio

Bilingual (FR/EN) personal portfolio, "Secure Terminal / SOC Command Center" theme.
Pure **HTML5 + CSS3 + vanilla JavaScript** — no frameworks, no build step, no npm.
Just open `index.html` in a browser (double-click works).

---

## Folder structure

```
portfolio/
├── index.html              ← all page content (sections, SEO meta, JSON-LD)
├── DESIGN.md               ← visual identity spec (source of truth)
├── STRUCTURE.md            ← content + i18n spec (source of truth)
├── README.md
├── assets/
│   ├── photo.jpg           ← profile photo (edit this file to change the portrait)
│   ├── favicon.svg         ← shield favicon
│   ├── og-image.png        ← social preview (Open Graph / Twitter)
│   └── Arbia_Bouzidi_CV.pdf ← CV downloaded by the "Download CV" button
├── css/
│   ├── variables.css       ← colors, fonts, themes (dark / light)
│   ├── base.css            ← reset, typography, layout helpers, a11y
│   ├── components.css      ← navbar, HUD cards, timeline, terminal, status bar…
│   ├── sections.css        ← hero, stats, about, grids, responsive breakpoints
│   └── animations.css      ← keyframes, glitch, reduced-motion rules
└── js/
    ├── i18n.js             ← EN/FR translations + language switch logic
    ├── main.js             ← nav, theme, scroll reveal, counters, toast, form
    ├── effects.js          ← boot sequence, matrix rain, typing, glow, tilt
    └── terminal.js         ← interactive mini terminal (help/whoami/skills/contact)
```

---

## How to edit content

**Almost all text lives in one place.**

- **Section copy / bullets / labels** → `index.html` (search for the text you want).
- **Every translatable string** → `js/i18n.js`, in the `translations.en` and
  `translations.fr` objects. Any element with `data-i18n="some.key"` is overwritten
  from this file on load — edit the key there, **both languages**.
- Never invent facts: `STRUCTURE.md` is the content source of truth.

### Add a new translatable string

1. In `index.html`: `<p data-i18n="about.newText">Default text</p>`
2. In `js/i18n.js`: add `newText: "…"` under **both** `en: { about: {...} }` and
   `fr: { about: {...} }`.
3. Missing keys log a warning in the browser console (`[i18n] Missing key …`).

Placeholders / aria-labels / alt use `data-i18n-placeholder`,
`data-i18n-aria`, `data-i18n-alt` instead.

---

## Replace the photo & CV

| Asset | Replace with | Notes |
|---|---|---|
| `assets/photo.jpg` | your photo | Keep the filename. Square-ish crop works best (hexagon frame, face centered top). If the file is missing, an "AB" initials avatar appears automatically. |
| `assets/Arbia_Bouzidi_CV.pdf` | your CV | Keep the exact filename — the "Download CV" button points to it. |

---

## Switch project GitHub links

Each project card has a `data-repo` attribute in `index.html`:

```html
<a class="project-link" href="https://github.com/ARBIAARBIA" data-repo="" ...>
```

- Empty `data-repo=""` → links to the profile (`github.com/ARBIAARBIA`).
- Set it to a repo → `data-repo="ARBIAARBIA/my-ids-project"` → links to
  `https://github.com/ARBIAARBIA/my-ids-project`.

No JS edit needed — `js/main.js` applies it automatically.

---

## Customize

- **Colors / theme** → `css/variables.css` (`:root` = dark, `[data-theme="light"]` = light).
- **Boot intro frequency** → once per browser session; clear sessionStorage to replay.
- **Reduced motion** → all animated effects (rain, glitch, tilt, typing loop) disable
  automatically when the OS sets "reduce motion".

---

## Deploy

The site is static — any host works.

### GitHub Pages
1. Push this folder to a repo (e.g. `ARBIAARBIA/portfolio`).
2. Repo → **Settings → Pages → Source: Deploy from a branch → `main` / root → Save**.
3. Site live at `https://ARBIAARBIA.github.io/portfolio/`.

### Netlify
1. Drag-and-drop the folder onto https://app.netlify.com/drop — done.
2. Or connect the GitHub repo, build command: *(leave empty)*, publish dir: `/`.

### Vercel
1. https://vercel.com/new → import the GitHub repo.
2. Framework preset: **Other**, no build command, no output dir → Deploy.

> After deploying, set the canonical/OG URL in `index.html` if you care about SEO sharing.

---

## Quality checklist (already implemented)

- Works offline via `file://` — translations live in JS, no `fetch()`.
- EN/FR fully translated (149 strings each), persisted in `localStorage`,
  auto-detects browser language, fallback **FR**.
- Responsive 375 → 1440+ (breakpoints 480 / 768 / 1024 / 1280), hamburger menu.
- Accessible: semantic HTML, alt text, `focus-visible`, AA contrast, keyboard nav,
  `prefers-reduced-motion` support.
- Performance: lazy-loaded photo, canvas pauses when tab hidden / out of view,
  no layout shift.
- SEO: meta description, Open Graph, Twitter card, JSON-LD `Person`, shield favicon.
