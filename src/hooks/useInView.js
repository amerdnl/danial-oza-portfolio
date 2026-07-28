import { useEffect, useRef, useState } from 'react'

/**
 * Report when an element first scrolls into view.
 *
 * Used to trigger CSS entrance animations. Observing stops after the first
 * intersection, so there is no ongoing cost once an element has appeared.
 *
 * If IntersectionObserver is unavailable the element is treated as visible
 * immediately — content must never be stuck at opacity 0.
 */
export function useInView({ threshold = 0.15, rootMargin = '0px 0px -60px 0px' } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            observer.disconnect()
          }
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return [ref, inView]
}

export default useInView
