/**
 * Professional milestones.
 *
 * Only the three verified internal recognitions. Deliberately framed as
 * internal recognition rather than industry awards — see the note in
 * src/data/achievements.js before adding anything here.
 */

import { useLanguage } from '../../i18n/languageContextValue'
import { previews, sections } from '../../i18n/ui'
import { achievements } from '../../data/achievements'
import { advisor } from '../../data/advisor'
import SectionHeading from '../common/SectionHeading'
import SectionCTA from '../common/SectionCTA'
import Reveal from '../common/Reveal'
import Icon from '../common/Icon'

export function Achievements({ preview = false, showHeading = true }) {
  const { t } = useLanguage()

  return (
    <section id="achievements" className="section section-alt">
      <div className="container-page">
        <SectionHeading
            eyebrow={t(sections.achievements.eyebrow)}
            title={t(sections.achievements.heading)}
            intro={t(sections.achievements.intro)}
          srOnly={!showHeading}
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement, index) => (
            <Reveal as="li" key={achievement.id} delay={index * 0.08}>
              {/* No `card-hover`: these are informational, not clickable. */}
              <article className="card h-full !bg-overlay-soft text-center">
                <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-brand bg-surface">
                  <Icon name={achievement.icon} className="size-6 text-brand-soft" />
                </div>
                <h3 className="mt-5 text-base font-bold text-heading">{t(achievement.title)}</h3>
                <p className="text-small mt-2 text-muted">
                  {t(achievement.description)}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>

        <p className="text-small mx-auto mt-8 max-w-2xl text-center text-muted">
          {t({
            en: `These are internal recognitions received within ${advisor.company}. They are not industry-wide awards or rankings.`,
            ms: `Ini adalah pengiktirafan dalaman yang diterima dalam ${advisor.company}. Ia bukan anugerah atau kedudukan peringkat industri.`,
          })}
        </p>

        {preview && <SectionCTA to="/achievements" label={t(previews.viewMilestones)} />}
      </div>
    </section>
  )
}

export default Achievements
