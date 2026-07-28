/**
 * The six takaful protection categories.
 *
 * Renders in two modes from the same data:
 *  - full (default, /services) — all six cards plus the mandatory disclaimer
 *  - preview (home page)       — the first `limit` cards plus a CTA
 */

import { Info } from 'lucide-react'
import { useLanguage } from '../../i18n/languageContextValue'
import { previews, sections } from '../../i18n/ui'
import { services } from '../../data/services'
import SectionHeading from '../common/SectionHeading'
import ServiceCard from '../common/ServiceCard'
import SectionCTA from '../common/SectionCTA'
import Reveal from '../common/Reveal'

export function Services({ preview = false, limit, showHeading = true, showDisclaimer = true }) {
  const { t } = useLanguage()
  const visible = typeof limit === 'number' ? services.slice(0, limit) : services

  return (
    <section id="services" className="section">
      <div className="container-page">
        <SectionHeading
            eyebrow={t(sections.services.eyebrow)}
            title={t(sections.services.heading)}
            intro={t(sections.services.intro)}
          srOnly={!showHeading}
        />

        <ul className={`grid gap-5 md:grid-cols-2 lg:grid-cols-3 ${showHeading ? 'mt-12' : ''}`}>
          {visible.map((service, index) => (
            <Reveal as="li" key={service.id} delay={Math.min(index, 3) * 0.06}>
              <ServiceCard service={service} compact={preview} />
            </Reveal>
          ))}
        </ul>

        {/* The disclaimer belongs with the full list, not the preview — the
            preview links straight through to the page that carries it. */}
        {showDisclaimer && !preview && (
          <div className="mt-10 flex items-start gap-3 rounded-2xl border border-border bg-surface p-5">
            <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-soft" />
            <p className="text-small text-muted">{t(sections.services.disclaimer)}</p>
          </div>
        )}

        {preview && <SectionCTA to="/services" label={t(previews.exploreAllServices)} />}
      </div>
    </section>
  )
}

export default Services
