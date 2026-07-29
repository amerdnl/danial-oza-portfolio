/**
 * ============================================================================
 * WHATSAPP LINK BUILDERS
 * ============================================================================
 * Every WhatsApp link on the site is produced here, and the destination
 * number is read from `advisor.whatsappNumber` in src/data/advisor.js so it
 * only ever needs changing in one place.
 *
 * The message templates live in `whatsappMessages` in the same file.
 * ============================================================================
 */

import { advisor, whatsappMessages } from '../data/advisor'
import { servicesById } from '../data/services'
import { findOptionLabel } from '../data/questionnaire'

/** Resolve a bilingual `{ en, ms }` value outside of React. */
function pick(value, lang) {
  if (value == null) return ''
  if (typeof value === 'string') return value
  return value[lang] ?? value.en ?? ''
}

/**
 * Build a wa.me URL with a pre-filled, URL-encoded message.
 * @param {string} message - plain text; encoding is handled here
 */
export function buildWhatsAppUrl(message) {
  const base = `https://wa.me/${advisor.whatsappNumber}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}

/** 1. General enquiry — the floating button and generic CTAs. */
export function generalEnquiryUrl(lang = 'en') {
  return buildWhatsAppUrl(pick(whatsappMessages.general, lang))
}

/**
 * 2. Appointment booking.
 * The approved opening message is sent verbatim, followed by the visitor's
 * details when the booking form has been filled in.
 */
export function appointmentUrl(lang = 'en', details = null) {
  const labels = whatsappMessages.labels
  const lines = [pick(whatsappMessages.appointment, lang)]

  if (details) {
    const rows = [
      [labels.name, details.name],
      [labels.phone, details.phone],
      [labels.consultationType, details.consultationType],
      [labels.date, details.date],
      [labels.time, details.time],
      [labels.topic, details.topic],
      [labels.note, details.note],
    ].filter(([, value]) => value)

    if (rows.length > 0) {
      lines.push('', `*${pick(labels.appointmentDetails, lang)}*`)
      for (const [label, value] of rows) {
        lines.push(`• ${pick(label, lang)}: ${value}`)
      }
    }
  }

  return buildWhatsAppUrl(lines.join('\n'))
}

/**
 * 3. Recommendation results.
 * Appends a short summary of the questionnaire answers and the suggested
 * discussion areas. Deliberately contains no medical information.
 */
export function recommendationUrl(lang = 'en', answers = {}, areas = []) {
  const labels = whatsappMessages.labels
  const lines = [pick(whatsappMessages.recommendation, lang)]

  const label = (key) => pick(labels[key], lang)
  const answerLabel = (field) => {
    const option = findOptionLabel(field, answers[field])
    return option ? pick(option, lang) : null
  }

  // Existing protection is summarised as a short list of what the visitor
  // already has, rather than repeating every yes/no answer.
  const existing = [
    answers.hasMedicalCard === 'yes' && servicesById['medical-card'],
    answers.hasLifeTakaful === 'yes' && servicesById['life-takaful'],
    answers.hasCriticalIllness === 'yes' && servicesById['critical-illness'],
    answers.hasIncomeProtection === 'yes' && servicesById['income-protection'],
  ]
    .filter(Boolean)
    .map((service) => pick(service.title, lang))

  const concerns = Array.isArray(answers.concerns)
    ? answers.concerns.map((value) => {
        const option = findOptionLabel('concerns', value)
        return option ? pick(option, lang) : value
      })
    : []

  const suggested = areas
    .map((area) => servicesById[area.categoryId])
    .filter(Boolean)
    .map((service) => pick(service.title, lang))

  const rows = [
    [label('ageRange'), answerLabel('ageRange')],
    [label('employment'), answerLabel('employment')],
    [label('dependants'), answerLabel('dependants')],
    // Status only — never any medical detail, and never a conclusion drawn
    // from it. `answerLabel` resolves the translated label, so the raw stored
    // value is never sent.
    [label('smokingStatus'), answerLabel('smokingStatus')],
    [label('existingProtection'), existing.length ? existing.join(', ') : pick(labels.none, lang)],
    [label('concerns'), concerns.length ? concerns.join(', ') : pick(labels.none, lang)],
    [label('budget'), answerLabel('budget')],
  ].filter(([, value]) => value)

  lines.push('', `*${pick(labels.summaryHeading, lang)}*`)
  for (const [key, value] of rows) {
    lines.push(`• ${key}: ${value}`)
  }

  if (suggested.length > 0) {
    lines.push('', `*${pick(labels.suggestedAreas, lang)}*`)
    for (const area of suggested) {
      lines.push(`• ${area}`)
    }
  }

  return buildWhatsAppUrl(lines.join('\n'))
}

/** 4. Enquiry about one protection category. */
export function serviceEnquiryUrl(lang = 'en', serviceId) {
  const service = servicesById[serviceId]
  const serviceName = service ? pick(service.title, lang) : ''
  const message = pick(whatsappMessages.serviceEnquiry, lang).replace('{service}', serviceName)
  return buildWhatsAppUrl(message)
}

/** 5. Contact form sent through WhatsApp. */
export function contactMessageUrl(lang = 'en', details = {}) {
  const labels = whatsappMessages.labels
  const lines = [pick(whatsappMessages.general, lang), '']

  const rows = [
    [labels.name, details.name],
    [labels.phone, details.phone],
    [labels.preferredContact, details.preferredContact],
    [labels.interest, details.interest],
    [labels.message, details.message],
  ].filter(([, value]) => value)

  for (const [label, value] of rows) {
    lines.push(`• ${pick(label, lang)}: ${value}`)
  }

  return buildWhatsAppUrl(lines.join('\n'))
}

/** Contact form sent as an email draft instead of WhatsApp. */
export function contactMailtoUrl(lang = 'en', details = {}) {
  const labels = whatsappMessages.labels
  const subject =
    lang === 'ms' ? 'Pertanyaan daripada laman web' : 'Enquiry from your website'

  const rows = [
    [labels.name, details.name],
    [labels.phone, details.phone],
    ['Email', details.email],
    [labels.preferredContact, details.preferredContact],
    [labels.interest, details.interest],
  ].filter(([, value]) => value)

  const body = [
    ...rows.map(([label, value]) => `${pick(label, lang)}: ${value}`),
    '',
    details.message || '',
  ].join('\n')

  return `${advisor.contact.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/**
 * Open a WhatsApp or mailto URL in a new tab.
 * `noopener,noreferrer` prevents the opened page from getting a handle on
 * this window.
 */
export function openExternal(url) {
  window.open(url, '_blank', 'noopener,noreferrer')
}
