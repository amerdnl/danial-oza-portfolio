import { useEffect } from 'react'

/**
 * Prevent the page behind a mobile menu or overlay from scrolling.
 *
 * The scrollbar width is compensated with padding so the layout does not
 * jump sideways when the scrollbar disappears on desktop.
 */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return undefined

    const { body } = document
    const previousOverflow = body.style.overflow
    const previousPadding = body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPadding
    }
  }, [locked])
}

export default useLockBodyScroll
