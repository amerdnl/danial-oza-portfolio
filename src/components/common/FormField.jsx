/**
 * Labelled form control with accessible error handling.
 *
 * The label is always a real <label> tied to the control by id. Errors are
 * announced through aria-describedby and shown with an icon as well as
 * colour, so the state is never carried by colour alone.
 */

import { AlertCircle } from 'lucide-react'
import { useLanguage } from '../../i18n/languageContextValue'

export function FormField({
  id,
  label,
  error,
  hint,
  required = false,
  optionalLabel,
  children,
  className = '',
}) {
  const { t } = useLanguage()
  const errorId = `${id}-error`
  const hintId = `${id}-hint`

  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ')

  return (
    <div className={className}>
      <label htmlFor={id} className="label">
        {label}
        {required ? (
          <span className="ml-1 text-brand-soft" aria-hidden="true">
            *
          </span>
        ) : (
          optionalLabel && (
            <span className="ml-2 font-normal text-muted">({optionalLabel})</span>
          )
        )}
      </label>

      {children({
        id,
        'aria-invalid': error ? 'true' : undefined,
        'aria-describedby': describedBy || undefined,
        'aria-required': required || undefined,
      })}

      {hint && (
        <p id={hintId} className="field-hint">
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} className="field-error">
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <span>{t(error)}</span>
        </p>
      )}
    </div>
  )
}

export default FormField
