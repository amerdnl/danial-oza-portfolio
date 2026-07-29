/**
 * Contact section: direct channels, social profiles, service facts, and a
 * message form.
 *
 * The form has no backend. Depending on the preferred contact method it
 * either opens WhatsApp or an email draft on the visitor's own device. The
 * notices below the form state that plainly, and warn against sending
 * sensitive personal information.
 */

import { useState } from 'react'
import { AlertCircle, BadgeCheck, CalendarDays, Info, Mail, MapPin, Phone, ShieldAlert, Video } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { useLanguage } from '../../i18n/languageContextValue'
import { contactForm as ui, sections, validation as validationMessages } from '../../i18n/ui'
import { advisor } from '../../data/advisor'
import { services } from '../../data/services'
import {
  contactMailtoUrl,
  contactMessageUrl,
  generalEnquiryUrl,
  openExternal,
} from '../../utils/whatsapp'
import {
  sanitizeText,
  validateConsent,
  validateEmail,
  validateForm,
  validateMessage,
  validateName,
  validatePhone,
  validateRequired,
} from '../../utils/validation'
import SectionHeading from '../common/SectionHeading'
import FormField from '../common/FormField'
import SocialLinks from '../common/SocialLinks'

const CONTACT_METHODS = [
  { value: 'whatsapp', label: { en: 'WhatsApp', ms: 'WhatsApp' } },
  { value: 'phone', label: { en: 'Phone call', ms: 'Panggilan telefon' } },
  { value: 'email', label: { en: 'Email', ms: 'E-mel' } },
]

const EMPTY_FORM = {
  name: '',
  phone: '',
  email: '',
  method: 'whatsapp',
  interest: '',
  message: '',
  consent: false,
}

