/**
 * Shared button.
 *
 * Renders a real <button> by default, or an <a> when `href` is given, so
 * links are never faked with clickable divs.
 *
 * External links automatically get target="_blank" plus
 * rel="noopener noreferrer" and a screen-reader hint that a new tab opens.
 */

import { useLanguage } from '../../i18n/languageContextValue'
import { common } from '../../i18n/ui'

const VARIANTS = {
  primary: 'btn btn-primary',
  secondary: 'btn btn-secondary',
  ghost: 'btn btn-ghost',
}

export function Button({
  as,
  href,
  variant = 'primary',
  external = false,
  fullWidth = false,
  className = '',
  children,
  icon: Icon,
  iconPosition = 'left',
  type = 'button',
  ...rest
}) {
  const { t } = useLanguage()

  const classes = [VARIANTS[variant] ?? VARIANTS.primary, fullWidth ? 'btn-block' : '', className]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon aria-hidden="true" className="size-[1.15em] shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon aria-hidden="true" className="size-[1.15em] shrink-0" />}
      {external && <span className="sr-only"> ({t(common.opensInNewTab)})</span>}
    </>
  )

  if (href) {
    const externalProps = external
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {}
    return (
      <a href={href} className={classes} {...externalProps} {...rest}>
        {content}
      </a>
    )
  }

  const Component = as ?? 'button'
  return (
    <Component type={type} className={classes} {...rest}>
      {content}
    </Component>
  )
}

export default Button
