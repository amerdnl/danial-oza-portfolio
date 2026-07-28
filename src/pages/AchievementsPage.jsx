/**
 * Achievements — the three verified internal recognitions, the practice
 * statistics, and the values behind the work.
 *
 * Nothing here is framed as an industry award or ranking. See the note at the
 * top of src/data/achievements.js before adding anything.
 */

import { Link } from 'react-router-dom'
import { CalendarCheck, ShieldCheck } from 'lucide-react'
import { useLanguage } from '../i18n/languageContextValue'
import { cta, routeMeta } from '../i18n/ui'
import { advisor } from '../data/advisor'
import { whyChooseMe } from '../data/whyChooseMe'
import useDocumentMeta from '../hooks/useDocumentMeta'
import PageHeader from '../components/layout/PageHeader'
import Achievements from '../components/sections/Achievements'
import SectionHeading from '../components/common/SectionHeading'
import Reveal from '../components/common/Reveal'
import Icon from '../components/common/Icon'

export function AchievementsPage() {
  const { t } = useLanguage()
  useDocumentMeta('achievements')

  const stats = [
    {
      value: advisor.clientsHelped,
      label: { en: 'Individuals and families helped', ms: 'Individu dan keluarga dibantu' },
    },
    {
      value: t(advisor.experienceLabel),
      label: { en: 'As a registered Life Advisor', ms: 'Sebagai Penasihat Hayat berdaftar' },
    },
    {
      value: t(advisor.location),
      label: { en: 'Area served', ms: 'Kawasan khidmat' },
    },
  ]

  // The advising values shown here are the same points used elsewhere on the
  // site, so there is one place to edit them.
  const values = whyChooseMe.slice(0, 4)

  return (
    <>
      <PageHeader
        title={t(routeMeta.achievements.heading)}
        intro={t(routeMeta.achievements.intro)}
      />

      <Achievements showHeading={false} />

      {/* Practice statistics */}
      <section className="section">
        <div className="container-page">
          <dl className="grid gap-5 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label.en} className="card text-center">
                <dt className="sr-only">{t(stat.label)}</dt>
                <dd>
                  <span className="block text-3xl font-extrabold text-accent">{stat.value}</span>
                  <span className="text-small mt-2 block text-muted">{t(stat.label)}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Advisor values */}
      <section className="section section-alt">
        <div className="container-page">
          <SectionHeading
            eyebrow={t({ en: 'Values', ms: 'Nilai' })}
            title={t({ en: 'What Guides the Work', ms: 'Apa Yang Memandu Kerja Ini' })}
          />

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Reveal as="li" key={value.id} delay={Math.min(index, 4) * 0.05}>
                <div className="card card-on-alt h-full">
                  <Icon name={value.icon} className="size-6 text-brand-soft" />
                  <h3 className="mt-4 text-base font-bold text-heading">{t(value.title)}</h3>
                  <p className="text-small mt-2 text-muted">{t(value.description)}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/services" className="btn btn-secondary">
              <ShieldCheck aria-hidden="true" className="size-5" />
              <span>{t({ en: 'View services', ms: 'Lihat perkhidmatan' })}</span>
            </Link>
            <Link to="/contact" className="btn btn-primary">
              <CalendarCheck aria-hidden="true" className="size-5" />
              <span>{t(cta.bookFree)}</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default AchievementsPage
