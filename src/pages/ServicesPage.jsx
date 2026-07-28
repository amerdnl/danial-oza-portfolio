/**
 * Services — all six takaful protection categories in full, each with its
 * considerations, WhatsApp enquiry link, and the section disclaimer.
 */

import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { useLanguage } from '../i18n/languageContextValue'
import { cta, previews, routeMeta } from '../i18n/ui'
import useDocumentMeta from '../hooks/useDocumentMeta'
import PageHeader from '../components/layout/PageHeader'
import Services from '../components/sections/Services'

export function ServicesPage() {
  const { t } = useLanguage()
  useDocumentMeta('services')

  return (
    <>
      <PageHeader title={t(routeMeta.services.heading)} intro={t(routeMeta.services.intro)}>
        <Link to="/recommendation" className="btn btn-primary">
          <Sparkles aria-hidden="true" className="size-5" />
          <span>{t(cta.getRecommendation)}</span>
        </Link>
      </PageHeader>

      <Services showHeading={false} />

      <section className="section section-alt">
        <div className="container-page">
          <div className="card card-on-alt mx-auto max-w-2xl text-center">
            <h2 className="text-h3">
              {t(previews.recommendationTeaser.heading)}
            </h2>
            <p className="text-small mt-3 text-muted">
              {t({
                en: 'The questionnaire suggests which of these areas may be worth discussing first, based on your circumstances and budget.',
                ms: 'Soal selidik ini mencadangkan bidang mana antaranya yang mungkin wajar dibincangkan dahulu, berdasarkan keadaan dan bajet anda.',
              })}
            </p>
            <Link to="/recommendation" className="btn btn-primary mt-6">
              <Sparkles aria-hidden="true" className="size-5" />
              <span>{t(previews.getYourRecommendation)}</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default ServicesPage
