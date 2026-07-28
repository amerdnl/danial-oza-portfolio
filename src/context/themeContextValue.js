import { createContext, useContext } from 'react'

/**
 * The theme context object and its hook live here, separate from the provider
 * component, so `ThemeContext.jsx` exports only a component and React Fast
 * Refresh keeps working during development. (Same split as
 * `src/i18n/languageContextValue.js`.)
 */

export const THEMES = ['light', 'dark']

/** Must match the key read by the anti-flash script in index.html. */
export const THEME_STORAGE_KEY = 'danial-oza-theme'

/** Used when there is no saved preference and no system preference. */
export const DEFAULT_THEME = 'dark'

export const ThemeContext = createContext(null)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used inside a <ThemeProvider>')
  }
  return context
}

/**
 * Resolve the theme to use on first render.
 *
 * Order: saved preference → system preference → dark.
 *
 * The inline script in index.html runs this same logic before first paint;
 * this function keeps React's state in agreement with what that script
 * already applied to <html>.
 */
export function resolveInitialTheme() {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (THEMES.includes(stored)) return stored
  } catch {
    /* localStorage can throw in private-browsing modes — fall through */
  }

  try {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light'
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  } catch {
    /* matchMedia unavailable — fall through */
  }

  return DEFAULT_THEME
}
