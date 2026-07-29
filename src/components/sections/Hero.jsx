/**
 * Hero.
 *
 * One staggered reveal for the whole block rather than per-word animation.
 * The profile image reserves its space with explicit width/height so the
 * layout never shifts while it loads.
 */

import { Link } from 'react-router-dom'
import { CalendarCheck, Sparkles, MapPin, BadgeCheck, Users, Video } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { useLanguage } from '../../i18n/languageContextValue'
import { cta, hero } from '../../i18n/ui'
import { advisor } from '../../data/advisor'
import { generalEnquiryUrl } from '../../utils/whatsapp'

// The clients figure comes from the advisor config rather than being typed
// here, so it cannot drift from the value shown elsewhere on the site.
const TRUST_POINTS = [
  {
    icon: Users,
    text: {
      en: `${advisor.clientsHelped} clients helped`,
      ms: `${advisor.clientsHelped} klien dibantu`,
    },
  },
  { icon: MapPin, text: { en: 'Serving all of Malaysia', ms: 'Berkhidmat di seluruh Malaysia' } },
  { icon: BadgeCheck, text: { en: 'Free consultation', ms: 'Perundingan percuma' } },
  { icon: Video, text: { en: 'Physical & online', ms: 'Fizikal & dalam talian' } },
]

export function Hero() {
  const { lang, t } = useLanguage()

  /**
   * Staggered entrance via CSS animation-delay. The `animate-fade-up` class
   * and the reduced-motion override both live in index.css, so a visitor who
   * has asked for reduced motion sees the content immediately.
   */
  const stagger = (index) => ({ animationDelay: `${0.05 + index * 0.08}s` })

  return (
    <section id="home" className="bg-hero relative overflow-hidden">
      {/* Decorative glow — purely visual, hidden from assistive tech. */}
      <div
        aria-hidden="true"
        className="hero-glow pointer-events-none absolute -right-24 -top-24 size-[20rem] rounded-full md:-right-40 md:-top-40 md:size-[36rem]"
      />

      <div className="container-page relative pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-28 lg:pt-40">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Copy */}
          <div>
            <p className="chip animate-fade-up mb-6" style={stagger(0)}>
              <BadgeCheck aria-hidden="true" className="size-4 text-brand-soft" />
              {t(advisor.qualification)}
            </p>

            {/* tabIndex allows ScrollToTop to move focus here after
                navigation; index.css suppresses the focus ring. */}
            <h1 tabIndex={-1} className="text-display animate-fade-up" style={stagger(1)}>
              {t(hero.headline)}
            </h1>

            <p
              className="text-lead animate-fade-up mt-6 max-w-2xl text-body"
              style={stagger(2)}
            >
              {t(hero.supporting)}
            </p>

            <p className="animate-fade-up mt-6 text-sm text-muted" style={stagger(3)}>
              <span className="font-semibold text-heading">{advisor.name}</span>
              {' · '}
              {t(advisor.title)}
              {' · '}
              {advisor.company}
            </p>

            {/* CTAs */}
            <div
              className="animate-fade-up mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              style={stagger(4)}
            >
              <Link to="/contact" className="btn btn-primary">
                <CalendarCheck aria-hidden="true" className="size-5" />
                <span>{t(cta.bookFree)}</span>
              </Link>
              <Link to="/recommendation" className="btn btn-secondary">
                <Sparkles aria-hidden="true" className="size-5" />
                <span>{t(cta.getRecommendation)}</span>
              </Link>
              <a
                href={generalEnquiryUrl(lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <FaWhatsapp aria-hidden="true" className="size-5" />
                <span>{t(cta.chatWhatsApp)}</span>
              </a>
            </div>

            {/* Trust indicators */}
            <ul
              className="animate-fade-up mt-10 flex flex-wrap gap-x-6 gap-y-3"
              style={stagger(5)}
            >
              {TRUST_POINTS.map((point) => (
                <li
                  key={point.text.en}
                  className="flex items-center gap-2 text-sm text-body"
                >
                  <point.icon aria-hidden="true" className="size-4 shrink-0 text-brand-soft" />
                  {t(point.text)}
                </li>
              ))}
            </ul>
          </div>

          {/* Portrait */}
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-surface">
              <img
                src={advisor.profileImage}
                width={advisor.profileImageWidth}
                height={advisor.profileImageHeight}
                alt={t(hero.photoAlt)}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="aspect-square w-full object-cover"
              />
            </div>

            {/* Floating stat — bright red reserved for a key figure. */}
            <div className="absolute -bottom-5 -left-3 rounded-2xl border border-border bg-overlay-strong px-5 py-3 backdrop-blur-sm sm:-left-5">
              <p className="text-2xl font-extrabold text-accent">
                {advisor.clientsHelped}
              </p>
              <p className="text-xs text-muted">
                {lang === 'ms' ? 'klien dibantu' : 'clients helped'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
