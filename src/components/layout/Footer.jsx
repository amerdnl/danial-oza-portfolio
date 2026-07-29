/**
 * Site footer: identity, navigation, contact, social links, privacy notice,
 * the general disclaimer, and the clarification that this is a personal
 * advisor portfolio rather than an official corporate site.
 */

import { Link } from 'react-router-dom'
import { Mail, Phone, ArrowUp } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { useLanguage } from '../../i18n/languageContextValue'
import { footer } from '../../i18n/ui'
import { advisor } from '../../data/advisor'
import { navItems } from '../../routes/navItems'
import { generalEnquiryUrl } from '../../utils/whatsapp'
import SocialLinks from '../common/SocialLinks'

export function Footer() {
  const { lang, t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-page">
      <div className="container-page pb-24 pt-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Identity */}
          <div className="lg:col-span-1">
            <p className="text-lg font-extrabold text-heading">{advisor.name}</p>
            <p className="mt-1 text-sm font-semibold text-brand-soft">{t(advisor.title)}</p>
            <p className="text-small mt-1 text-muted">{advisor.company}</p>
            <p className="text-small mt-4 text-muted">{t(footer.tagline)}</p>
          </div>

          {/* Navigation */}
          <nav aria-label={t(footer.navigate)}>
            <h2 className="text-sm font-bold uppercase tracking-wider text-heading">
              {t(footer.navigate)}
            </h2>
            <ul className="mt-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-small text-muted transition-colors hover:text-heading"
                  >
                    {t(item.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-heading">
              {t(footer.contactHeading)}
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href={generalEnquiryUrl(lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-small inline-flex items-center gap-2 text-muted transition-colors hover:text-heading"
                >
                  <FaWhatsapp aria-hidden="true" className="size-4 shrink-0" />
                  <span>{advisor.contact.whatsappDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={advisor.contact.phoneHref}
                  className="text-small inline-flex items-center gap-2 text-muted transition-colors hover:text-heading"
                >
                  <Phone aria-hidden="true" className="size-4 shrink-0" />
                  <span>{advisor.contact.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={advisor.contact.emailHref}
                  className="text-small inline-flex items-start gap-2 break-all text-muted transition-colors hover:text-heading"
                >
                  <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                  <span>{advisor.contact.email}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-heading">
              {t(footer.followHeading)}
            </h2>
            <SocialLinks className="mt-4" />
          </div>
        </div>

        {/* Privacy + disclaimer */}
        <div className="mt-12 grid gap-8 border-t border-border pt-8 md:grid-cols-2">
          <section aria-labelledby="footer-privacy">
            <h2
              id="footer-privacy"
              className="text-sm font-bold uppercase tracking-wider text-heading"
            >
              {t(footer.privacyHeading)}
            </h2>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {t(footer.privacyBody)}
            </p>
          </section>

          <section aria-labelledby="footer-disclaimer">
            <h2
              id="footer-disclaimer"
              className="text-sm font-bold uppercase tracking-wider text-heading"
            >
              {t(footer.disclaimerHeading)}
            </h2>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {t(footer.disclaimerBody)}
            </p>
          </section>
        </div>

        {/* Not the official AIA site */}
        <p className="mt-8 rounded-xl border border-border bg-surface p-4 text-xs leading-relaxed text-muted">
          {t(footer.notOfficial)}
        </p>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted">
            © {year} {advisor.name}. {t(footer.rights)}
          </p>
          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                  ? 'auto'
                  : 'smooth',
              })
            }
            className="text-small inline-flex items-center gap-1.5 text-muted transition-colors hover:text-heading"
          >
            <ArrowUp aria-hidden="true" className="size-4" />
            {t(footer.backToTop)}
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
