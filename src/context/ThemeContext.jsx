import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  THEME_STORAGE_KEY,
  ThemeContext,
  resolveInitialTheme,
} from './themeContextValue'

/**
 * Light / dark theme.
 *
 * The actual colours live in `src/index.css`, keyed off `data-theme` on
 * <html>. This provider's only job is to decide which value that attribute
 * holds and to remember the visitor's choice.
 *
 * Only the theme preference is persisted — nothing else is stored.
 */
export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(resolveInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)

    // Keep the browser UI (mobile address bar) in step with the page.
    const themeColor = document.querySelector('meta[name="theme-color"]')
    if (themeColor) {
      themeColor.setAttribute('content', theme === 'light' ? '#FFF9F9' : '#000000')
    }

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      /* ignore — the theme still applies for this session */
    }
  }, [theme])

  /**
   * Follow the system preference while the visitor has not made an explicit
   * choice. Once they use the toggle, a stored preference exists and this
   * listener stops overriding it.
   */
  useEffect(() => {
    let query
    try {
      query = window.matchMedia('(prefers-color-scheme: light)')
    } catch {
      return undefined
    }

    const onChange = (event) => {
      let hasStoredPreference = false
      try {
        hasStoredPreference = Boolean(window.localStorage.getItem(THEME_STORAGE_KEY))
      } catch {
        hasStoredPreference = false
      }
      if (!hasStoredPreference) {
        setThemeState(event.matches ? 'light' : 'dark')
      }
    }

    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const setTheme = useCallback((next) => {
    setThemeState(next === 'light' ? 'light' : 'dark')
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((current) => (current === 'light' ? 'dark' : 'light'))
  }, [])

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme, isDark: theme === 'dark' }),
    [theme, setTheme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
