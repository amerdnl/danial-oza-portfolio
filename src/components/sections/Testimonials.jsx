/**
 * Testimonials.
 *
 * Currently renders placeholders only. See src/data/testimonials.js for how
 * to add a verified, consented client testimonial.
 */

import { Info } from 'lucide-react'
import { useLanguage } from '../../i18n/languageContextValue'
import { sections } from '../../i18n/ui'
import { testimonials, hasPublishableTestimonials } from '../../data/testimonials'
import SectionHeading from '../common/SectionHeading'
import TestimonialCard from '../common/TestimonialCard'
import Reveal from '../common/Reveal'

export function Testimonials({ showHeading = true }) {
  const { t } = useLanguage()

  return (
    <section id="testimonials" className="section">
      <div className="container-page">
        <SectionHeading
            eyebrow={t(sections.testimonials.eyebrow)}
            title={t(sections.testimonials.heading)}
            intro={t(sections.testimonials.intro)}
          srOnly={!showHeading}
        />

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal as="li" key={testimonial.id} delay={Math.min(index, 3) * 0.06}>
              <TestimonialCard testimonial={testimonial} />
            </Reveal>
          ))}
        </ul>

        {!hasPublishableTestimonials && (
          <div className="mx-auto mt-8 flex max-w-2xl items-start gap-3 rounded-2xl border border-border bg-surface p-5">
            <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-soft" />
            <p className="text-small text-muted">
              {t({
                en: 'No client testimonials are published yet. Real feedback will appear here once clients have given permission for their words to be shared.',
                ms: 'Belum ada testimoni klien yang diterbitkan. Maklum balas sebenar akan dipaparkan di sini setelah klien memberi kebenaran untuk kata-kata mereka dikongsi.',
              })}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Testimonials
