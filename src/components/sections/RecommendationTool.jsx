/**
 * ============================================================================
 * RECOMMENDATION QUESTIONNAIRE
 * ============================================================================
 * A six-stage flow: five question steps plus a results screen.
 *
 * State is held in a reducer so Back always preserves previous answers and
 * Reset clears everything in one action.
 *
 * Accessibility:
 *  - each question is a fieldset with a legend, so screen readers announce
 *    the question before the options
 *  - radio and checkbox inputs are real inputs, visually restyled
 *  - validation errors are text + icon (never colour alone) and are wired to
 *    the group with aria-describedby
 *  - step changes are announced through an aria-live region
 * ============================================================================
 */

import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  Info,
  RotateCcw,
  Sparkles,
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { useLanguage } from '../../i18n/languageContextValue'
import { previews, recommendation as ui } from '../../i18n/ui'
import { questionnaireSteps } from '../../data/questionnaire'
import { servicesById } from '../../data/services'
import { getRecommendations, RESULT_LIMITATIONS } from '../../utils/recommendationEngine'
import { recommendationUrl } from '../../utils/whatsapp'
import { TOTAL_STEPS, useRecommendation } from '../../context/recommendationContextValue'
import SectionHeading from '../common/SectionHeading'
import Icon from '../common/Icon'

/**
 * @param {boolean} preview  home-page mode: renders an explainer and a link to
 *                           /recommendation instead of the questionnaire, so
 *                           the form itself exists on exactly one route
 */
