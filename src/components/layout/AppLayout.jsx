import { Outlet, useLocation } from 'react-router-dom'
import { useLanguage } from '../../i18n/languageContextValue'
import { nav } from '../../i18n/ui'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import WhatsAppButton from '../common/WhatsAppButton'

/**
 * The shell every route renders inside: skip link, sticky navbar, the <main>
 * landmark, footer, and the single floating WhatsApp button.
 *
 * Keeping the button here (rather than per page) guarantees exactly one
 * instance across the whole site.
 *
 * The `key={pathname}` on the route container restarts the CSS entrance
 * animation on each navigation — a short fade and rise, disabled under
 * prefers-reduced-motion by index.css.
 */
export function AppLayout() {
  const { t } = useLanguage()
  const { pathname } = useLocation()

  return (
    <>
      <ScrollToTop />

      <a href="#main" className="skip-link">
        {t(nav.skipToContent)}
      </a>

      <Navbar />

      <main id="main">
        <div key={pathname} className="animate-route">
          <Outlet />
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default AppLayout
