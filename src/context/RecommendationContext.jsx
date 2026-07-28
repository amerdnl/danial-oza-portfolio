import { useMemo, useReducer } from 'react'
import {
  RecommendationContext,
  initialRecommendationState,
  recommendationReducer,
} from './recommendationContextValue'

/**
 * Holds the questionnaire answers for the lifetime of the page session.
 *
 * See recommendationContextValue.js — this state is intentionally never
 * persisted to storage.
 */
export function RecommendationProvider({ children }) {
  const [state, dispatch] = useReducer(recommendationReducer, initialRecommendationState)

  const value = useMemo(() => ({ state, dispatch }), [state])

  return (
    <RecommendationContext.Provider value={value}>{children}</RecommendationContext.Provider>
  )
}

export default RecommendationProvider
