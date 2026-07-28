/**
 * Trust bar — six factual indicators drawn from the advisor config.
 * Scrolls horizontally with snap points on small screens.
 */

import { Users, CalendarDays, Wallet, MapPin, Languages, Video } from 'lucide-react'
import { useLanguage } from '../../i18n/languageContextValue'
import { trustBar } from '../../i18n/ui'
import { advisor } from '../../data/advisor'

export function TrustBar() {
  const { t } = useLanguage()

  const items = [
    { icon: Users, value: advisor.clientsHelped, label: trustBar.clientsHelped, highlight: true },
    { icon: CalendarDays, value: t(advisor.experienceLabel), label: trustBar.experience },
    { icon: Wallet, value: t(advisor.consultationFee), label: trustBar.consultationFee, highlight: true },
    { icon: MapPin, value: t(advisor.location), label: trustBar.coverage },
    { icon: Languages, value: t(advisor.languagesShort), label: trustBar.languages },
    { icon: Video, value: t(advisor.consultationMethodsShort), label: trustBar.consultationTypes },
  ]

  return (
    <section
      aria-label={t({ en: 'Practice at a glance', ms: 'Ringkasan perkhidmatan' })}
      className="border-y border-border bg-surface"
    >
      <div className="container-page py-8">
        <ul className="snap-row -mx-1 flex gap-3 overflow-x-auto px-1 pb-1 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible lg:grid-cols-6">
          {items.map((item) => (
            <li
              key={item.label.en}
              className="snap-item flex min-w-[13rem] shrink-0 items-start gap-3 sm:min-w-0"
            >
              <item.icon
                aria-hidden="true"
                className={`mt-0.5 size-5 shrink-0 ${
                  item.highlight ? 'text-accent' : 'text-brand-soft'
                }`}
              />
              <div className="min-w-0">
                <p className="text-sm font-bold leading-snug text-heading">{item.value}</p>
                <p className="text-xs text-muted">{t(item.label)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default TrustBar
