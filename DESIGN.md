# DESIGN.md — Arbia Bouzidi Cybersecurity Portfolio

## 1. Concept
**"Secure Terminal / SOC Command Center."** The visitor feels they are entering a security operations console. It must look hacker-grade but stay *professional and readable*: recruiters (HR, audit, SOC, GRC managers) must find the information in under 10 seconds.

Tone: confident, technical, clean. No cheesy "hoodie hacker" clichés.

## 2. Color palette (CSS variables)
```css
:root {
  --bg-0: #05080d;        /* deep black-blue background */
  --bg-1: #0a1018;        /* panels */
  --bg-2: #101a26;        /* cards */
  --line: #1c2b3a;        /* borders */
  --text: #d7e3ee;        /* main text */
  --muted: #7d93a8;       /* secondary text */
  --accent: #00ff9c;      /* neon green (primary) */
  --accent-2: #00d4ff;    /* cyan (secondary) */
  --warn: #ffb020;        /* amber (highlights, "alerts") */
  --danger: #ff3b5c;      /* red (red-team touches) */
  --glow: 0 0 12px rgba(0,255,156,.45);
}
```
Optional **light theme** toggle (bg #f4f7fa, accent #008a5a) — dark is default.

## 3. Typography
- Headings / UI labels / code feel: **JetBrains Mono** (Google Fonts)
- Body text: **Inter** (Google Fonts)
- Section titles formatted like shell prompts: `> whoami`, `> ls ./experience`, `> cat skills.json`
- Letter-spacing slightly wide on small uppercase labels.

## 4. Signature visual effects (all in vanilla CSS/JS)
1. **Boot sequence** (first visit, ~2s, skippable by click/any key): fake terminal lines
   `[ OK ] Loading profile...` → `[ OK ] Establishing secure connection...` → `ACCESS GRANTED` then fade into the site. Show once per session (sessionStorage).
2. **Matrix / binary rain** on a `<canvas>` behind the hero, very low opacity (~0.12), pauses when tab hidden, disabled with `prefers-reduced-motion`.
3. **Typing effect** in the hero: rotating roles
   `Cybersecurity Engineer` · `SOC Analyst` · `Security Auditor` · `Red Team / Blue Team` (translated per language).
4. **Glitch effect** on the name on hover (CSS clip-path + pseudo-elements, red/cyan offset).
5. **Scanlines + subtle CRT vignette** overlay (pointer-events: none).
6. **Cursor glow** following the mouse (radial gradient, desktop only).
7. **HUD cards:** corner brackets `⌜ ⌝ ⌞ ⌟` on cards, thin neon border, glow on hover, slight 3D tilt.
8. **Scroll reveal** (IntersectionObserver): elements fade/slide in, skill bars fill.
9. **Live "status bar"** fixed at the bottom: `● SECURE | TLS 1.3 | Paris, FR | local time` + current language.
10. **Animated radar / network graph** SVG in the hero or About (nodes pulsing) — decorative.

## 5. Layout & components
- **Sticky navbar:** logo `AB://` (monospace), links (About, Experience, Projects, Skills, Certifications, Education, Contact), **language switch `EN | FR`**, theme toggle. Mobile: hamburger drawer.
- **Hero:** left = text (greeting line, big name, typing roles, short pitch, 2 buttons: *Download CV* / *Contact me*, social icons GitHub/LinkedIn/Email). Right = **profile photo** in a hexagon or circle frame with rotating neon ring, scan-line sweep animation, and floating mini "tags" (`SIEM`, `DevSecOps`, `IAM`, `Forensics`).
- **Stats strip:** 3 internships · 4 certifications · 3 languages · 10+ security tools (counter animation).
- **Experience:** vertical **timeline** (commit-log / git-graph style), each card shows company, role, dates, bullet list, tech tags.
- **Projects:** grid of cards styled as terminal windows (3 dots header, title bar `project.sh`), tech badges, short description, GitHub button.
- **Skills:** categorized panels with animated progress bars OR a **MITRE ATT&CK–style matrix** of chips grouped by category. Include a small interactive "terminal" widget where typing `help`, `skills`, `contact`, `whoami` prints answers (easter egg, bilingual).
- **Certifications:** badge cards with icon, name, hover glow.
- **Education:** two timeline cards.
- **Languages:** circular or linear level meters (FR B2, EN C1, DE A1).
- **Contact:** split layout — left: info lines in terminal style; right: form (name, email, message) that opens `mailto:` with prefilled content (no backend). Copy-email button with toast.
- **Footer:** `© 2026 Arbia Bouzidi — built with HTML/CSS/JS`, back-to-top button.

## 6. Responsiveness & quality
- Mobile-first, breakpoints 480 / 768 / 1024 / 1280.
- Lighthouse targets: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95.
- Semantic HTML5, alt texts, focus-visible outlines, color contrast AA, keyboard-navigable.
- Respect `prefers-reduced-motion` (turn off rain, glitch, tilt, typing loops).
- No frameworks, no build step. Only Google Fonts + inline SVG icons (no icon CDN required).

## 7. Tone of microcopy
Short, technical, a few terminal puns: "Access granted", "Threat level: low", "Scanning...", "404: boring portfolio not found".
