import { createContext, useContext } from 'react'

/**
 * The context object and its hook live here, separate from the provider
 * component, so `LanguageContext.jsx` exports only a component and React Fast
 * Refresh keeps working during development.
 */

export const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ms', label: 'BM', name: 'Bahasa Melayu' },
]

export const STORAGE_KEY = 'danialoza.lang'
export const DEFAULT_LANG = 'en'

export const LanguageContext = createContext(null)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used inside a <LanguageProvider>')
  }
  return context
}
