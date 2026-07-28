/**
 * Consultation process.
 *
 * A CSS-only timeline: a vertical connector line on desktop, stacked cards
 * on mobile. No animation library needed for the connector.
 */

import { useLanguage } from '../../i18n/languageContextValue'
import { previews, sections } from '../../i18n/ui'
import { processSteps } from '../../data/process'
import SectionHeading from '../common/SectionHeading'
import SectionCTA from '../common/SectionCTA'
import Reveal from '../common/Reveal'
import Icon from '../common/Icon'

export function Process({ preview = false, showHeading = true }) {
  const { t } = useLanguage()

  return (
    <section id="process" className="section">
      <div className="container-page">
        <SectionHeading
            eyebrow={t(sections.process.eyebrow)}
            title={t(sections.process.heading)}
            intro={t(sections.process.intro)}
          srOnly={!showHeading}
        />

        <ol className="relative mt-12 flex flex-col gap-5 md:mt-16 md:gap-0">
          {/* Connector line — decorative, desktop only */}
          <div
            aria-hidden="true"
            className="absolute left-[1.4375rem] top-4 hidden h-[calc(100%-2rem)] w-px bg-border md:block"
          />

          {processSteps.map((step, index) => (
            <Reveal as="li" key={step.id} delay={Math.min(index, 4) * 0.06} className="relative md:pb-10">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
                {/* Number badge */}
                <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-brand bg-surface text-lg font-extrabold text-brand-soft">
                  {index + 1}
                </div>

                <div className="card flex-1 md:mt-0">
                  <div className="flex items-center gap-3">
                    <Icon name={step.icon} className="size-5 shrink-0 text-brand-soft" />
                    <h3 className="text-h3">
                      <span className="sr-only">
                        {t(sections.process.stepLabel)} {index + 1}:{' '}
                      </span>
                      {t(step.title)}
                    </h3>
                  </div>
                  <p className="text-small mt-3 text-muted">
                    {t(step.description)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        {preview && <SectionCTA to="/about" label={t(previews.seeFullProcess)} />}
      </div>
    </section>
  )
}

export default Process
