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
 * Intended time from the earliest static-loader timestamp until the exit
 * begins. Slow startup uses the minimum handoff below instead of adding a
 * fresh 2s delay after React mounts.
 */
export const LOADING_DURATION_MS = 2000

/**
 * The static HTML bar runs for 2.8s and stops at 92%. Keep these values in
 * sync with the critical keyframes in index.html so React can continue from
 * approximately the same visual position.
 */
const STATIC_LOADER_DURATION_MS = 2800
const STATIC_LOADER_MAX_PROGRESS = 92

/**
 * If React starts after the intended 2s loading window, leave enough time for
 * a visible handoff and completion rather than making the overlay disappear
 * on the same frame that it mounts.
 */
export const MINIMUM_REACT_HANDOFF_MS = 350

/** Let 100% remain visible briefly before the exit begins. */
const PROGRESS_COMPLETE_LEAD_MS = 120

/** Fade-out of the loader, after which the portfolio is fully interactive. */
export const EXIT_DURATION_MS = 700

/**
 * Reduced motion completes progress immediately and uses a shorter exit while
 * preserving the same elapsed-time-aware automatic entry.
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

/** Time elapsed since the earliest loader timestamp written in index.html. */
function getLoaderElapsed() {
  if (typeof window === 'undefined') return 0

  const startedAt = window.__DANIAL_LOADER_STARTED_AT__
  if (!Number.isFinite(startedAt)) return 0

  return Math.max(0, performance.now() - startedAt)
}

/**
 * Match the static loader's ease-out curve and 92% ceiling. The CSS keyframes
 * approximate this same curve from below, so the React handoff never jumps
 * visibly backwards.
 */
function getStaticHandoffProgress() {
  const fraction = Math.min(getLoaderElapsed() / STATIC_LOADER_DURATION_MS, 1)
  return Math.floor(easeOutQuad(fraction) * STATIC_LOADER_MAX_PROGRESS)
}

export function useIntroExperience() {
  const reduceMotion = typeof window === 'undefined' ? false : prefersReducedMotion()

  // `complete` immediately for anyone who has already seen the loader this
  // session, so there is no flash on internal refreshes.
  const [state, setState] = useState(() =>
    typeof window === 'undefined' || hasSeenIntro() ? 'complete' : 'loading',
  )
  const [progress, setProgress] = useState(() =>
    state === 'complete' || reduceMotion ? 100 : getStaticHandoffProgress(),
  )

  const frameRef = useRef(0)
  const timerRef = useRef(0)

  /* ------------------------------------------------------------ loading --- */
  useEffect(() => {
    if (state !== 'loading') return undefined

    let cancelled = false
    const started = performance.now()
    const elapsedBeforeReact = getLoaderElapsed()
    const remainingDuration = Math.max(
      MINIMUM_REACT_HANDOFF_MS,
      LOADING_DURATION_MS - elapsedBeforeReact,
    )
    const progressDuration = Math.max(
      100,
      remainingDuration - PROGRESS_COMPLETE_LEAD_MS,
    )
    const startingProgress = getStaticHandoffProgress()

    // Continue from the static CSS bar. Reduced motion completes immediately;
    // the timer below still guarantees a calm, automatic handoff.
    if (reduceMotion) {
      setProgress(100)
    } else {
      setProgress((current) => Math.max(current, startingProgress))

      const tick = (now) => {
        if (cancelled) return

        const elapsed = now - started
        const fraction = Math.min(elapsed / progressDuration, 1)

        if (fraction >= 1) {
          setProgress(100) // land on exactly 100, then rest
          return
        }

        const next =
          startingProgress + (100 - startingProgress) * easeOutQuad(fraction)

        // Monotonic: the React-controlled bar can never move behind the static
        // position that it replaced.
        setProgress((current) => Math.max(current, Math.floor(next)))
        frameRef.current = window.requestAnimationFrame(tick)
      }

      frameRef.current = window.requestAnimationFrame(tick)
    }

    // Count the time already spent in the static HTML loader. On a fast load,
    // the original 2s duration is preserved; on a slow load, only the minimum
    // React handoff is added.
    timerRef.current = window.setTimeout(() => {
      if (cancelled) return
      markIntroSeen()
      setState('exiting')
    }, remainingDuration)

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
