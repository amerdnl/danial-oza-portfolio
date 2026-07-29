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
    const scrollX = window.scrollX
    const scrollY = window.scrollY
    const previousOverflow = body.style.overflow
    const previousPadding = body.style.paddingRight
    const previousPosition = body.style.position
    const previousTop = body.style.top
    const previousLeft = body.style.left
    const previousWidth = body.style.width
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    body.style.overflow = 'hidden'
    // `overflow: hidden` on <body> alone is unreliable in iOS Safari. Fixing
    // the body in place prevents background movement while the portalled menu
    // remains independently scrollable.
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = `-${scrollX}px`
    body.style.width = '100%'
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPadding
      body.style.position = previousPosition
      body.style.top = previousTop
      body.style.left = previousLeft
      body.style.width = previousWidth
      window.scrollTo(scrollX, scrollY)
    }
  }, [locked])
}

export default useLockBodyScroll
