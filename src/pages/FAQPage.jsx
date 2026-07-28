/**
 * FAQ — all fifteen questions in the accessible accordion.
 */

import { useLanguage } from '../i18n/languageContextValue'
import { routeMeta } from '../i18n/ui'
import useDocumentMeta from '../hooks/useDocumentMeta'
import PageHeader from '../components/layout/PageHeader'
import FAQ from '../components/sections/FAQ'

export function FAQPage() {
  const { t } = useLanguage()
  useDocumentMeta('faq')

  return (
    <>
      <PageHeader title={t(routeMeta.faq.heading)} intro={t(routeMeta.faq.intro)} />
      <FAQ showHeading={false} />
    </>
  )
}

export default FAQPage
