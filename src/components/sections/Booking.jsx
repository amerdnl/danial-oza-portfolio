/**
 * Appointment booking.
 *
 * There is no backend and no calendar. The form validates, builds a
 * structured WhatsApp message, and opens WhatsApp. Nothing is stored, and the
 * notice below the form says so plainly.
 */

import { useState } from 'react'
import { AlertCircle, CalendarCheck, Info } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { useLanguage } from '../../i18n/languageContextValue'
import { booking as ui, validation as validationMessages } from '../../i18n/ui'
import { advisor } from '../../data/advisor'
import { services } from '../../data/services'
import { appointmentUrl, openExternal } from '../../utils/whatsapp'
import {
  sanitizeText,
  todayISO,
  validateConsent,
  validateFutureDate,
  validateForm,
  validateName,
  validatePhone,
  validateRequired,
} from '../../utils/validation'
import SectionHeading from '../common/SectionHeading'
import FormField from '../common/FormField'

const CONSULTATION_TYPES = [
  { value: 'physical', label: { en: 'Physical consultation', ms: 'Perundingan fizikal' } },
  { value: 'online', label: { en: 'Online consultation', ms: 'Perundingan dalam talian' } },
  { value: 'whatsapp', label: { en: 'WhatsApp discussion', ms: 'Perbincangan WhatsApp' } },
  { value: 'phone', label: { en: 'Phone call', ms: 'Panggilan telefon' } },
]

const EMPTY_FORM = {
  name: '',
  phone: '',
  consultationType: '',
  date: '',
  time: '',
  topic: '',
  note: '',
  consent: false,
}

const RULES = {
  name: validateName,
  phone: validatePhone,
  consultationType: validateRequired,
  date: validateFutureDate,
  time: validateRequired,
  topic: validateRequired,
  consent: validateConsent,
}

