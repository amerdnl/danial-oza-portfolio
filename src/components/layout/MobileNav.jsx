import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { CalendarCheck, X } from 'lucide-react'
import { useLanguage } from '../../i18n/languageContextValue'
import { nav } from '../../i18n/ui'
import { navItems } from '../../routes/navItems'
import useLockBodyScroll from '../../hooks/useLockBodyScroll'
import LanguageToggle from './LanguageToggle'

/**
 * Mobile navigation panel.
 *
 * Accessibility behaviour:
 *  - focus moves into the panel when it opens and returns to the toggle after
 *    a manual close; route selection leaves focus for the destination heading
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

  // Route selection must not restore focus to a toggle from the old page.
  // Closing here also handles selecting the route that is already active.
  const closeForNavigation = useCallback(() => {
    onClose()
  }, [onClose])

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

  // Move focus to the panel's own close control when it opens.
  useEffect(() => {
    if (!open) return
    const closeButton = panelRef.current?.querySelector('[data-mobile-menu-close]')
    closeButton?.focus()
  }, [open])

  if (!open) return null

  return createPortal(
    <div className="mobile-menu-layer fixed inset-x-0 top-20 xl:hidden">
      <button
        type="button"
        tabIndex={-1}
        aria-label={t(nav.closeMenu)}
        onClick={close}
        className="mobile-menu-backdrop absolute inset-0 z-[60] size-full cursor-default bg-black/20"
      />

      <div
        id={id}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t(nav.primaryNavigation)}
        className="mobile-menu-panel bg-overlay-strong absolute inset-x-0 top-0 z-[70] max-h-full overflow-y-auto overscroll-contain border-t border-border pb-[env(safe-area-inset-bottom)] shadow-lg shadow-black/10"
      >
        <div className="container-page flex justify-end pt-3">
          <button
            type="button"
            data-mobile-menu-close
            onClick={close}
            aria-label={t(nav.closeMenu)}
            className="inline-flex size-11 items-center justify-center rounded-lg border border-border text-heading transition-colors hover:bg-hover-tint"
          >
            <X aria-hidden="true" className="size-6" />
          </button>
        </div>

        <nav aria-label={t(nav.primaryNavigation)} className="container-page pb-4 pt-1">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  onClick={closeForNavigation}
                  className="nav-link-mobile"
                >
                  {t(item.label)}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-col gap-4 border-t border-border pt-4">
            <LanguageToggle className="self-start" />

            <Link
              to="/contact"
              onClick={closeForNavigation}
              className="btn btn-primary btn-block"
            >
              <CalendarCheck aria-hidden="true" className="size-4" />
              <span>{t(nav.bookConsultation)}</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>,
    document.body,
  )
}

export default MobileNav
