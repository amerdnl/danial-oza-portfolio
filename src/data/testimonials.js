/**
 * ============================================================================
 * TESTIMONIALS — PLACEHOLDERS ONLY
 * ============================================================================
 * Every entry below is an unfilled placeholder. No client quote, name, or
 * photo on this site is invented, and none should ever be.
 *
 * HOW TO ADD A VERIFIED TESTIMONIAL
 * ---------------------------------
 * 1. Get the client's explicit permission to publish their words.
 * 2. Set `consent: true`. Entries WITHOUT consent render as a placeholder
 *    card regardless of what else is filled in — this is deliberate.
 * 3. Fill in `quote` with what the client actually wrote or said. Do not
 *    rewrite it into marketing language.
 * 4. Use initials only (e.g. 'A.R.') unless the client has agreed to have
 *    their full name shown.
 * 5. `clientType` is a general description such as 'Parent, Selangor' —
 *    avoid anything that could identify the person without their agreement.
 * 6. `image` is optional. Leave it as null unless the client supplied a photo
 *    and agreed to its use. Never use a stock photo to represent a real client.
 *
 * Example of a completed entry:
 *
 *   {
 *     id: 'client-1',
 *     initials: 'A.R.',
 *     clientType: { en: 'Parent, Selangor', ms: 'Ibu bapa, Selangor' },
 *     quote: {
 *       en: '<the client\'s own words>',
 *       ms: '<translation, if the client agrees to it being translated>',
 *     },
 *     image: null,
 *     consent: true,
 *   }
 * ============================================================================
 */

/** Text shown in every card that has no verified testimonial yet. */
export const testimonialPlaceholder = {
  en: 'Verified client testimonial will be added here.',
  ms: 'Testimoni klien yang disahkan akan ditambah di sini.',
}

export const testimonials = [
  {
    id: 'placeholder-1',
    initials: null,
    clientType: null,
    quote: null,
    image: null,
    consent: false,
  },
  {
    id: 'placeholder-2',
    initials: null,
    clientType: null,
    quote: null,
    image: null,
    consent: false,
  },
  {
    id: 'placeholder-3',
    initials: null,
    clientType: null,
    quote: null,
    image: null,
    consent: false,
  },
]

/**
 * A testimonial is only publishable when the client consented AND there is
 * an actual quote to show.
 */
export const hasPublishableTestimonials = testimonials.some(
  (item) => item.consent === true && item.quote,
)

export default testimonials
