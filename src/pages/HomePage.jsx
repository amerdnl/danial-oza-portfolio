/**
 * Home — an overview that introduces Danial and routes visitors to the full
 * pages, rather than carrying every section in full.
 *
 * Each block below is the same component used on its dedicated page, rendered
 * with `preview` so nothing long is duplicated across routes.
 */

import { Link } from 'react-router-dom'
import { CalendarCheck } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { useLanguage } from '../i18n/languageContextValue'
import { cta, previews } from '../i18n/ui'
import { generalEnquiryUrl } from '../utils/whatsapp'
import useDocumentMeta from '../hooks/useDocumentMeta'
import Hero from '../components/sections/Hero'
import TrustBar from '../components/sections/TrustBar'
import About from '../components/sections/About'
import Services from '../components/sections/Services'
import ClientTypes from '../components/sections/ClientTypes'
import RecommendationTool from '../components/sections/RecommendationTool'
import WhyChooseMe from '../components/sections/WhyChooseMe'
import Process from '../components/sections/Process'
import Achievements from '../components/sections/Achievements'
import FAQ from '../components/sections/FAQ'

export function HomePage() {
  const { lang, t } = useLanguage()
  useDocumentMeta('home')

  return (
    <>
      {/* Hero carries this page's <h1>. */}
      <Hero />
      <TrustBar />

      <About preview />
      <Services preview limit={3} />
      <ClientTypes preview limit={3} />
      <RecommendationTool preview />
      <WhyChooseMe preview limit={4} />
      <Process preview />
      <Achievements preview />
      <FAQ preview limit={3} />

      {/* Closing call to action */}
      <section className="section">
        <div className="container-page">
          <div className="card card-hover mx-auto max-w-3xl text-center">
            <h2 className="text-h2">{t(previews.finalCta.heading)}</h2>
            <p className="text-lead mt-4 text-muted">{t(previews.finalCta.body)}</p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/contact" className="btn btn-primary">
                <CalendarCheck aria-hidden="true" className="size-5" />
                <span>{t(cta.bookFree)}</span>
              </Link>
              <a
                href={generalEnquiryUrl(lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <FaWhatsapp aria-hidden="true" className="size-5" />
                <span>{t(cta.chatWhatsApp)}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