export function RecommendationTool({ preview = false, showHeading = true }) {
  const { lang, t } = useLanguage()
  // State lives in a provider so progress survives navigating away and back.
  // It is in-memory only and never written to storage — see
  // src/context/recommendationContextValue.js
  const { state, dispatch } = useRecommendation()
  const [announcement, setAnnouncement] = useState('')
  const panelRef = useRef(null)

  const { stepIndex, answers, errors, showResults } = state
  const step = questionnaireSteps[stepIndex]

  const results = useMemo(
    () => (showResults ? getRecommendations(answers) : null),
    [showResults, answers],
  )

  const currentStepNumber = showResults ? TOTAL_STEPS : stepIndex + 1
  const progressPercent = Math.round((currentStepNumber / TOTAL_STEPS) * 100)

  /** Move focus to the top of the newly rendered step. */
  const focusPanel = () => {
    window.requestAnimationFrame(() => panelRef.current?.focus())
  }

  const validateStep = () => {
    const nextErrors = {}
    for (const field of step.fields) {
      const value = answers[field.name]
      if (field.type === 'multiple') {
        if (!Array.isArray(value) || value.length === 0) {
          nextErrors[field.name] = ui.requiredMultiError
        }
      } else if (!value) {
        nextErrors[field.name] = ui.requiredError
      }
    }
    return nextErrors
  }

  const handleNext = () => {
    const nextErrors = validateStep()
    if (Object.keys(nextErrors).length > 0) {
      dispatch({ type: 'errors', errors: nextErrors })
      setAnnouncement(t(ui.incompleteStep))
      // Focus the first group that failed so keyboard users land on it.
      window.requestAnimationFrame(() => {
        const firstField = step.fields.find((field) => nextErrors[field.name])
        if (!firstField) return
        const input = panelRef.current?.querySelector(`input[name="${firstField.name}"]`)
        input?.focus()
      })
      return
    }

    if (stepIndex === questionnaireSteps.length - 1) {
      dispatch({ type: 'results' })
      setAnnouncement(t(ui.resultsHeading))
    } else {
      dispatch({ type: 'next' })
      setAnnouncement(
        t(ui.stepOf).replace('{current}', String(stepIndex + 2)).replace('{total}', String(TOTAL_STEPS)),
      )
    }
    focusPanel()
  }

  const handleBack = () => {
    dispatch({ type: 'back' })
    setAnnouncement(
      t(ui.stepOf).replace('{current}', String(stepIndex)).replace('{total}', String(TOTAL_STEPS)),
    )
    focusPanel()
  }

  const handleReset = () => {
    dispatch({ type: 'reset' })
    setAnnouncement(t(ui.stepOf).replace('{current}', '1').replace('{total}', String(TOTAL_STEPS)))
    focusPanel()
  }

  /* ---------------------------------------------------------------- preview
     The home page explains the tool and links to it; the questionnaire itself
     lives only on /recommendation. */
  if (preview) {
    const teaser = previews.recommendationTeaser
    return (
      <section id="recommendations" className="section section-alt">
        <div className="container-page">
          <div className="card card-on-alt mx-auto max-w-3xl text-center">
            <Sparkles aria-hidden="true" className="mx-auto size-8 text-accent" />
            <h2 className="text-h2 mt-5">{t(teaser.heading)}</h2>
            <p className="text-lead mt-4 text-muted">{t(teaser.body)}</p>

            <ul className="mt-6 flex flex-wrap justify-center gap-2">
              {teaser.points.map((point) => (
                <li key={point.en} className="chip">
                  <Check aria-hidden="true" className="size-3.5 text-brand-soft" />
                  {t(point)}
                </li>
              ))}
            </ul>

            <Link to="/recommendation" className="btn btn-primary mt-8">
              <Sparkles aria-hidden="true" className="size-5" />
              <span>{t(previews.getYourRecommendation)}</span>
            </Link>
          </div>
        </div>
      </section>
    )
  }

  /* ---------------------------------------------------------- questionnaire */
  return (
    <section id="recommendations" className="section section-alt">
      <div className="container-page">
        <SectionHeading eyebrow={t(ui.eyebrow)} title={t(ui.heading)} intro={t(ui.intro)}
          srOnly={!showHeading}
        />

        <div className={`mx-auto max-w-3xl ${showHeading ? 'mt-12' : ''}`}>
          {/* Progress */}
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between text-sm">
              <p className="font-semibold text-heading">
                {showResults
                  ? t(ui.resultsHeading)
                  : t(ui.stepOf)
                      .replace('{current}', String(currentStepNumber))
                      .replace('{total}', String(TOTAL_STEPS))}
              </p>
              <p className="text-muted">{progressPercent}%</p>
            </div>
            <div
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={t(ui.progressLabel)}
              className="h-2 w-full overflow-hidden rounded-full bg-overlay-soft"
            >
              <div
                className="bg-cta-gradient h-full rounded-full transition-[width] duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Live region for step changes */}
          <p aria-live="polite" className="sr-only">
            {announcement}
          </p>

          <div
            ref={panelRef}
            tabIndex={-1}
            className="card !p-5 focus:outline-none sm:!p-7"
          >
            {/* `key` restarts the CSS entrance animation on every step change. */}
            {showResults ? (
              <div key="results" className="animate-fade-up">
                <Results
                  results={results}
                  answers={answers}
                  lang={lang}
                  t={t}
                  onReset={handleReset}
                />
              </div>
            ) : (
              <div key={step.id} className="animate-fade-up">
                <h3 className="text-h3">{t(step.title)}</h3>
                <p className="text-small mt-2 text-muted">
                  {t(step.description)}
                </p>

                <div className="mt-7 flex flex-col gap-7">
                  {step.fields.map((field) => (
                    <QuestionField
                      key={field.name}
                      field={field}
                      value={answers[field.name]}
                      error={errors[field.name]}
                      t={t}
                      onSelect={(value) =>
                        dispatch({ type: 'answer', name: field.name, value })
                      }
                      onToggle={(value) =>
                        dispatch({ type: 'toggle', name: field.name, value })
                      }
                    />
                  ))}
                </div>

                {/* Navigation */}
                <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={stepIndex === 0}
                    className="btn btn-ghost sm:w-auto"
                  >
                    <ArrowLeft aria-hidden="true" className="size-4" />
                    <span>{t(ui.back)}</span>
                  </button>

                  <button type="button" onClick={handleNext} className="btn btn-primary sm:w-auto">
                    <span>
                      {stepIndex === questionnaireSteps.length - 1
                        ? t(ui.seeResults)
                        : t(ui.next)}
                    </span>
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </button>
                </div>

                <p className="text-small mt-4 text-muted">{t(ui.privacyNote)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/** One question: a radio group or a checkbox group. */
function QuestionField({ field, value, error, t, onSelect, onToggle }) {
  const errorId = `${field.name}-error`
  const isMultiple = field.type === 'multiple'

  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className="text-base font-semibold text-heading">{t(field.label)}</legend>
      <p className="text-small mt-1 text-muted">
        {isMultiple ? t(ui.selectMultiple) : t(ui.selectOne)}
      </p>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {field.options.map((option) => {
          const checked = isMultiple
            ? Array.isArray(value) && value.includes(option.value)
            : value === option.value

          return (
            <label
              key={option.value}
              className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${
                checked
                  ? 'border-[var(--color-accent)] bg-[rgba(149,1,1,0.28)] text-heading'
                  : 'border-border bg-overlay-soft text-body hover:border-border-strong'
              }`}
            >
              <input
                type={isMultiple ? 'checkbox' : 'radio'}
                name={field.name}
                value={option.value}
                checked={checked}
                onChange={() => (isMultiple ? onToggle(option.value) : onSelect(option.value))}
                className="size-4 shrink-0 accent-accent"
              />
              <span>{t(option.label)}</span>
            </label>
          )
        })}
      </div>

      {error && (
        <p id={errorId} className="field-error">
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <span>{t(error)}</span>
        </p>
      )}
    </fieldset>
  )
}

/** Results screen. */
function Results({ results, answers, lang, t, onReset }) {
  const areas = results?.areas ?? []
  const whatsappHref = recommendationUrl(lang, answers, areas)

  return (
    <div>
      <div className="flex items-start gap-3">
        <Sparkles aria-hidden="true" className="mt-1 size-6 shrink-0 text-accent" />
        <div>
          <h3 className="text-h3">{t(ui.resultsHeading)}</h3>
          <p className="text-small mt-2 text-muted">{t(ui.resultsIntro)}</p>
        </div>
      </div>

      {/* Suggested areas */}
      <ul className="mt-7 flex flex-col gap-4">
        {areas.map((area) => {
          const service = servicesById[area.categoryId]
          if (!service) return null
          return (
            <li
              key={area.categoryId}
              className="rounded-2xl border border-border bg-overlay-soft p-5"
            >
              <div className="flex items-center gap-3">
                <Icon name={service.icon} className="size-6 shrink-0 text-brand-soft" />
                <h4 className="text-base font-bold text-heading">{t(service.title)}</h4>
              </div>

              <p className="text-small mt-3 text-body">{t(service.summary)}</p>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted">
                {t(ui.whyRelevant)}
              </p>
              <ul className="mt-2 flex flex-col gap-1.5">
                {area.reasons.map((reason) => (
                  <li key={reason.id} className="text-sm text-muted">
                    • {t(reason.text)}
                  </li>
                ))}
              </ul>
            </li>
          )
        })}
      </ul>

      {/* Limitations */}
      <div className="mt-7 rounded-2xl border border-border bg-overlay-soft p-5">
        <h4 className="flex items-center gap-2 text-sm font-bold text-heading">
          <Info aria-hidden="true" className="size-4 shrink-0 text-brand-soft" />
          {t(ui.limitationsHeading)}
        </h4>
        <ul className="mt-3 flex flex-col gap-2">
          {RESULT_LIMITATIONS.map((limitation) => (
            <li key={limitation.id} className="text-small text-muted">
              • {t(limitation.text)}
            </li>
          ))}
        </ul>
      </div>

      {/* Next step */}
      <div className="mt-7">
        <h4 className="text-base font-bold text-heading">{t(ui.nextStepHeading)}</h4>
        <p className="text-small mt-2 text-muted">{t(ui.nextStepBody)}</p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <FaWhatsapp aria-hidden="true" className="size-5" />
            <span>{t(ui.sendResults)}</span>
          </a>
          <button type="button" onClick={onReset} className="btn btn-ghost">
            <RotateCcw aria-hidden="true" className="size-4" />
            <span>{t(ui.startOver)}</span>
          </button>
        </div>
      </div>

      {/* Mandatory disclaimer */}
      <p className="mt-7 rounded-xl border border-border bg-surface p-4 text-xs leading-relaxed text-muted">
        {t(ui.disclaimer)}
      </p>
    </div>
  )
}

export default RecommendationTool
