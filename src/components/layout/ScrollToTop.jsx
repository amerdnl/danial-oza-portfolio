import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

/**
 * Scroll and focus management on route change.
 *
 * Three things matter here:
 *
 * 1. POP navigations (browser back / forward) are left alone. The browser
 *    restores the previous scroll position itself, and forcing the page to
 *    the top would throw away that position — the most common way SPAs break
 *    the back button.
 *
 * 2. Focus moves to the new page's <h1>, so screen-reader and keyboard users
 *    land at the start of the new content instead of staying wherever the
 *    old page left them. The heading is given tabindex="-1" by PageHeader,
 *    and index.css suppresses the focus ring on it since it is not a control.
 *
 * 3. Motion preference is honoured — smooth scrolling only when the visitor
 *    has not asked for reduced motion.
 */
export function ScrollToTop() {
  const { pathname } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    if (navigationType === 'POP') return

    let prefersReducedMotion = false
    try {
      prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    } catch {
      prefersReducedMotion = false
    }

    window.scrollTo({ top: 0, left: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })

    // Wait for the new route to paint before moving focus.
    const frame = window.requestAnimationFrame(() => {
      const heading = document.querySelector('main h1')
      if (heading) {
        heading.focus({ preventScroll: true })
      }
    })

    return () => window.cancelAnimationFrame(frame)
  }, [pathname, navigationType])

  return null
}

export default ScrollToTop
