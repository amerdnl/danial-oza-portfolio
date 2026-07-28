/**
 * Social profile links.
 *
 * Every URL is checked with `isSafeExternalUrl` before rendering, and all
 * links open in a new tab with rel="noopener noreferrer".
 */

import { FaInstagram, FaFacebookF, FaLinkedinIn, FaTiktok } from 'react-icons/fa'
import { advisor } from '../../data/advisor'
import { isSafeExternalUrl } from '../../utils/validation'
import { useLanguage } from '../../i18n/languageContextValue'
import { common } from '../../i18n/ui'

const ICONS = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  linkedin: FaLinkedinIn,
  tiktok: FaTiktok,
}

export function SocialLinks({ className = '', showHandles = false }) {
  const { t } = useLanguage()
  const links = advisor.social.filter((item) => isSafeExternalUrl(item.url))

  if (links.length === 0) return null

  if (showHandles) {
    return (
      <ul className={`flex flex-col gap-3 ${className}`}>
        {links.map((item) => {
          const Icon = ICONS[item.id]
          return (
            <li key={item.id}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-small inline-flex items-center gap-3 text-muted transition-colors hover:text-heading"
              >
                {Icon && <Icon aria-hidden="true" className="size-4 shrink-0" />}
                <span>
                  {item.label}
                  <span className="ml-2 text-muted">{item.handle}</span>
                </span>
                <span className="sr-only"> ({t(common.opensInNewTab)})</span>
              </a>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {links.map((item) => {
        const Icon = ICONS[item.id]
        return (
          <li key={item.id}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.label} — ${advisor.name} (${t(common.opensInNewTab)})`}
              className="inline-flex size-11 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-brand hover:text-heading"
            >
              {Icon && <Icon aria-hidden="true" className="size-4" />}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default SocialLinks
