/**
 * Testimonial card.
 *
 * A quote only renders when the entry has BOTH `consent: true` and actual
 * quote text. Anything else renders as a clearly-labelled placeholder — this
 * is what keeps invented testimonials off the site.
 */

import { Quote, UserRound } from 'lucide-react'
import { useLanguage } from '../../i18n/languageContextValue'
import { sections } from '../../i18n/ui'
import { testimonialPlaceholder } from '../../data/testimonials'

export function TestimonialCard({ testimonial }) {
  const { t } = useLanguage()
  const isPublishable = testimonial.consent === true && Boolean(testimonial.quote)

  if (!isPublishable) {
    return (
      <article className="card flex h-full flex-col items-start border-dashed !bg-overlay-soft">
        <span className="chip !text-xs">{t(sections.testimonials.placeholderBadge)}</span>
        <p className="text-small mt-4 text-muted">{t(testimonialPlaceholder)}</p>
      </article>
    )
  }

  return (
    <article className="card card-hover flex h-full flex-col !bg-overlay-soft">
      <Quote aria-hidden="true" className="size-6 text-brand-soft" />
      <blockquote className="mt-4 flex-1">
        <p className="text-small text-body">{t(testimonial.quote)}</p>
      </blockquote>

      <footer className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        {testimonial.image ? (
          <img
            src={testimonial.image}
            alt=""
            width={40}
            height={40}
            loading="lazy"
            decoding="async"
            className="size-10 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex size-10 items-center justify-center rounded-full border border-border bg-surface text-sm font-bold text-brand-soft"
          >
            {testimonial.initials ?? <UserRound className="size-4" />}
          </span>
        )}
        <div>
          {testimonial.initials && (
            <p className="text-sm font-semibold text-heading">{testimonial.initials}</p>
          )}
          {testimonial.clientType && (
            <p className="text-xs text-muted">{t(testimonial.clientType)}</p>
          )}
        </div>
      </footer>
    </article>
  )
}

export default TestimonialCard
