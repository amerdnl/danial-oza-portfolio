/**
 * "Protection for Different Stages of Life".
 *
 * Each card describes what someone in this situation may want to review —
 * never that they need a particular product.
 */

import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../../i18n/languageContextValue'
import { cta, previews, sections } from '../../i18n/ui'
import { clientTypes } from '../../data/clientTypes'
import { servicesById } from '../../data/services'
import SectionHeading from '../common/SectionHeading'
import SectionCTA from '../common/SectionCTA'
import Reveal from '../common/Reveal'
import Icon from '../common/Icon'

export function ClientTypes({ preview = false, limit, showHeading = true }) {
  const { t } = useLanguage()
  const visible = typeof limit === 'number' ? clientTypes.slice(0, limit) : clientTypes

  return (
    <section id="clients" className="section section-alt">
      <div className="container-page">
        <SectionHeading
            eyebrow={t(sections.clientTypes.eyebrow)}
            title={t(sections.clientTypes.heading)}
            intro={t(sections.clientTypes.intro)}
          srOnly={!showHeading}
        />

        <ul
          className={`grid gap-5 md:grid-cols-2 lg:grid-cols-3 ${showHeading ? 'mt-12' : ''}`}
        >
          {visible.map((type, index) => (
            <Reveal as="li" key={type.id} delay={Math.min(index, 3) * 0.06}>
              <article className="card card-hover flex h-full flex-col !bg-overlay-soft">
                <Icon name={type.icon} className="size-7 text-brand-soft" />
                <h3 className="mt-4 text-h3">{t(type.title)}</h3>
                <p className="text-small mt-2 text-muted">{t(type.description)}</p>

                <div className="mt-5 flex flex-col gap-4">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
                      {t(sections.clientTypes.responsibilities)}
                    </h4>
                    <ul className="mt-2 flex flex-col gap-1">
                      {type.responsibilities.map((entry) => (
                        <li key={entry.en} className="text-sm text-body">
                          {t(entry)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
                      {t(sections.clientTypes.concerns)}
                    </h4>
                    <ul className="mt-2 flex flex-col gap-1">
                      {type.concerns.map((entry) => (
                        <li key={entry.en} className="text-sm text-body">
                          {t(entry)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
                      {t(sections.clientTypes.mayReview)}
                    </h4>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {type.mayReview.map((serviceId) => {
                        const service = servicesById[serviceId]
                        if (!service) return null
                        return (
                          <li key={serviceId} className="chip !text-xs">
                            {t(service.title)}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>

                <Link
                  to="/recommendation"
                  className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-6 text-sm font-semibold text-heading transition-colors hover:text-brand-soft"
                >
                  {t(cta.startQuestionnaire)}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </article>
            </Reveal>
          ))}
        </ul>

        <p className="text-small mt-8 text-center text-muted">
          {t({
            en: 'These are general starting points only. What is suitable depends on your individual circumstances, affordability, and eligibility.',
            ms: 'Ini adalah titik permulaan umum sahaja. Apa yang sesuai bergantung pada keadaan individu, kemampuan, dan kelayakan anda.',
          })}
        </p>

        {preview && <SectionCTA to="/about" label={t(previews.seeWhoIWorkWith)} />}
      </div>
    </section>
  )
}

export default ClientTypes
