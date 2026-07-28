/**
 * Recommendation — the full questionnaire.
 *
 * Answers are held in RecommendationContext (in-memory only, never stored),
 * so progress survives navigating away and back during the same session.
 */

import { useLanguage } from '../i18n/languageContextValue'
import { routeMeta } from '../i18n/ui'
import useDocumentMeta from '../hooks/useDocumentMeta'
import PageHeader from '../components/layout/PageHeader'
import RecommendationTool from '../components/sections/RecommendationTool'

export function RecommendationPage() {
  const { t } = useLanguage()
  useDocumentMeta('recommendation')

  return (
    <>
      <PageHeader
        title={t(routeMeta.recommendation.heading)}
        intro={t(routeMeta.recommendation.intro)}
      />
      <RecommendationTool showHeading={false} />
    </>
  )
}

export default RecommendationPage
