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
 * 3. Route scrolling is immediate rather than animated. This is predictable
 *    on iOS Safari and inherently respects reduced-motion preferences.
 */
export function ScrollToTop() {
  const location = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    if (navigationType === 'POP') return

    let focusFrame

    // Waiting one frame lets the destination render and, on mobile, lets the
    // menu's body-lock cleanup restore its saved position before this scroll
    // deliberately replaces it with the destination's top position.
    const scrollFrame = window.requestAnimationFrame(() => {
      const root = document.documentElement
      const previousScrollBehavior = root.style.scrollBehavior

      // Route changes should be immediate and deterministic. Temporarily
      // override the global smooth-scroll rule so iOS Safari cannot leave a
      // route between positions while the mobile overlay is closing.
      root.style.scrollBehavior = 'auto'
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      root.style.scrollBehavior = previousScrollBehavior

      // Focus after a second paint so the new page heading exists and cannot
      // trigger a competing browser scroll.
      focusFrame = window.requestAnimationFrame(() => {
        const target = document.querySelector('main h1') ?? document.getElementById('main')
        target?.focus({ preventScroll: true })
      })
    })

    return () => {
      window.cancelAnimationFrame(scrollFrame)
      if (focusFrame) window.cancelAnimationFrame(focusFrame)
    }
  }, [location.key, navigationType])

  return null
}

export default ScrollToTop
