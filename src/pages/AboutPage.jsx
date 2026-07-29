/**
 * About — the full advisor profile: biography, approach, who he works with,
 * and how a consultation runs.
 */

import { Link } from 'react-router-dom'
import { CalendarCheck, ShieldCheck } from 'lucide-react'
import { useLanguage } from '../i18n/languageContextValue'
import { cta, routeMeta } from '../i18n/ui'
import useDocumentMeta from '../hooks/useDocumentMeta'
import PageHeader from '../components/layout/PageHeader'
import About from '../components/sections/About'
import WhyChooseMe from '../components/sections/WhyChooseMe'
import ClientTypes from '../components/sections/ClientTypes'
import Process from '../components/sections/Process'

export function AboutPage() {
  const { t } = useLanguage()
  useDocumentMeta('about')

  return (
    <>
      <PageHeader title={t(routeMeta.about.heading)} intro={t(routeMeta.about.intro)}>
        <Link to="/contact" className="btn btn-primary">
          <CalendarCheck aria-hidden="true" className="size-5" />
          <span>{t(cta.bookFree)}</span>
        </Link>
        <Link to="/services" className="btn btn-secondary">
          <ShieldCheck aria-hidden="true" className="size-5" />
          <span>{t({ en: 'View services', ms: 'Lihat perkhidmatan' })}</span>
        </Link>
      </PageHeader>

      <About showHeading={false} />
      <WhyChooseMe />
      <ClientTypes />
      <Process />
    </>
  )
}

export default AboutPage
