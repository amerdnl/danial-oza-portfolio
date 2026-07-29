import { useEffect } from 'react'
import useLockBodyScroll from '../../hooks/useLockBodyScroll'
import LoadingScreen from './LoadingScreen'

/**
 * The full-screen loading overlay.
 *
 * Sits above the portfolio rather than replacing it: the app stays mounted
 * underneath so its content remains crawlable and the hero image finishes
 * loading while the loader is on screen. App.jsx marks that content `inert`
 * for as long as this overlay is blocking.
 *
 * There is no interaction here — no entry control, no click handler, no key
 * listener. The overlay dismisses itself on a timer.
 *
 * Deliberately dark in both light and dark themes, using the locked brand
 * palette directly rather than theme tokens, so the opening always looks the
 * same. Nothing here reads or writes the visitor's theme preference.
 */
export function IntroExperience({ state, progress, isBlocking }) {
  useLockBodyScroll(isBlocking)

  /**
   * Move focus into the page once the loader is gone.
   *
   * Targets the same element ScrollToTop uses on route changes, so the two
   * behave consistently. `preventScroll` keeps the reveal from jumping.
   */
  useEffect(() => {
    if (state !== 'complete') return undefined

    const frame = window.requestAnimationFrame(() => {
      const target = document.querySelector('main h1') ?? document.getElementById('main')
      target?.focus?.({ preventScroll: true })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [state])

  if (!isBlocking) return null

  const exiting = state === 'exiting'

  return (
    <div
      className={`intro-overlay fixed inset-0 z-[999] flex items-center justify-center overflow-hidden transition-opacity duration-700 ${
        exiting ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      {/* Soft red bloom — decorative only. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[42rem] max-w-[140vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#950101] opacity-[0.16] blur-[130px]"
      />

      <div className="relative flex w-full items-center justify-center">
        <LoadingScreen progress={progress} />
      </div>
    </div>
  )
}

export default IntroExperience
