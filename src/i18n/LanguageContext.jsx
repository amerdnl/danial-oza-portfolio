import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  DEFAULT_LANG,
  LanguageContext,
  STORAGE_KEY,
} from './languageContextValue'

/**
 * Bilingual layer (English / Bahasa Melayu).
 *
 * Every piece of user-facing content in `src/data` and `src/i18n/ui.js` is
 * stored as an object shaped `{ en: '...', ms: '...' }`. The `t()` helper
 * returned by `useLanguage()` resolves one of those objects to a plain string
 * using the currently selected language.
 *
 * Deliberately dependency-free — a full i18n library would add weight without
 * adding anything this site needs.
 *
 * `LANGUAGES` and the `useLanguage` hook are re-exported from
 * `./languageContextValue` for convenience.
 */

function readStoredLang() {
  // localStorage can throw in private-browsing modes, so never let it break render.
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'ms') return stored
  } catch {
    /* ignore — fall through to the default */
  }
  return DEFAULT_LANG
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readStoredLang)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore — language still applies for this session */
    }

    // Keep the document in sync so screen readers announce the correct
    // pronunciation and search engines see the right language.
    //
    // Title and description are NOT set here — they are per-route and owned
    // by useDocumentMeta (src/hooks/useDocumentMeta.js), which also reacts to
    // language changes. Setting them in both places would race.
    document.documentElement.lang = lang === 'ms' ? 'ms-MY' : 'en-MY'
  }, [lang])

  /**
   * Resolve a bilingual value.
   * Accepts `{ en, ms }` objects, plain strings (returned as-is), and
   * nullish values (returned as an empty string) so callers never crash.
   */
  const t = useCallback(
    (value) => {
      if (value == null) return ''
      if (typeof value === 'string') return value
      return value[lang] ?? value.en ?? ''
    },
    [lang],
  )

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export default LanguageProvider
