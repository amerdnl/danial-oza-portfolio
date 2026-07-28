/**
 * FAQ accordion.
 *
 * Each trigger is a real <button> inside an <h3>, wired to its panel with
 * aria-expanded and aria-controls. Arrow keys, Home, and End move between
 * triggers, which is the expected keyboard pattern for an accordion.
 */

import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { useLanguage } from '../../i18n/languageContextValue'
import { cta, previews, sections } from '../../i18n/ui'
import { faqs } from '../../data/faqs'
import { generalEnquiryUrl } from '../../utils/whatsapp'
import SectionHeading from '../common/SectionHeading'
import SectionCTA from '../common/SectionCTA'

export function FAQ({ preview = false, limit, showHeading = true }) {
  const { lang, t } = useLanguage()
  const visible = typeof limit === 'number' ? faqs.slice(0, limit) : faqs
  const [openId, setOpenId] = useState(null)
  const triggerRefs = useRef([])

  const toggle = (id) => setOpenId((current) => (current === id ? null : id))

  const onKeyDown = (event, index) => {
    const keys = ['ArrowDown', 'ArrowUp', 'Home', 'End']
    if (!keys.includes(event.key)) return
    event.preventDefault()

    const last = visible.length - 1
    let next = index
    if (event.key === 'ArrowDown') next = index === last ? 0 : index + 1
    if (event.key === 'ArrowUp') next = index === 0 ? last : index - 1
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = last

    triggerRefs.current[next]?.focus()
  }

  return (
    <section id="faq" className="section section-alt">
      <div className="container-page">
        <SectionHeading
            eyebrow={t(sections.faq.eyebrow)}
            title={t(sections.faq.heading)}
            intro={t(sections.faq.intro)}
          srOnly={!showHeading}
        />

        <div className="mx-auto mt-12 max-w-3xl">
          <ul className="flex flex-col gap-3">
            {visible.map((faq, index) => {
              const isOpen = openId === faq.id
              const triggerId = `faq-trigger-${faq.id}`
              const panelId = `faq-panel-${faq.id}`

              return (
                <li
                  key={faq.id}
                  className="overflow-hidden rounded-xl border border-border bg-overlay-soft"
                >
                  <h3>
                    <button
                      ref={(element) => {
                        triggerRefs.current[index] = element
                      }}
                      id={triggerId}
                      type="button"
                      onClick={() => toggle(faq.id)}
                      onKeyDown={(event) => onKeyDown(event, index)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-heading transition-colors hover:bg-hover-tint"
                    >
                      <span>{t(faq.question)}</span>
                      <ChevronDown
                        aria-hidden="true"
                        className={`size-5 shrink-0 text-brand-soft transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    hidden={!isOpen}
                    className="border-t border-border px-5 py-4"
                  >
                    <p className="text-small text-muted">{t(faq.answer)}</p>
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="mt-8 flex flex-col items-center gap-4 text-center">
            <p className="text-small text-muted">
              {t(sections.faq.stillHaveQuestions)}
            </p>
            <a
              href={generalEnquiryUrl(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <FaWhatsapp aria-hidden="true" className="size-5" />
              <span>{t(cta.chatWhatsApp)}</span>
            </a>
          </div>
        </div>

        {preview && <SectionCTA to="/faq" label={t(previews.readCommonQuestions)} />}
      </div>
    </section>
  )
}

export default FAQ
