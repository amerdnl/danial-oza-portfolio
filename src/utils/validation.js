/**
 * Form validation helpers.
 *
 * Each validator returns a bilingual error object from `src/i18n/ui.js`, or
 * `null` when the value is acceptable. Components resolve the message through
 * the `t()` helper so errors appear in the visitor's chosen language.
 */

import { validation as messages } from '../i18n/ui'

/**
 * Trim and strip control characters from anything a visitor typed before it
 * is placed into a WhatsApp or email message.
 */
export function sanitizeText(value) {
  if (typeof value !== 'string') return ''
  // Replace control characters (including pasted newlines) with a single
  // space so they cannot break the structure of a WhatsApp message.
  // Matching control characters is the whole point here, hence the exception.
  // oxlint-disable-next-line no-control-regex
  return value.replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s{2,}/g, ' ').trim()
}

export function validateRequired(value) {
  return sanitizeText(value) ? null : messages.required
}

export function validateName(value) {
  const name = sanitizeText(value)
  if (!name) return messages.required
  if (name.length < 2) return messages.nameTooShort
  return null
}

/**
 * Malaysian mobile and landline numbers.
 * Accepts the common ways people type them: 012-345 6789, 0123456789,
 * +60123456789, 60123456789. Spaces, dashes, and brackets are ignored.
 */
export function validatePhone(value) {
  const raw = sanitizeText(value)
  if (!raw) return messages.required

  const digits = raw.replace(/[\s\-()]/g, '')
  // +60 / 60 prefixed, or a local number starting with 0.
  const malaysianPattern = /^(?:\+?60|0)\d{8,10}$/
  return malaysianPattern.test(digits) ? null : messages.phoneInvalid
}

export function validateEmail(value) {
  const email = sanitizeText(value)
  if (!email) return messages.required
  // Deliberately permissive — the real check is whether the message sends.
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  return pattern.test(email) ? null : messages.emailInvalid
}

/** Today's date as YYYY-MM-DD in the visitor's own timezone. */
export function todayISO() {
  const now = new Date()
  const offsetMinutes = now.getTimezoneOffset()
  const local = new Date(now.getTime() - offsetMinutes * 60_000)
  return local.toISOString().slice(0, 10)
}

/** Appointment dates must be today or later. */
export function validateFutureDate(value) {
  const date = sanitizeText(value)
  if (!date) return messages.required
  return date < todayISO() ? messages.dateInPast : null
}

export function validateConsent(checked) {
  return checked ? null : messages.consentRequired
}

export function validateMessage(value) {
  const message = sanitizeText(value)
  if (!message) return messages.required
  if (message.length < 10) return messages.messageTooShort
  return null
}

/**
 * Run a set of validators over a form.
 * @param {object} values - the form state
 * @param {object} rules  - { fieldName: (value, values) => error | null }
 * @returns {object} errors keyed by field name; empty when the form is valid
 */
export function validateForm(values, rules) {
  const errors = {}
  for (const [field, validate] of Object.entries(rules)) {
    const error = validate(values[field], values)
    if (error) errors[field] = error
  }
  return errors
}

/** Only allow http(s) links to leave the site. */
export function isSafeExternalUrl(url) {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'https:' || parsed.protocol === 'http:'
  } catch {
    return false
  }
}
