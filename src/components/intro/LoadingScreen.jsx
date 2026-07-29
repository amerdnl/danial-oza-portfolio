import { useLanguage } from '../../i18n/languageContextValue'
import { intro } from '../../i18n/ui'
import { advisor } from '../../data/advisor'

/**
 * The loading screen.
 *
 * Purely visual — it reports that the page is preparing and nothing more. No
 * invented technical or financial messages, and nothing implying that
 * personal data is being processed.
 *
 * Accessibility: one static status label. The percentage changes many times a
 * second, so it is aria-hidden rather than being announced repeatedly.
 */
export function LoadingScreen({ progress }) {
  const { t } = useLanguage()

  return (
    <div
      role="status"
      aria-label={t(intro.loadingA11y)}
      className="flex w-full max-w-md flex-col items-center px-6 text-center"
    >
      <p className="intro-fade-in text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
        {advisor.name}
      </p>
      <p
        className="intro-fade-in mt-2 text-xs font-medium uppercase tracking-[0.28em] text-[#B8B8B8]"
        style={{ animationDelay: '0.12s' }}
      >
        {t(advisor.title)}
      </p>

      {/* Progress line */}
      <div
        aria-hidden="true"
        className="intro-fade-in mt-9 h-px w-full overflow-hidden rounded-full bg-white/15"
        style={{ animationDelay: '0.24s' }}
      >
        <div
          className="h-full rounded-full bg-[#950101] shadow-[0_0_10px_0_rgba(255,0,0,0.55)] transition-[width] duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p
        aria-hidden="true"
        className="intro-fade-in mt-4 font-mono text-xs tabular-nums text-[#B8B8B8]"
        style={{ animationDelay: '0.24s' }}
      >
        {String(progress).padStart(2, '0')}
      </p>
    </div>
  )
}

export default LoadingScreen
