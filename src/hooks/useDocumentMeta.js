import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '../i18n/languageContextValue'
import { routeMeta } from '../i18n/ui'
import { advisor } from '../data/advisor'

/**
 * Per-route document metadata.
 *
 * Deliberately dependency-free — react-helmet would add weight to do what a
 * dozen lines of DOM updates already handle here. Reruns whenever the route
 * or the selected language changes, so metadata never goes stale between
 * navigations.
 *
 * @param {string} key      a key from `routeMeta` in src/i18n/ui.js
 * @param {object} options  `{ noIndex }` for pages that should not be indexed
 */
export function useDocumentMeta(key, { noIndex = false } = {}) {
  const { lang, t } = useLanguage()
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = routeMeta[key]
    if (!meta) return

    const title = t(meta.title)
    const description = t(meta.description)
    const url = `${advisor.siteUrl.replace(/\/$/, '')}${pathname}`

    document.title = title
    setMetaByName('description', description)
    setMetaByName('robots', noIndex ? 'noindex, follow' : 'index, follow')

    setMetaByProperty('og:title', title)
    setMetaByProperty('og:description', description)
    setMetaByProperty('og:url', url)
    setMetaByProperty('og:locale', lang === 'ms' ? 'ms_MY' : 'en_MY')

    setMetaByName('twitter:title', title)
    setMetaByName('twitter:description', description)

    setCanonical(url)
  }, [key, lang, t, pathname, noIndex])
}

function setMetaByName(name, content) {
  if (!content) return
  let tag = document.querySelector(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function setMetaByProperty(property, content) {
  if (!content) return
  let tag = document.querySelector(`meta[property="${property}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('property', property)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function setCanonical(url) {
  let link = document.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', url)
}

export default useDocumentMeta
