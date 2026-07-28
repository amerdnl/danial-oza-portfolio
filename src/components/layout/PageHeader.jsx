import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { useLanguage } from '../../i18n/languageContextValue'
import { nav } from '../../i18n/ui'

/**
 * Header for every non-home page: breadcrumb, title, and description.
 *
 * The <h1> carries tabIndex={-1} because ScrollToTop moves focus here after
 * each navigation. index.css suppresses its focus ring — it is a focus
 * target, not an interactive control.
 */
export function PageHeader({ title, intro, children }) {
  const { t } = useLanguage()

  return (
    <header className="border-b border-border bg-section">
      <div className="container-page py-12 sm:py-16">
        {/* Breadcrumb */}
        <nav aria-label={t(nav.breadcrumb)} className="mb-5">
          <ol className="flex items-center gap-1.5 text-sm text-muted">
            <li>
              <Link to="/" className="transition-colors hover:text-heading">
                {t(nav.home)}
              </Link>
            </li>
            <li aria-hidden="true" className="flex items-center">
              <ChevronRight className="size-4" />
            </li>
            <li className="font-medium text-heading" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>

        <h1 tabIndex={-1} className="text-h2 max-w-3xl">
          {title}
        </h1>

        {intro && <p className="text-lead mt-4 max-w-2xl text-muted">{intro}</p>}

        {children && <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{children}</div>}
      </div>
    </header>
  )
}

export default PageHeader
