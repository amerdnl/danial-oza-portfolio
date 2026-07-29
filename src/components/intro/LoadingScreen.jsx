import { useLanguage } from '../../i18n/languageContextValue'
import { intro } from '../../i18n/ui'
import { advisor } from '../../data/advisor'

/**
 * The loading screen.
 *
 * Purely visual — it reports that the page is preparing and nothing more.
 * Uses the site's light palette so there is no dark moment before the page. No
 * invented technical or financial messages, and nothing implying that
 * personal data is being processed.
 *
 * Accessibility: one static status label. The visual progress bar is hidden
 * from assistive technology, so changing progress is never announced.
 */
export function LoadingScreen({ progress }) {
  const { t } = useLanguage()

  return (
    <div
      role="status"
      aria-label={t(intro.loadingA11y)}
      className="flex w-full max-w-md flex-col items-center px-6 text-center"
    >
      <p className="text-2xl font-extrabold tracking-tight text-heading sm:text-3xl">
        {advisor.name}
      </p>
      <p className="mt-2 text-xs font-medium uppercase tracking-[0.28em] text-muted">
        {t(advisor.title)}
      </p>

      {/* Progress line */}
      <div aria-hidden="true" className="mt-9 h-px w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-full origin-left rounded-full bg-brand shadow-[0_0_8px_0_rgba(149,1,1,0.35)] transition-transform duration-200 ease-out"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>
    </div>
  )
}

export default LoadingScreen
