/**
 * Scroll reveal wrapper.
 *
 * A fade-and-rise on first scroll into view, driven by CSS rather than an
 * animation library — the effect is small enough that CSS handles it, and
 * this keeps roughly 90 kB (gzipped) out of the bundle.
 *
 * Reduced motion is handled in index.css, which collapses the animation
 * duration to zero, so content still appears instantly.
 */

import useInView from '../../hooks/useInView'

export function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const [ref, inView] = useInView()

  return (
    <Tag
      ref={ref}
      className={`${className} transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  )
}

export default Reveal
