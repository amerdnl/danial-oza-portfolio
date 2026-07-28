import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/themeContextValue'
import { useLanguage } from '../../i18n/languageContextValue'
import { theme as themeStrings } from '../../i18n/ui'

/**
 * Light / dark switch.
 *
 * A native <button>. The icon and the accessible label both describe what
 * pressing it will DO, not the current state: in dark mode it shows a sun and
 * says "Switch to light mode".
 */
export function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme()
  const { t } = useLanguage()

  const label = isDark ? t(themeStrings.switchToLight) : t(themeStrings.switchToDark)

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`inline-flex size-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:bg-hover-tint hover:text-heading ${className}`}
    >
      {isDark ? (
        <Sun aria-hidden="true" className="size-[1.15rem]" />
      ) : (
        <Moon aria-hidden="true" className="size-[1.15rem]" />
      )}
    </button>
  )
}

export default ThemeToggle
