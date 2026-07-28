import { createContext, useContext } from 'react'
import { questionnaireSteps } from '../data/questionnaire'

/**
 * Questionnaire state, lifted out of the component so progress survives
 * navigating away from /recommendation and back within the same session.
 *
 * ⚠️ IN-MEMORY ONLY. These answers describe someone's dependants, existing
 * coverage, and financial responsibilities, so they are never written to
 * localStorage, sessionStorage, or a cookie. Closing or reloading the tab
 * clears them, which is the intended behaviour.
 */

/** Five question steps plus the results screen. */
export const TOTAL_STEPS = questionnaireSteps.length + 1

export const initialRecommendationState = {
  stepIndex: 0,
  answers: {},
  errors: {},
  showResults: false,
}

export function recommendationReducer(state, action) {
  switch (action.type) {
    case 'answer': {
      const { name, value } = action
      return {
        ...state,
        answers: { ...state.answers, [name]: value },
        // Clear this field's error as soon as it is answered.
        errors: { ...state.errors, [name]: undefined },
      }
    }
    case 'toggle': {
      const { name, value } = action
      const current = Array.isArray(state.answers[name]) ? state.answers[name] : []
      const next = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
      return {
        ...state,
        answers: { ...state.answers, [name]: next },
        errors: { ...state.errors, [name]: undefined },
      }
    }
    case 'errors':
      return { ...state, errors: action.errors }
    case 'next':
      return { ...state, stepIndex: state.stepIndex + 1, errors: {} }
    case 'back':
      return { ...state, stepIndex: Math.max(0, state.stepIndex - 1), errors: {} }
    case 'results':
      return { ...state, showResults: true, errors: {} }
    case 'reset':
      return initialRecommendationState
    default:
      return state
  }
}

export const RecommendationContext = createContext(null)

export function useRecommendation() {
  const context = useContext(RecommendationContext)
  if (!context) {
    throw new Error('useRecommendation must be used inside a <RecommendationProvider>')
  }
  return context
}
