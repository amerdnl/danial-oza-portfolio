/**
 * Application root.
 *
 * A routed single-page application: navigation happens client-side through
 * React Router, with no full page reloads. See src/routes/AppRoutes.jsx for
 * the route table.
 *
 * LanguageProvider wraps the router because navigation chrome and page
 * metadata are both bilingual. There is no theme provider — the site has one
 * permanent light theme, defined entirely in src/index.css.
 *
 * THE INTRO OVERLAY
 * On the first visit of a browser session, IntroExperience covers the page
 * with a brief loading screen that dismisses itself — no interaction is
 * required. It is an overlay, not a gate: the portfolio below stays mounted
 * and rendered throughout, which keeps the content crawlable and lets the
 * hero image finish loading before the reveal. While the overlay is up, the
 * portfolio is marked `inert`, which removes it from the tab order, the
 * accessibility tree, and pointer events in one attribute — so there is
 * nothing focusable hidden behind the loader.
 *
 * There is still exactly one router; the intro never navigates, so whichever
 * route the visitor requested is the one revealed.
 */

import { BrowserRouter } from 'react-router-dom'
import RecommendationProvider from './context/RecommendationContext'
import { LanguageProvider } from './i18n/LanguageContext'
import AppRoutes from './routes/AppRoutes'
import IntroExperience from './components/intro/IntroExperience'
import useIntroExperience from './hooks/useIntroExperience'

export function App() {
  const intro = useIntroExperience()

  return (
    <LanguageProvider>
      <RecommendationProvider>
        <IntroExperience
          state={intro.state}
          progress={intro.progress}
          isBlocking={intro.isBlocking}
        />

        <div inert={intro.isBlocking} aria-hidden={intro.isBlocking || undefined}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </div>
      </RecommendationProvider>
    </LanguageProvider>
  )
}

export default App