export function Contact({ showHeading = true }) {
  const { lang, t } = useLanguage()
  const [values, setValues] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const update = (field, value) => {
    setValues((previous) => ({ ...previous, [field]: value }))
    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
      ...(field === 'method' && value !== 'email' ? { email: undefined } : {}),
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    // Email is only required when the visitor asked to be contacted by email.
    const rules = {
      name: validateName,
      phone: validatePhone,
      interest: validateRequired,
      message: validateMessage,
      consent: validateConsent,
      ...(values.method === 'email' ? { email: validateEmail } : {}),
    }

    const nextErrors = validateForm(values, rules)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(true)
      document.getElementById(`contact-${Object.keys(nextErrors)[0]}`)?.focus()
      return
    }

    const service = services.find((item) => item.id === values.interest)
    const contactMethod = CONTACT_METHODS.find((item) => item.value === values.method)
    const details = {
      name: sanitizeText(values.name),
      phone: sanitizeText(values.phone),
      email: sanitizeText(values.email),
      preferredContact: contactMethod ? t(contactMethod.label) : values.method,
      interest: service ? t(service.title) : values.interest,
      message: sanitizeText(values.message),
    }

    if (values.method === 'email') {
      window.location.href = contactMailtoUrl(lang, details)
    } else {
      openExternal(contactMessageUrl(lang, details))
    }
  }

  const hasErrors = submitted && Object.keys(errors).some((key) => errors[key])

  const facts = [
    { icon: MapPin, text: t(advisor.location) },
    { icon: Video, text: advisor.consultationMethods.map((method) => t(method)).join(' · ') },
    {
      icon: BadgeCheck,
      text: t({ en: 'Free consultation', ms: 'Perundingan percuma' }),
    },
    {
      icon: CalendarDays,
      text: `${t(advisor.availability.days)} · ${t(advisor.availability.contact)}`,
    },
  ]

  return (
    <section id="contact" className="section">
      <div className="container-page">
        <SectionHeading
            eyebrow={t(sections.contact.eyebrow)}
            title={t(sections.contact.heading)}
            intro={t(sections.contact.intro)}
          srOnly={!showHeading}
        />

        <div className={`grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 ${showHeading ? 'mt-12' : ''}`}>
          {/* Channels */}
          <div className="flex flex-col gap-6">
            <div className="card">
              <h3 className="text-base font-bold text-heading">{t(sections.contact.directChannels)}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                <li>
                  <a
                    href={generalEnquiryUrl(lang)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center gap-3 text-sm text-body transition-colors hover:text-heading"
                  >
                    <FaWhatsapp aria-hidden="true" className="size-5 shrink-0 text-brand-soft" />
                    <span>
                      <span className="block font-semibold">WhatsApp</span>
                      <span className="text-muted">
                        {advisor.contact.whatsappDisplay}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={advisor.contact.phoneHref}
                    className="flex min-h-11 items-center gap-3 text-sm text-body transition-colors hover:text-heading"
                  >
                    <Phone aria-hidden="true" className="size-5 shrink-0 text-brand-soft" />
                    <span>
                      <span className="block font-semibold">{t({ en: 'Phone', ms: 'Telefon' })}</span>
                      <span className="text-muted">
                        {advisor.contact.phoneDisplay}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={advisor.contact.emailHref}
                    className="flex min-h-11 items-center gap-3 text-sm text-body transition-colors hover:text-heading"
                  >
                    <Mail aria-hidden="true" className="size-5 shrink-0 text-brand-soft" />
                    <span className="min-w-0">
                      <span className="block font-semibold">{t({ en: 'Email', ms: 'E-mel' })}</span>
                      <span className="block break-all text-muted">
                        {advisor.contact.email}
                      </span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-base font-bold text-heading">{t(sections.contact.followAlong)}</h3>
              <SocialLinks className="mt-4" showHandles />
            </div>

            <div className="card">
              <h3 className="text-base font-bold text-heading">{t(sections.contact.goodToKnow)}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {facts.map((fact) => (
                  <li key={fact.text} className="flex items-start gap-3 text-sm text-body">
                    <fact.icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-soft" />
                    {fact.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="card !p-5 sm:!p-7">
            <h3 className="text-base font-bold text-heading">{t(ui.heading)}</h3>

            {hasErrors && (
              <p role="alert" className="field-error mt-4 !text-sm">
                <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                <span>{t(validationMessages.formHasErrors)}</span>
              </p>
            )}

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <FormField id="contact-name" label={t(ui.fullName)} error={errors.name} required>
                {(props) => (
                  <input
                    {...props}
                    type="text"
                    autoComplete="name"
                    className={`input ${errors.name ? 'input-error' : ''}`}
                    value={values.name}
                    onChange={(event) => update('name', event.target.value)}
                  />
                )}
              </FormField>

              <FormField id="contact-phone" label={t(ui.phone)} error={errors.phone} required>
                {(props) => (
                  <input
                    {...props}
                    type="tel"
                    autoComplete="tel"
                    className={`input ${errors.phone ? 'input-error' : ''}`}
                    value={values.phone}
                    onChange={(event) => update('phone', event.target.value)}
                  />
                )}
              </FormField>

              <FormField
                id="contact-method"
                label={t(ui.preferredMethod)}
                error={errors.method}
                required
              >
                {(props) => (
                  <select
                    {...props}
                    className="input"
                    value={values.method}
                    onChange={(event) => update('method', event.target.value)}
                  >
                    {CONTACT_METHODS.map((method) => (
                      <option key={method.value} value={method.value}>
                        {t(method.label)}
                      </option>
                    ))}
                  </select>
                )}
              </FormField>

              <FormField
                id="contact-email"
                label={t(ui.email)}
                error={errors.email}
                required={values.method === 'email'}
                optionalLabel={values.method === 'email' ? undefined : t({ en: 'Optional', ms: 'Pilihan' })}
              >
                {(props) => (
                  <input
                    {...props}
                    type="email"
                    autoComplete="email"
                    className={`input ${errors.email ? 'input-error' : ''}`}
                    placeholder={t(ui.emailPlaceholder)}
                    value={values.email}
                    onChange={(event) => update('email', event.target.value)}
                  />
                )}
              </FormField>

              <FormField
                id="contact-interest"
                label={t(ui.interest)}
                error={errors.interest}
                required
                className="sm:col-span-2"
              >
                {(props) => (
                  <select
                    {...props}
                    className={`input ${errors.interest ? 'input-error' : ''}`}
                    value={values.interest}
                    onChange={(event) => update('interest', event.target.value)}
                  >
                    <option value="">{t({ en: 'Please select', ms: 'Sila pilih' })}</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {t(service.title)}
                      </option>
                    ))}
                    <option value="general">
                      {t({ en: 'General enquiry', ms: 'Pertanyaan umum' })}
                    </option>
                  </select>
                )}
              </FormField>

              <FormField
                id="contact-message"
                label={t(ui.message)}
                error={errors.message}
                required
                className="sm:col-span-2"
              >
                {(props) => (
                  <textarea
                    {...props}
                    rows={4}
                    className={`input ${errors.message ? 'input-error' : ''}`}
                    placeholder={t(ui.messagePlaceholder)}
                    value={values.message}
                    onChange={(event) => update('message', event.target.value)}
                  />
                )}
              </FormField>
            </div>

            {/* Consent */}
            <div className="mt-6">
              <label
                htmlFor="contact-consent"
                className="flex cursor-pointer items-start gap-3 text-sm text-body"
              >
                <input
                  id="contact-consent"
                  type="checkbox"
                  checked={values.consent}
                  onChange={(event) => update('consent', event.target.checked)}
                  aria-invalid={errors.consent ? 'true' : undefined}
                  aria-describedby={errors.consent ? 'contact-consent-error' : undefined}
                  className="mt-0.5 size-5 shrink-0 accent-accent"
                />
                <span>{t(ui.consent)}</span>
              </label>
              {errors.consent && (
                <p id="contact-consent-error" className="field-error">
                  <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                  <span>{t(errors.consent)}</span>
                </p>
              )}
            </div>

            <button type="submit" className="btn btn-primary btn-block mt-6">
              {values.method === 'email' ? (
                <>
                  <Mail aria-hidden="true" className="size-5" />
                  <span>{t(ui.submitEmail)}</span>
                </>
              ) : (
                <>
                  <FaWhatsapp aria-hidden="true" className="size-5" />
                  <span>{t(ui.submitWhatsApp)}</span>
                </>
              )}
            </button>

            {/* Notices */}
            <div className="mt-5 flex flex-col gap-3">
              <div className="flex items-start gap-3 rounded-xl border border-border bg-overlay-soft p-4">
                <ShieldAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-soft" />
                <p className="text-small text-muted">{t(ui.sensitiveNotice)}</p>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-border bg-overlay-soft p-4">
                <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-soft" />
                <p className="text-small text-muted">{t(ui.noStorageNotice)}</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
