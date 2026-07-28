/**
 * Standard section heading: eyebrow, title, and optional intro paragraph.
 *
 * `srOnly` keeps the heading in the document outline while hiding it
 * visually. Pages that already show the same title in their PageHeader use
 * this, so the outline never jumps from <h1> straight to <h3>.
 */

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  level = 2,
  align = 'center',
  srOnly = false,
  className = '',
}) {
  const Heading = `h${level}`

  if (srOnly) {
    return (
      <Heading id={id} className="sr-only">
        {title}
      </Heading>
    )
  }

  const alignment = align === 'left' ? 'text-left' : 'text-center mx-auto'

  return (
    <div className={`max-w-3xl ${alignment} ${className}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <Heading id={id} className="text-h2">
        {title}
      </Heading>
      {intro && <p className="text-lead mt-4 text-muted">{intro}</p>}
    </div>
  )
}

export default SectionHeading
