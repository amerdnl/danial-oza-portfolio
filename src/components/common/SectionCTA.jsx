import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

/**
 * The "see the full page" link that closes each home-page preview section.
 *
 * An internal route, so it uses React Router's Link — no page reload.
 */
export function SectionCTA({ to, label, variant = 'secondary', className = '' }) {
  return (
    <div className={`mt-10 flex justify-center ${className}`}>
      <Link to={to} className={`btn btn-${variant}`}>
        <span>{label}</span>
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </div>
  )
}

export default SectionCTA
