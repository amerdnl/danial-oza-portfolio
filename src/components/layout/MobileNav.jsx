import { useCallback, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { CalendarCheck } from 'lucide-react'
import { useLanguage } from '../../i18n/languageContextValue'
import { nav } from '../../i18n/ui'
import { navItems } from '../../routes/navItems'
import useLockBodyScroll from '../../hooks/useLockBodyScroll'
import LanguageToggle from './LanguageToggle'

/**
 * Mobile navigation panel.
 *
 * Accessibility behaviour:
 *  - focus moves into the panel when it opens and returns to the toggle when
 *    it closes
 *  - Tab cycles within the panel while open
 *  - Escape closes it
 *  - body scroll is locked while it is open
 *  - it closes automatically on route change, so choosing a link dismisses it
 */
export function MobileNav({ open, onClose, toggleRef, id = 'mobile-menu' }) {
  const { t } = useLanguage()
  const panelRef = useRef(null)
  const { pathname } = useLocation()

  useLockBodyScroll(open)

  const close = useCallback(() => {
    onClose()
    toggleRef?.current?.focus()
  }, [onClose, toggleRef])

  // Close whenever the route changes — covers every link in the panel.
  useEffect(() => {
    if (open) onClose()
    // Intentionally keyed on pathname only: this should run on navigation,
    // not when `open` itself changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Escape to close; Tab cycles inside the panel.
  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
        return
      }
      if (event.key !== 'Tab') return

      const focusable = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea',
      )
      if (!focusable || focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, close])

  // Move focus into the panel when it opens.
  useEffect(() => {
    if (!open) return
    const firstLink = panelRef.current?.querySelector('a[href]')
    firstLink?.focus()
  }, [open])

  return (
    <div
      id={id}
      ref={panelRef}
      hidden={!open}
      className="bg-overlay-strong border-t border-border backdrop-blur-md xl:hidden"
    >
      <nav aria-label={t(nav.primaryNavigation)} className="container-page py-4">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink to={item.path} end={item.path === '/'} className="nav-link-mobile">
                {t(item.label)}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-col gap-4 border-t border-border pt-4">
          <LanguageToggle className="self-start" />

          <Link to="/contact" className="btn btn-primary btn-block">
            <CalendarCheck aria-hidden="true" className="size-4" />
            <span>{t(nav.bookConsultation)}</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default MobileNav
