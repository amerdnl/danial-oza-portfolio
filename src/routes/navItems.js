import { nav } from '../i18n/ui'

/**
 * The single source of truth for site navigation.
 *
 * Consumed by the navbar, the mobile menu, and the footer, so a route only
 * has to be added in one place.
 *
 * - `path`  the route, matching src/routes/AppRoutes.jsx
 * - `label` bilingual link text from src/i18n/ui.js
 * - `key`   looks up the page's metadata in `routeMeta` (also in ui.js)
 *
 * TO ADD A PAGE: add an entry here, create the page component in src/pages/,
 * register it in AppRoutes.jsx, and add a matching `routeMeta` entry.
 */
export const navItems = [
  { path: '/', label: nav.home, key: 'home' },
  { path: '/about', label: nav.about, key: 'about' },
  { path: '/services', label: nav.services, key: 'services' },
  { path: '/recommendation', label: nav.recommendation, key: 'recommendation' },
  { path: '/achievements', label: nav.achievements, key: 'achievements' },
  { path: '/faq', label: nav.faq, key: 'faq' },
  { path: '/contact', label: nav.contact, key: 'contact' },
]

/** Convenience map for looking up a route path by key. */
export const routePaths = Object.fromEntries(navItems.map((item) => [item.key, item.path]))

export default navItems
