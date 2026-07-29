import { useEffect, useRef, useState } from 'react'

/**
 * ============================================================================
 * ANIMATED STATISTIC
 * ============================================================================
 * One card in a statistics grid, in two flavours:
 *
 *   • numeric  — pass `value`; the figure counts up from 0 when `start` is true
 *   • text     — pass `text`; it simply fades in, with no counting
 *
 * Non-numeric facts ("Free", "Nationwide") must use the `text` form. Forcing
 * them through a counter would be meaningless.
 *
 * The parent owns the viewport trigger and passes `start`, so a grid of these
 * shares ONE IntersectionObserver rather than creating one per card.
 *
 * ACCESSIBILITY
 * A counting number would otherwise be announced on every frame. The visible
 * figure is therefore `aria-hidden`, and the meaning is carried by a single
 * static sentence (`ariaLabel`) in a visually hidden span. Rendered as
 * <dt>/<dd>, so it must be used inside a <dl>.
 *
 * REDUCED MOTION
 * When the visitor has asked for reduced motion the final value is shown
 * immediately, fully visible, with no transform — never a hidden or partial
 * state.
 * ============================================================================
 */

/** Fast at first, easing gently into the final value. */
const easeOutCubic = (progress) => 1 - Math.pow(1 - progress, 3)

function prefersReducedMotion() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

export function AnimatedStat({
  value,
  prefix = '',
  suffix = '',
  text,
  label,
  ariaLabel,
  duration = 1.6,
  delay = 0,
  decimals = 0,
  start = false,
}) {
  const isNumeric = typeof value === 'number' && Number.isFinite(value)
  const reduceMotion = prefersReducedMotion()

  // Reduced motion skips straight to the target; otherwise start from zero.
  const [display, setDisplay] = useState(() => (isNumeric && !reduceMotion ? 0 : value))
  const frameRef = useRef(0)

  useEffect(() => {
    if (!isNumeric || !start) return undefined

    if (reduceMotion) {
      setDisplay(value)
      return undefined
    }

    const durationMs = duration * 1000
    const delayMs = delay * 1000
    let startTime = null

    const update = (now) => {
      if (startTime === null) startTime = now

      const elapsed = now - startTime - delayMs

      // Still inside the stagger delay — hold at zero.
      if (elapsed < 0) {
        frameRef.current = window.requestAnimationFrame(update)
        return
      }

      const progress = Math.min(elapsed / durationMs, 1)

      if (progress >= 1) {
        // Land on the exact target — never 79.999.
        setDisplay(value)
        return
      }

      setDisplay(value * easeOutCubic(progress))
      frameRef.current = window.requestAnimationFrame(update)
    }

    frameRef.current = window.requestAnimationFrame(update)
    return () => window.cancelAnimationFrame(frameRef.current)
  }, [isNumeric, start, value, duration, delay, reduceMotion])

  const shown = isNumeric
    ? `${prefix}${Number(display).toFixed(decimals)}${suffix}`
    : `${prefix}${text ?? ''}${suffix}`

  // Entrance: opacity + transform only, so nothing reflows.
  const visible = reduceMotion || start
  const entrance = reduceMotion
    ? ''
    : `transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
      }`

  return (
    <div className="card !p-4 text-center sm:!p-5">
      {/* The term for this figure, for assistive technology. */}
      <dt className="sr-only">{label}</dt>
      <dd>
        {/* The one sentence a screen reader announces. */}
        <span className="sr-only">{ariaLabel ?? `${shown} ${label}`}</span>

        <span
          aria-hidden="true"
          className={`block text-2xl font-extrabold text-accent sm:text-3xl ${entrance}`}
          style={!reduceMotion && delay ? { transitionDelay: `${delay}s` } : undefined}
        >
          {shown}
        </span>

        <span
          aria-hidden="true"
          className={`mt-1 block text-xs text-muted ${entrance}`}
          style={
            !reduceMotion ? { transitionDelay: `${delay + 0.08}s` } : undefined
          }
        >
          {label}
        </span>
      </dd>
    </div>
  )
}

export default AnimatedStat
