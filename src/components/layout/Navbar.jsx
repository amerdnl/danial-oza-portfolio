import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CalendarCheck, Menu, X } from 'lucide-react'
import { useLanguage } from '../../i18n/languageContextValue'
import { nav } from '../../i18n/ui'
import { navItems } from '../../routes/navItems'
import { advisor } from '../../data/advisor'
import LanguageToggle from './LanguageToggle'
import MobileNav from './MobileNav'

/**
 * Sticky navigation.
 *
 * Transparent over the hero, gaining a solid background once scrolled so it
 * stays readable against both.
 *
 * The full horizontal bar appears at xl (1280px) rather than lg, because
 * below that the wordmark, seven links, language toggle, and CTA start to
 * crowd each other. Between 1024px and 1280px the mobile panel is used
 * instead.
 *
 * `NavLink` supplies aria-current="page" automatically; the active style in
 * index.css combines a heavier weight with an underline bar so the current
 * route is not signalled by colour alone.
 */
export function Navbar() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const nextScrolled = window.scrollY > 60
      setScrolled((current) => (current === nextScrolled ? current : nextScrolled))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the panel if the viewport grows past the breakpoint while it is
  // open, otherwise focus would be trapped in a hidden element.
  useEffect(() => {
    if (!menuOpen) return undefined
    const query = window.matchMedia('(min-width: 1280px)')
    const onChange = (event) => {
      if (event.matches) setMenuOpen(false)
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [menuOpen])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-colors duration-200 ${
        scrolled || menuOpen
          ? 'bg-overlay-strong border-b border-border xl:backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between gap-4">
        {/* Wordmark */}
        <Link
          to="/"
          className="flex min-w-0 flex-col leading-tight"
          aria-label={`${advisor.name} — ${t(advisor.title)}`}
        >
          <span className="truncate text-base font-extrabold tracking-tight text-heading sm:text-lg">
            {advisor.name}
          </span>
          <span className="text-brand-soft truncate text-[0.7rem] font-medium uppercase tracking-[0.18em]">
            {t(advisor.title)}
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav aria-label={t(nav.primaryNavigation)} className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} end={item.path === '/'} className="nav-link">
                  {t(item.label)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <LanguageToggle className="hidden sm:inline-flex" />

          <Link
            to="/contact"
            className="btn btn-primary hidden !min-h-10 !px-4 !text-sm xl:inline-flex"
          >
            <CalendarCheck aria-hidden="true" className="size-4" />
            <span>{t(nav.bookConsultation)}</span>
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls={menuOpen ? 'mobile-menu' : undefined}
            aria-label={menuOpen ? t(nav.closeMenu) : t(nav.openMenu)}
            className="inline-flex size-11 items-center justify-center rounded-lg border border-border text-heading transition-colors hover:bg-hover-tint xl:hidden"
          >
            {menuOpen ? (
              <X aria-hidden="true" className="size-6" />
            ) : (
              <Menu aria-hidden="true" className="size-6" />
            )}
          </button>
        </div>
      </div>

      <MobileNav
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        toggleRef={toggleRef}
        id="mobile-menu"
      />
    </header>
  )
}

export default Navbar
