/**
 * Floating WhatsApp button.
 *
 * Appears once the visitor has scrolled past the hero so it never competes
 * with the hero CTAs. It is a real link, keyboard reachable, with a visible
 * label on wider screens and an accessible name at every size.
 */

import { useEffect, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { useLanguage } from '../../i18n/languageContextValue'
import { cta } from '../../i18n/ui'
import { generalEnquiryUrl } from '../../utils/whatsapp'

export function WhatsAppButton() {
  const { lang, t } = useLanguage()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const label = t(cta.floatingWhatsApp)

  // Styled with the locked palette gradient rather than WhatsApp green —
  // the icon carries the recognition.
  return (
    <a
      href={generalEnquiryUrl(lang)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`bg-cta-gradient text-on-accent fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full px-4 py-3 font-semibold shadow-lg shadow-black/40 transition-all duration-300 hover:brightness-110 sm:bottom-7 sm:right-7 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <FaWhatsapp aria-hidden="true" className="size-6 shrink-0" />
      <span className="hidden text-sm sm:inline">{t(cta.chatWhatsApp)}</span>
    </a>
  )
}

export default WhatsAppButton
