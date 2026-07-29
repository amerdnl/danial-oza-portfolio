/**
 * About section — the approved advisor biography plus the factual details
 * that establish who he is and how he works.
 *
 * In `preview` mode (home page) it shows the photo, the opening paragraph of
 * the biography, and the headline facts, then links through to /about. The
 * copy comes from the same advisor config either way.
 */

import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  Languages,
  MapPin,
  Video,
} from 'lucide-react'
import { useLanguage } from '../../i18n/languageContextValue'
import { previews, sections, stats as uiStats } from '../../i18n/ui'
import { advisor } from '../../data/advisor'
import useInView from '../../hooks/useInView'
import SectionHeading from '../common/SectionHeading'
import AnimatedStat from '../common/AnimatedStat'
import Reveal from '../common/Reveal'

export function About({ preview = false, showHeading = true }) {
  const { t } = useLanguage()

  // Drives the statistics count-up. Fires once, then disconnects, so
  // scrolling away and back does not restart the animation.
  const [statsRef, statsInView] = useInView({ threshold: 0.25 })

  const facts = [
    { icon: BadgeCheck, label: { en: 'Qualification', ms: 'Kelayakan' }, value: t(advisor.qualification) },
    { icon: Building2, label: { en: 'Company', ms: 'Syarikat' }, value: advisor.company },
    { icon: CalendarDays, label: { en: 'Experience', ms: 'Pengalaman' }, value: t(advisor.experienceLabel) },
    { icon: MapPin, label: { en: 'Area served', ms: 'Kawasan khidmat' }, value: t(advisor.location) },
    {
      icon: Languages,
      label: { en: 'Languages', ms: 'Bahasa' },
      value: advisor.languages.map((language) => t(language)).join(' · '),
    },
    {
      icon: Video,
      label: { en: 'Consultation', ms: 'Perundingan' },
      value: advisor.consultationMethods.map((method) => t(method)).join(' · '),
    },
  ]

  /* ---------------------------------------------------------------- preview
     A single centred column. The advisor photo used to sit in a left-hand
     column here, but it is the same image the hero already shows further up
     the page, so it has been removed and the layout collapsed to one column
     rather than leaving an empty half. The photo itself is untouched and
     still renders in the hero. */
  if (preview) {
    // Two numeric figures that count up, and one non-numeric fact that only
    // fades in — "Free" has no number to animate.
    const statItems = [
      {
        id: 'clients-helped',
        value: advisor.clientsHelpedValue,
        suffix: advisor.clientsHelpedSuffix,
        label: t(uiStats.clientsHelpedLabel),
        ariaLabel: t(uiStats.clientsHelpedA11y),
      },
      {
        id: 'experience',
        value: advisor.experienceYears,
        suffix: t(advisor.experienceSuffix),
        label: t(uiStats.experienceLabel),
        ariaLabel: t(uiStats.experienceA11y),
      },
      {
        id: 'consultation',
        text: t(advisor.consultationFee),
        label: t(uiStats.consultationLabel),
        ariaLabel: t(uiStats.consultationA11y),
      },
    ]

    return (
      <section id="about" className="section">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="eyebrow mb-3">{t(sections.about.eyebrow)}</p>
              <h2 className="text-h2">{t(sections.about.heading)}</h2>

              <p className="text-lead mt-5 text-body">{t(advisor.bio.intro)}</p>
              <p className="text-small mt-4 text-muted">{t(advisor.bio.belief)}</p>
            </Reveal>

            {/* One observer on the grid drives all three cards, rather than
                each card watching the viewport separately. */}
            <dl ref={statsRef} className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {statItems.map((stat, index) => (
                <AnimatedStat
                  key={stat.id}
                  value={stat.value}
                  suffix={stat.suffix}
                  text={stat.text}
                  label={stat.label}
                  ariaLabel={stat.ariaLabel}
                  delay={index * 0.1}
                  start={statsInView}
                />
              ))}
            </dl>

            <Reveal delay={0.05}>
              <p className="text-small mt-5 text-muted">
                {advisor.languages.map((language) => t(language)).join(' · ')} ·{' '}
                {t(advisor.location)}
              </p>

              <Link to="/about" className="btn btn-secondary mt-7">
                <span>{t(previews.learnAboutDanial)}</span>
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    )
  }

  /* ------------------------------------------------------------------- full */
  return (
    <section id="about" className="section">
      <div className="container-page">
        <SectionHeading
          eyebrow={t(sections.about.eyebrow)}
          title={t(sections.about.heading)}
          align="left"
          srOnly={!showHeading}
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Biography */}
          <Reveal className="flex flex-col gap-5">
            <p className="text-lead text-body">{t(advisor.bio.intro)}</p>
            <p className="text-lead text-body">{t(advisor.bio.belief)}</p>
            <p className="text-lead text-body">{t(advisor.bio.goal)}</p>

            <div className="mt-2 rounded-2xl border border-border bg-surface p-5">
              <h3 className="text-base font-bold text-heading">
                {t({ en: 'Support that continues', ms: 'Sokongan yang berterusan' })}
              </h3>
              <p className="text-small mt-2 text-muted">
                {t({
                  en: 'The relationship does not end once an application is submitted. I stay available for certificate servicing, general enquiries, and reviews as circumstances change — a new job, a new child, a new home, or simply a change of mind about priorities.',
                  ms: 'Hubungan ini tidak tamat sebaik permohonan dihantar. Saya kekal tersedia untuk khidmat sijil, pertanyaan umum, dan semakan apabila keadaan berubah — pekerjaan baharu, kelahiran anak, rumah baharu, atau sekadar perubahan keutamaan.',
                })}
              </p>
            </div>
          </Reveal>

          {/* Facts */}
          <Reveal delay={0.1}>
            <dl className="grid gap-4 sm:grid-cols-2">
              {facts.map((fact) => (
                <div
                  key={fact.label.en}
                  className="rounded-xl border border-border bg-surface p-4"
                >
                  <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
                    <fact.icon aria-hidden="true" className="size-4 shrink-0 text-brand-soft" />
                    {t(fact.label)}
                  </dt>
                  <dd className="mt-2 text-sm font-medium text-heading">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-4 rounded-xl border border-border bg-surface p-4">
              <p className="text-small text-muted">
                <span className="font-semibold text-heading">
                  {t(advisor.availability.days)} · {t(advisor.availability.contact)}.
                </span>{' '}
                {t(advisor.availability.outsideHours)}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default About
