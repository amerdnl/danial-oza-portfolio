# Danial Oza — Life Advisor Portfolio

A bilingual (English / Bahasa Melayu) portfolio website for **Danial Oza**, a Life Advisor with **AIA PUBLIC Takaful Berhad**.

The site introduces Danial, explains the six takaful protection categories, offers an educational recommendation questionnaire, and routes every enquiry to WhatsApp. There is no backend — nothing is stored anywhere.

It is a **single-page application** with multiple routes and a single permanent light theme.

---

## Table of contents

- [Technology](#technology)
- [Getting started](#getting-started)
- [Routing](#routing)
- [The theme](#the-theme)
- [Updating content](#updating-content)
- [Replacing the profile photo](#replacing-the-profile-photo)
- [Changing the WhatsApp number](#changing-the-whatsapp-number)
- [WhatsApp messages](#whatsapp-messages)
- [How the recommendation logic works](#how-the-recommendation-logic-works)
- [Deployment](#deployment)
- [Placeholder content](#placeholder-content-must-be-replaced-before-launch)
- [Content rules](#content-rules-please-read-before-editing)

---

## Technology

| Tool | Purpose |
|---|---|
| React 19 | UI |
| Vite 8 | Dev server and build |
| React Router 7 | Client-side routing |
| Tailwind CSS 4 | Styling, configured in CSS via `@theme` (there is no `tailwind.config.js`) |
| lucide-react | Interface and category icons |
| react-icons | Brand icons (WhatsApp, Instagram, Facebook, LinkedIn, TikTok) |
| @fontsource-variable/plus-jakarta-sans | Self-hosted font |

**No animation library** — scroll reveals and route transitions use `IntersectionObserver` plus CSS, which keeps roughly 90 kB (gzipped) out of the bundle.
**No SEO library** — per-route titles and meta tags are handled by a small hook, so react-helmet is not needed.
**No analytics or tracking scripts.**

---

## Getting started

Requires Node 18 or newer (developed on Node 24).

```bash
npm install        # install dependencies
npm run dev        # development server at http://localhost:5173
npm run build      # production build into dist/
npm run preview    # preview the production build at http://localhost:4173
npm run lint       # oxlint
```

---

## Routing

This is a **single-page application**, not a multi-page site. There is one `index.html`; React Router swaps the page content in the browser, so moving between pages never triggers a full reload.

### Routes

| Path | Page component | Contents |
|---|---|---|
| `/` | `HomePage` | Overview — hero, trust bar, and short previews of every section |
| `/about` | `AboutPage` | Biography, approach, client types, consultation process |
| `/services` | `ServicesPage` | All six protection categories in full |
| `/recommendation` | `RecommendationPage` | The questionnaire |
| `/achievements` | `AchievementsPage` | Milestones, statistics, values |
| `/faq` | `FAQPage` | All 15 questions |
| `/contact` | `ContactPage` | Contact details, enquiry form, appointment form |
| `*` | `NotFoundPage` | 404 |

### How it fits together

```
src/
├── App.jsx                          providers + <BrowserRouter>
├── routes/
│   ├── AppRoutes.jsx                the route table
│   └── navItems.js                  nav links — single source of truth
├── pages/                           one component per route
└── components/layout/
    ├── AppLayout.jsx                shell: navbar, <main>, footer, WhatsApp button
    ├── Navbar.jsx / MobileNav.jsx   navigation
    ├── PageHeader.jsx               title + breadcrumb for non-home pages
    └── ScrollToTop.jsx              scroll + focus on route change
```

Every route renders inside `AppLayout`, so the navbar, footer, and floating WhatsApp button are mounted once and persist across navigation.

### Adding a page

1. Create `src/pages/YourPage.jsx`. Give it exactly one `<h1>` — the easiest way is `<PageHeader title=... intro=... />`.
2. Register the route in [`src/routes/AppRoutes.jsx`](src/routes/AppRoutes.jsx).
3. Add a `routeMeta` entry in [`src/i18n/ui.js`](src/i18n/ui.js) with a bilingual `title` and `description`, then call `useDocumentMeta('yourKey')` in the page.
4. To show it in the navigation, add an entry to [`src/routes/navItems.js`](src/routes/navItems.js) — the navbar, mobile menu, and footer all read from that one array.

### Internal vs external links

Use React Router's `Link` / `NavLink` for anything inside the site — a plain `<a href="/about">` would reload the whole app. Keep plain `<a>` for external destinations (`wa.me`, `tel:`, `mailto:`, social profiles), always with `rel="noopener noreferrer"`.

### Page metadata

[`src/hooks/useDocumentMeta.js`](src/hooks/useDocumentMeta.js) sets the title, description, canonical URL, and Open Graph tags for the active route, and re-runs when the language changes. Edit the text in the `routeMeta` map in `src/i18n/ui.js`.

### Scroll and focus

[`ScrollToTop.jsx`](src/components/layout/ScrollToTop.jsx) scrolls to the top and moves focus to the new page's `<h1>` after each navigation. It deliberately **skips browser back/forward** (`POP`) navigations so the browser's own scroll restoration still works.

---

## The theme

The site has **one permanent light theme**. There is no theme switcher, no stored preference, and no system-preference detection — the operating system being in dark mode does not change the site.

### Where the colours live

All of them are at the top of [`src/index.css`](src/index.css), in two blocks:

1. **`@theme`** — the semantic colours. Tailwind turns each one into a utility (`bg-surface`, `text-muted`, `border-border`) and also emits it as a custom property on `:root`, so the component classes further down can use `var(--color-*)`.
2. **`:root`** — the `--ui-*` tokens: translucent fills, gradients, and shadows that should not become colour utilities.

| Token | Value | Used for |
|---|---|---|
| `page` | `#FFF9F9` | Main page background |
| `section` | `#F8EDED` | Alternate section background |
| `surface` | `#FFFFFF` | Card background |
| `surface-raised` | `#FFF3F3` | Raised card / hover state |
| `brand` | `#950101` | Brand red — surfaces, borders, accents |
| `brand-soft` | `#950101` | Brand red for small text and icons |
| `accent` | `#D90000` | Primary CTA |
| `on-accent` | `#FFFFFF` | Text on a brand or accent fill |
| `heading` | `#1A0000` | Headings |
| `body` | `#2B2020` | Body text |
| `muted` | `#685B5B` | Secondary text |
| `border` | `rgba(61,0,0,.16)` | Hairlines and card borders |
| `focus` | `#950101` | Focus rings |
| `error` | `#B00020` | Form validation messages |

Use these as ordinary Tailwind utilities in components — **never a raw hex value**.

`brand` and `brand-soft` currently share a value but are kept separate: `brand` is for surfaces and borders, `brand-soft` for small text and icons. Keeping them distinct means either can be tuned without disturbing the other.

**Contrast (WCAG AA):** white on `#D90000` 5.1:1 · body on page 14.4:1 · muted on page 5.8:1 · muted on alternate sections 5.3:1 · brand red small text on page 9.6:1.

### Changing a colour

Edit the value in `@theme` (or `:root` for a `--ui-*` token) in `src/index.css`. It propagates everywhere. Re-check contrast before shipping a change to a text or CTA colour.

### The loading screen

The 2000ms intro loader uses the same light palette, so there is no dark moment before the page appears. Its gradient is the `.intro-overlay` rule in `src/index.css`.

---

## Updating content

All content lives in `src/data/` and `src/i18n/`, separate from the components. **You do not need to touch any component to change the site's wording.**

Every visible string is bilingual and written as:

```js
{ en: 'English text', ms: 'Teks Bahasa Melayu' }
```

Fill in **both** languages. If `ms` is missing the English is shown as a fallback.

| What you want to change | File |
|---|---|
| Name, title, company, experience, languages, availability, contact details, social links | `src/data/advisor.js` |
| The six protection categories and their considerations | `src/data/services.js` |
| "Protection for Different Stages of Life" cards | `src/data/clientTypes.js` |
| Professional milestones | `src/data/achievements.js` |
| FAQ questions and answers | `src/data/faqs.js` |
| The five consultation steps | `src/data/process.js` |
| "Why Choose Danial" points | `src/data/whyChooseMe.js` |
| Questionnaire questions and options | `src/data/questionnaire.js` |
| Buttons, navigation, form labels, error messages, disclaimers | `src/i18n/ui.js` |
| Page title and meta description | `src/i18n/ui.js` (`seo`) **and** `index.html` |

### Adding an icon

Icons are referenced by name in the data files (e.g. `icon: 'HeartPulse'`). To use a new one, import it in `src/components/common/Icon.jsx` and add it to `ICON_MAP`. Icons are listed explicitly rather than imported in bulk so unused ones stay out of the bundle.

---

## Replacing the profile photo

Replace this one file:

```
public/images/danial-oza.jpg
```

Keep the filename and the whole site updates. A **square** image of at least 800×800px works best — it is displayed in a square frame with `object-cover`.

If you use a different filename or format, update `profileImage` in `src/data/advisor.js`. If your image is not square, also update `profileImageWidth` / `profileImageHeight` in the same file — those values reserve layout space so the page does not shift while the image loads.

---

## Changing the WhatsApp number

One place only — the top of `src/data/advisor.js`:

```js
const WHATSAPP_NUMBER = '60199801317'
```

**Format:** country code + number, with **no** `+`, spaces, dashes, or leading zero.
Malaysia (`60`) + `19-980 1317` → `60199801317`.

Also update the human-readable versions in the same file if the number changes:

```js
contact: {
  whatsappDisplay: '+60 19-980 1317',
  phoneDisplay: '+60 19-980 1317',
  phoneHref: 'tel:+60199801317',
  ...
}
```

---

## WhatsApp messages

Message templates live in `whatsappMessages` in `src/data/advisor.js`. The link builders are in `src/utils/whatsapp.js`.

There are five:

| Builder | Used by |
|---|---|
| `generalEnquiryUrl()` | Floating button, FAQ, footer, contact |
| `appointmentUrl()` | Booking form (appends name, phone, type, date, time, topic, note) |
| `recommendationUrl()` | Questionnaire results (appends the answer summary and suggested areas) |
| `serviceEnquiryUrl()` | "Ask about this" on each service card |
| `contactMessageUrl()` / `contactMailtoUrl()` | Contact form |

Messages are URL-encoded automatically — write them as plain text, including emoji and line breaks.

> ⚠️ **The Bahasa Melayu message templates were drafted during the build and are marked `// TRANSLATION — pending advisor approval`.** Please review them before launch. The English versions are Danial's approved wording and are sent verbatim.

---

## How the recommendation logic works

The questionnaire collects answers across five steps, then `src/utils/recommendationEngine.js` turns them into a ranked list of **general discussion areas**.

The logic is a plain table of rules — no hidden branching:

```js
{
  id: 'no-medical-card-hospital-concern',   // unique, used as a React key
  category: 'medical-card',                 // a service id from src/data/services.js
  when: (a) => a.hasMedicalCard === 'no' && a.concerns.includes('hospital'),
  weight: 3,                                // 1–3; higher pushes the category up
  reason: { en: '...', ms: '...' },         // shown to the visitor as the "why"
}
```

Each rule that matches adds its `weight` to its category. Categories are ranked by total score and the top **4** are shown, each with the reasons that fired. If nothing matches at all, a broad basic review (medical card, life takaful, critical illness) is shown instead.

**To change the logic:** add, edit, or delete rule objects in the `RULES` array. Nothing else needs to change. Several rules can point at the same category — their weights accumulate.

### Hard limits on the engine

By design, the engine never outputs:

- product names
- contribution or premium amounts
- eligibility or approval conclusions
- medical assessments
- investment-return projections

The four `RESULT_LIMITATIONS` and the full disclaimer are always shown with the results. Please keep it that way — the tool is educational, not advice.

### Privacy

The questionnaire collects **no** medical details, exact income, bank balances, or identity-card numbers. Emergency savings are asked as a range of months, never as an amount. Answers stay in React state in the visitor's browser and are only sent anywhere if they choose to open WhatsApp.

---

## Use of red

**Bright red (`accent`) is deliberately restricted** to primary buttons, the questionnaire progress bar, key statistics, and active states. Small red text uses the `brand-soft` token instead, because pure red is not readable at small sizes. If you widen the use of `accent`, re-check contrast in **both** themes first.

See [The theme](#the-theme) for the full token list.

---

## Deployment

The build output is a static site in `dist/` — any static host works.

### SPA fallback (important)

Because routing happens in the browser, no file exists at `/about` or `/services` on the server. Without a fallback rule, loading one of those URLs directly — or pressing refresh while on one — returns a 404.

Both hosts are already configured:

- **Vercel** — [`vercel.json`](vercel.json) rewrites every request to `/index.html`
- **Netlify** — [`public/_redirects`](public/_redirects) does the same with `/*  /index.html  200`

Both match real files first, so `/assets/*`, `/images/*`, `/favicon.svg`, and `/robots.txt` still load normally. The `200` (rather than a redirect) keeps the URL in the address bar.

**To test direct route access before deploying:**

```bash
npm run build && npm run preview
```

Then open `http://localhost:4173/about` directly and refresh. It should render the About page, not a 404. Also try `/nonexistent-page` — that should render the styled 404 page, still with the navbar and footer.

### Vercel

1. Push the repository to GitHub.
2. In Vercel, **Add New → Project** and import the repository.
3. Vercel detects Vite automatically. Confirm:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
4. **Deploy.**

Or from the terminal: `npx vercel --prod`

### Netlify

1. Push the repository to GitHub.
2. In Netlify, **Add new site → Import an existing project**.
3. Set:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. **Deploy site.**

Or from the terminal: `npx netlify deploy --prod --dir=dist`

### After deploying

Replace the placeholder domain `https://www.example.com` in:

- `src/data/advisor.js` — `siteUrl`, which per-route canonical and Open Graph URLs are built from
- `index.html` — the canonical URL, `og:url`, `og:image`, `twitter:image`, and the two JSON-LD blocks
- `public/robots.txt` — the sitemap line

Then check every route loads directly on the live domain, not just from in-app navigation.

---

## Placeholder content (must be replaced before launch)

| Item | Location | Notes |
|---|---|---|
| **Profile photo** | `public/images/danial-oza.jpg` | Generated avatar silhouette in the brand colours. Replace with the real photo. |
| **Open Graph image** | `public/og-image.png` | Plain 1200×630 gradient. Replace with a real link-preview image. |
| **Favicon** | `public/favicon.svg` | Generic shield mark in the brand colours. |
| **Domain** | `index.html`, `robots.txt`, `advisor.js` | `https://www.example.com` throughout. |
| **Bahasa Melayu copy** | `src/i18n/ui.js`, `src/data/*` | Drafted during the build. Needs Danial's review — especially the disclaimers and WhatsApp messages. |

Everything else — name, title, company, qualification, experience, client count, languages, availability, contact details, social links, the six categories, and the three achievements — is real information supplied by the advisor.

---

## Content rules (please read before editing)

This site describes a regulated financial product. The wording is careful on purpose.

**Never add:**

- invented testimonials, client names, or client photos
- statistics, awards, or rankings that have not been verified
- specific product names, contribution amounts, or premium figures
- any promise of guaranteed approval, guaranteed claims, or guaranteed returns
- claims that a particular plan is the cheapest or the best
- phrases like "award-winning", "Malaysia's top advisor", or "number one advisor"
- tracking or advertising scripts

**Always keep:**

- hedged wording — "may consider", "could review", "depending on individual circumstances", "subject to affordability and eligibility"
- the services disclaimer beneath the services section
- the full recommendation disclaimer on the results screen
- the general disclaimer in the footer
- the statement that this is Danial's personal advisor portfolio and **not** the official website of AIA PUBLIC Takaful Berhad
- the notice warning visitors not to send medical reports, IC numbers, or banking details through the forms

The three achievements are **internal recognitions** within AIA PUBLIC Takaful Berhad. They must not be presented as industry-wide awards.

---

## Accessibility notes

Built to WCAG-oriented practices, verified per route: semantic landmarks, exactly one `h1` per page with no heading-level jumps, a skip link, visible focus rings in **both** themes, keyboard-operable accordion and mobile menu (Escape closes, focus is trapped and returned), labels on every form control, errors carried by text and icon rather than colour alone, and `prefers-reduced-motion` honoured globally.

Routing-specific behaviour:

- The active nav link is marked with `aria-current="page"` and styled with **both** a heavier weight and an underline, so it never depends on colour perception.
- After each navigation, focus moves to the new page's `<h1>` and the document title updates, so screen-reader users are told where they are.
- Browser back/forward keeps its native scroll restoration.

Two things to watch when editing:

- Keep using real `<button>` and `<a>`/`<Link>` elements — no clickable `<div>`s.
- If you hide a section's visible heading (`showHeading={false}`), it still renders as a screen-reader-only `<h2>` via `SectionHeading`'s `srOnly` prop. Removing it entirely would leave `<h3>`s sitting directly under the page `<h1>`, which is a heading-hierarchy failure.
