/**
 * English / Bahasa Melayu switch.
 *
 * Two real buttons in a labelled group rather than a select, so the current
 * language is announced through aria-pressed and both options stay visible.
 */

import { LANGUAGES, useLanguage } from '../../i18n/languageContextValue'
import { nav } from '../../i18n/ui'

export function LanguageToggle({ className = '' }) {
  const { lang, setLang, t } = useLanguage()

  return (
    <div
      role="group"
      aria-label={t(nav.languageLabel)}
      className={`inline-flex items-center rounded-full border border-border bg-overlay-soft p-0.5 ${className}`}
    >
      {LANGUAGES.map((language) => {
        const isActive = lang === language.code
        return (
          <button
            key={language.code}
            type="button"
            onClick={() => setLang(language.code)}
            aria-pressed={isActive}
            className={`min-h-9 rounded-full px-3 text-sm font-semibold transition-colors ${
              isActive
                ? // Sits on brand red in both themes, so the label must be
                  // on-accent white — not the heading colour, which is
                  // near-black in light mode.
                  'bg-brand text-on-accent'
                : 'text-muted hover:text-heading'
            }`}
          >
            {language.label}
            <span className="sr-only"> — {language.name}</span>
          </button>
        )
      })}
    </div>
  )
}

export default LanguageToggle
