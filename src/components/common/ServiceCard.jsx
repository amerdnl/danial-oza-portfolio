/**
 * Service card with a "Learn more" disclosure.
 *
 * A disclosure rather than a modal: it avoids a focus trap, behaves well on
 * small screens, and keeps the extra detail in the normal reading order.
 * The trigger is a real button wired to the panel with aria-expanded and
 * aria-controls.
 */

import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown, Check } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { useLanguage } from '../../i18n/languageContextValue'
import { cta, sections } from '../../i18n/ui'
import { serviceEnquiryUrl } from '../../utils/whatsapp'
import Icon from './Icon'

/**
 * @param {boolean} compact  home-page preview mode: shows the summary and a
 *                           single link through to the services page, without
 *                           the disclosure panel or the per-service CTAs
 */
export function ServiceCard({ service, compact = false }) {
  const { lang, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const buttonId = useId()

  if (compact) {
    return (
      <article className="card card-hover flex h-full flex-col">
        <Icon name={service.icon} className="size-7 text-brand-soft" />
        <h3 className="mt-4 text-h3">{t(service.title)}</h3>
        <p className="text-small mt-3 text-muted">{t(service.summary)}</p>
        <Link
          to="/services"
          className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-6 text-sm font-semibold text-heading transition-colors hover:text-brand-soft"
        >
          {t(cta.learnMore)}
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </article>
    )
  }

  return (
    <article className="card card-hover flex h-full flex-col">
      <Icon name={service.icon} className="size-7 text-brand-soft" />

      <h3 className="mt-4 text-h3">{t(service.title)}</h3>

      <p className="text-small mt-3 text-muted">{t(service.summary)}</p>

      {/* Disclosure */}
      <button
        id={buttonId}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className="mt-4 inline-flex min-h-11 w-fit items-center gap-1.5 rounded-lg text-sm font-semibold text-heading transition-colors hover:text-brand-soft"
      >
        {open ? t(cta.showLess) : t(cta.learnMore)}
        <ChevronDown
          aria-hidden="true"
          className={`size-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open} className="mt-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">
          {t(sections.services.considerationsLabel)}
        </p>
        <ul className="mt-3 flex flex-col gap-2">
          {service.considerations.map((consideration) => (
            <li key={consideration.en} className="flex items-start gap-2 text-sm text-body">
              <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-soft" />
              {t(consideration)}
            </li>
          ))}
        </ul>
      </div>

      {/* CTAs sit at the bottom regardless of card height */}
      <div className="mt-auto flex flex-col gap-2 pt-6 sm:flex-row">
        <Link to="/recommendation" className="btn btn-secondary !min-h-10 flex-1 !px-3 !text-sm">
          {t(cta.getRecommendation)}
        </Link>
        <a
          href={serviceEnquiryUrl(lang, service.id)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost !min-h-10 flex-1 !px-3 !text-sm"
        >
          <FaWhatsapp aria-hidden="true" className="size-4" />
          <span>{t(cta.askAboutThis)}</span>
        </a>
      </div>
    </article>
  )
}

export default ServiceCard