export function Booking() {
  const { lang, t } = useLanguage()
  const [values, setValues] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const update = (field, value) => {
    setValues((previous) => ({ ...previous, [field]: value }))
    // Clear the error for a field as soon as the visitor edits it.
    setErrors((previous) => ({ ...previous, [field]: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validateForm(values, RULES)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(true)
      const firstField = Object.keys(nextErrors)[0]
      document.getElementById(`booking-${firstField}`)?.focus()
      return
    }

    const label = (options, value) => {
      const option = options.find((item) => item.value === value)
      return option ? t(option.label) : value
    }

    openExternal(
      appointmentUrl(lang, {
        name: sanitizeText(values.name),
        phone: sanitizeText(values.phone),
        consultationType: label(CONSULTATION_TYPES, values.consultationType),
        date: values.date,
        time: values.time,
        topic: label(
          services.map((service) => ({ value: service.id, label: service.title })),
          values.topic,
        ),
        note: sanitizeText(values.note),
      }),
    )
  }

  const hasErrors = submitted && Object.keys(errors).some((key) => errors[key])

  return (
    <section id="booking" className="section">
      <div className="container-page">
        <SectionHeading eyebrow={t(ui.eyebrow)} title={t(ui.heading)} intro={t(ui.intro)} />

        <div className="mx-auto mt-12 max-w-3xl">
          <form onSubmit={handleSubmit} noValidate className="card !p-5 sm:!p-7">
            {hasErrors && (
              <p role="alert" className="field-error mb-5 !text-sm">
                <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                <span>{t(validationMessages.formHasErrors)}</span>
              </p>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <FormField id="booking-name" label={t(ui.fullName)} error={errors.name} required>
                {(props) => (
                  <input
                    {...props}
                    type="text"
                    autoComplete="name"
                    className={`input ${errors.name ? 'input-error' : ''}`}
                    placeholder={t(ui.namePlaceholder)}
                    value={values.name}
                    onChange={(event) => update('name', event.target.value)}
                  />
                )}
              </FormField>

              <FormField id="booking-phone" label={t(ui.phone)} error={errors.phone} required>
                {(props) => (
                  <input
                    {...props}
                    type="tel"
                    autoComplete="tel"
                    className={`input ${errors.phone ? 'input-error' : ''}`}
                    placeholder={t(ui.phonePlaceholder)}
                    value={values.phone}
                    onChange={(event) => update('phone', event.target.value)}
                  />
                )}
              </FormField>

              <FormField
                id="booking-consultationType"
                label={t(ui.consultationType)}
                error={errors.consultationType}
                required
              >
                {(props) => (
                  <select
                    {...props}
                    className={`input ${errors.consultationType ? 'input-error' : ''}`}
                    value={values.consultationType}
                    onChange={(event) => update('consultationType', event.target.value)}
                  >
                    <option value="">{t(ui.selectPlaceholder)}</option>
                    {CONSULTATION_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {t(type.label)}
                      </option>
                    ))}
                  </select>
                )}
              </FormField>

              <FormField id="booking-topic" label={t(ui.topic)} error={errors.topic} required>
                {(props) => (
                  <select
                    {...props}
                    className={`input ${errors.topic ? 'input-error' : ''}`}
                    value={values.topic}
                    onChange={(event) => update('topic', event.target.value)}
                  >
                    <option value="">{t(ui.selectPlaceholder)}</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {t(service.title)}
                      </option>
                    ))}
                  </select>
                )}
              </FormField>

              <FormField
                id="booking-date"
                label={t(ui.date)}
                error={errors.date}
                required
                hint={t(ui.outsideHours)}
              >
                {(props) => (
                  <input
                    {...props}
                    type="date"
                    min={todayISO()}
                    className={`input ${errors.date ? 'input-error' : ''}`}
                    value={values.date}
                    onChange={(event) => update('date', event.target.value)}
                  />
                )}
              </FormField>

              <FormField id="booking-time" label={t(ui.time)} error={errors.time} required>
                {(props) => (
                  <input
                    {...props}
                    type="time"
                    className={`input ${errors.time ? 'input-error' : ''}`}
                    value={values.time}
                    onChange={(event) => update('time', event.target.value)}
                  />
                )}
              </FormField>

              <FormField
                id="booking-note"
                label={t(ui.note)}
                optionalLabel={t(ui.noteOptional)}
                className="sm:col-span-2"
              >
                {(props) => (
                  <textarea
                    {...props}
                    rows={3}
                    className="input"
                    placeholder={t(ui.notePlaceholder)}
                    value={values.note}
                    onChange={(event) => update('note', event.target.value)}
                  />
                )}
              </FormField>
            </div>

            {/* Consent */}
            <div className="mt-6">
              <label
                htmlFor="booking-consent"
                className="flex cursor-pointer items-start gap-3 text-sm text-body"
              >
                <input
                  id="booking-consent"
                  type="checkbox"
                  checked={values.consent}
                  onChange={(event) => update('consent', event.target.checked)}
                  aria-invalid={errors.consent ? 'true' : undefined}
                  aria-describedby={errors.consent ? 'booking-consent-error' : undefined}
                  className="mt-0.5 size-5 shrink-0 accent-accent"
                />
                <span>{t(ui.consent)}</span>
              </label>
              {errors.consent && (
                <p id="booking-consent-error" className="field-error">
                  <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                  <span>{t(errors.consent)}</span>
                </p>
              )}
            </div>

            <button type="submit" className="btn btn-primary btn-block mt-6">
              <FaWhatsapp aria-hidden="true" className="size-5" />
              <span>{t(ui.submit)}</span>
            </button>

            {/* Required notice */}
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-border bg-overlay-soft p-4">
              <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-soft" />
              <p className="text-small text-muted">{t(ui.notice)}</p>
            </div>
          </form>

          <p className="text-small mt-5 flex items-center justify-center gap-2 text-center text-muted">
            <CalendarCheck aria-hidden="true" className="size-4 shrink-0 text-brand-soft" />
            {t(advisor.availability.days)} · {t(advisor.availability.contact)}
          </p>
        </div>
      </div>
    </section>
  )
}

export default Booking
