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
import { hero, previews, sections } from '../../i18n/ui'
import { advisor } from '../../data/advisor'
import SectionHeading from '../common/SectionHeading'
import Reveal from '../common/Reveal'

export function About({ preview = false, showHeading = true }) {
  const { t } = useLanguage()

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

  /* ---------------------------------------------------------------- preview */
  if (preview) {
    const stats = [
      { value: advisor.clientsHelped, label: { en: 'clients helped', ms: 'klien dibantu' } },
      { value: t(advisor.experienceLabel), label: { en: 'experience', ms: 'pengalaman' } },
      {
        value: t(advisor.consultationFee),
        label: { en: 'consultation', ms: 'perundingan' },
      },
    ]

    return (
      <section id="about" className="section">
        <div className="container-page">
          <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            <Reveal>
              <img
                src={advisor.profileImage}
                width={advisor.profileImageWidth}
                height={advisor.profileImageHeight}
                alt={t(hero.photoAlt)}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full rounded-3xl border border-border object-cover"
              />
            </Reveal>

            <Reveal delay={0.05}>
              <p className="eyebrow mb-3">{t(sections.about.eyebrow)}</p>
              <h2 className="text-h2">{t(sections.about.heading)}</h2>

              <p className="text-lead mt-5 text-body">{t(advisor.bio.intro)}</p>
              <p className="text-small mt-4 text-muted">{t(advisor.bio.belief)}</p>

              <dl className="mt-7 grid grid-cols-3 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label.en}>
                    <dt className="sr-only">{t(stat.label)}</dt>
                    <dd>
                      <span className="block text-2xl font-extrabold text-accent">
                        {stat.value}
                      </span>
                      <span className="text-xs text-muted">{t(stat.label)}</span>
                    </dd>
                  </div>
                ))}
              </dl>

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
