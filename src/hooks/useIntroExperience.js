import { useEffect, useRef, useState } from 'react'

/**
 * ============================================================================
 * INTRO EXPERIENCE — STATE MACHINE
 * ============================================================================
 * A brief branded loading screen that reveals the portfolio on its own:
 *
 *     loading → exiting → complete
 *
 * No interaction is required, or possible — there is no entry control, no
 * click handler, and no key listener. The sequence is entirely time-driven.
 *
 * A single `state` string is the source of truth, so the phases cannot
 * contradict one another.
 *
 * Shown once per browser session. The flag lives in sessionStorage (not
 * localStorage) so a new session shows it again, and it is written the moment
 * the loading period ends.
 *
 * ⚠️ TIMING IS DRIVEN BY JS TIMERS, NEVER BY transitionend/animationend.
 *    index.css collapses every transition to 0.001ms under
 *    prefers-reduced-motion, so relying on those events could strand a
 *    reduced-motion visitor on the loading screen. CSS draws; JS decides when
 *    to move on.
 * ============================================================================
 */

export const INTRO_STORAGE_KEY = 'danial-oza-intro-seen'

/**
 * How long the loading screen stays visible before the exit begins.
 * This is the single place the duration is defined.
 */
export const LOADING_DURATION_MS = 2000

/**
 * Progress reaches 100 a little before the loader ends, so the completed
 * state is readable rather than flashing past as the screen fades.
 */
export const PROGRESS_DURATION_MS = 1800

/** Fade-out of the loader, after which the portfolio is fully interactive. */
export const EXIT_DURATION_MS = 700

/**
 * Reduced motion keeps the same 2000ms loading period — only the movement is
 * removed — but leaves the screen quickly once it is done.
 */
export const REDUCED_EXIT_DURATION_MS = 150

/** Read the session flag without letting a blocked storage break the app. */
export function hasSeenIntro() {
  try {
    return window.sessionStorage.getItem(INTRO_STORAGE_KEY) === 'true'
  } catch {
    // Private mode / storage disabled — just show the intro again.
    return false
  }
}

/** Write the session flag. Never throws. */
export function markIntroSeen() {
  try {
    window.sessionStorage.setItem(INTRO_STORAGE_KEY, 'true')
  } catch {
    // Continue without persistence; the loader will show next load.
  }
}

function prefersReducedMotion() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

/**
 * Fast at first, easing into the target.
 *
 * Deliberately a quadratic rather than a steeper curve: with a steep ease the
 * final stretch is so flat that the rounded counter would sit on its last
 * value for a noticeable stretch before the end.
 */
const easeOutQuad = (progress) => 1 - Math.pow(1 - progress, 2)

export function useIntroExperience() {
  // `complete` immediately for anyone who has already seen the loader this
  // session, so there is no flash on internal refreshes.
  const [state, setState] = useState(() =>
    typeof window === 'undefined' || hasSeenIntro() ? 'complete' : 'loading',
  )
  const [progress, setProgress] = useState(0)

  const reduceMotion = typeof window === 'undefined' ? false : prefersReducedMotion()

  const frameRef = useRef(0)
  const timerRef = useRef(0)

  /* ------------------------------------------------------------ loading --- */
  useEffect(() => {
    if (state !== 'loading') return undefined

    let cancelled = false
    const started = performance.now()

    // Animate the counter. Reduced motion skips the animation and shows the
    // finished value for the whole period instead.
    if (reduceMotion) {
      setProgress(100)
    } else {
      const tick = (now) => {
        if (cancelled) return

        const elapsed = now - started
        const fraction = Math.min(elapsed / PROGRESS_DURATION_MS, 1)

        if (fraction >= 1) {
          setProgress(100) // land on exactly 100, then rest
          return
        }

        // Floor rather than round, so 100 is reached only when the animation
        // genuinely finishes at PROGRESS_DURATION_MS — rounding would display
        // 100 several hundred milliseconds early.
        // Monotonic: never let the displayed value go backwards.
        setProgress((current) => Math.max(current, Math.floor(easeOutQuad(fraction) * 100)))
        frameRef.current = window.requestAnimationFrame(tick)
      }

      frameRef.current = window.requestAnimationFrame(tick)
    }

    // The loader always lasts exactly LOADING_DURATION_MS, independent of the
    // progress animation, so the visible duration is predictable.
    timerRef.current = window.setTimeout(() => {
      if (cancelled) return
      markIntroSeen()
      setState('exiting')
    }, LOADING_DURATION_MS)

    return () => {
      cancelled = true
      window.cancelAnimationFrame(frameRef.current)
      window.clearTimeout(timerRef.current)
    }
  }, [state, reduceMotion])

  /* ------------------------------------------------------------ exiting --- */
  useEffect(() => {
    if (state !== 'exiting') return undefined

    const duration = reduceMotion ? REDUCED_EXIT_DURATION_MS : EXIT_DURATION_MS
    timerRef.current = window.setTimeout(() => setState('complete'), duration)
    return () => window.clearTimeout(timerRef.current)
  }, [state, reduceMotion])

  return {
    state,
    progress,
    /** True while the loader is covering the portfolio. */
    isBlocking: state !== 'complete',
  }
}

export default useIntroExperience
