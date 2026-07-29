/** "Why Choose Danial" — how he works, described without guarantees. */

import { useLanguage } from '../../i18n/languageContextValue'
import { previews, sections } from '../../i18n/ui'
import { whyChooseMe } from '../../data/whyChooseMe'
import SectionHeading from '../common/SectionHeading'
import SectionCTA from '../common/SectionCTA'
import Reveal from '../common/Reveal'
import Icon from '../common/Icon'

export function WhyChooseMe({ preview = false, limit, showHeading = true }) {
  const { t } = useLanguage()
  const visible = typeof limit === 'number' ? whyChooseMe.slice(0, limit) : whyChooseMe

  return (
    <section className="section section-alt">
      <div className="container-page">
        <SectionHeading
            eyebrow={t(sections.whyChoose.eyebrow)}
            title={t(sections.whyChoose.heading)}
            intro={t(sections.whyChoose.intro)}
          srOnly={!showHeading}
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((point, index) => (
            <Reveal as="li" key={point.id} delay={Math.min(index, 4) * 0.05}>
              {/* No `card-hover`: these cards contain nothing clickable, and a
                  hover lift would advertise an interaction that does not exist. */}
              <div className="card h-full !bg-overlay-soft">
                <Icon name={point.icon} className="size-6 text-brand-soft" />
                <h3 className="mt-4 text-base font-bold text-heading">{t(point.title)}</h3>
                <p className="text-small mt-2 text-muted">{t(point.description)}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        {preview && <SectionCTA to="/about" label={t(previews.seeHowIWork)} />}
      </div>
    </section>
  )
}

export default WhyChooseMe
