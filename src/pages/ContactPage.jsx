/**
 * Contact — every way to reach Danial, plus the enquiry form and the
 * appointment form. Both open WhatsApp or an email draft; nothing is stored.
 */

import { useLanguage } from '../i18n/languageContextValue'
import { routeMeta } from '../i18n/ui'
import useDocumentMeta from '../hooks/useDocumentMeta'
import PageHeader from '../components/layout/PageHeader'
import Contact from '../components/sections/Contact'
import Booking from '../components/sections/Booking'

export function ContactPage() {
  const { t } = useLanguage()
  useDocumentMeta('contact')

  return (
    <>
      <PageHeader title={t(routeMeta.contact.heading)} intro={t(routeMeta.contact.intro)} />
      <Contact showHeading={false} />
      <Booking />
    </>
  )
}

export default ContactPage
