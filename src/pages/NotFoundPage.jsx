/**
 * 404.
 *
 * Marked noindex so search engines do not index missing URLs, and the
 * heading receives focus on arrival like every other page.
 */

import { Link } from 'react-router-dom'
import { Home, MessageCircle } from 'lucide-react'
import { useLanguage } from '../i18n/languageContextValue'
import { notFound } from '../i18n/ui'
import useDocumentMeta from '../hooks/useDocumentMeta'

export function NotFoundPage() {
  const { t } = useLanguage()
  useDocumentMeta('notFound', { noIndex: true })

  return (
    <section className="section">
      <div className="container-page">
        <div className="mx-auto max-w-xl py-10 text-center sm:py-16">
          <p aria-hidden="true" className="text-brand-soft text-6xl font-extrabold sm:text-7xl">
            {t(notFound.code)}
          </p>

          <h1 tabIndex={-1} className="text-h2 mt-4">
            {t(notFound.heading)}
          </h1>

          <p className="text-lead mt-4 text-muted">{t(notFound.body)}</p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/" className="btn btn-primary">
              <Home aria-hidden="true" className="size-5" />
              <span>{t(notFound.backHome)}</span>
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              <MessageCircle aria-hidden="true" className="size-5" />
              <span>{t(notFound.contactDanial)}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NotFoundPage
