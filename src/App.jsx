/**
 * Application root.
 *
 * A routed single-page application: navigation happens client-side through
 * React Router, with no full page reloads. See src/routes/AppRoutes.jsx for
 * the route table.
 *
 * Provider order matters — ThemeProvider sits outermost so the theme applies
 * to everything, and LanguageProvider wraps the router because navigation
 * chrome and page metadata are both bilingual.
 */

import { BrowserRouter } from 'react-router-dom'
import ThemeProvider from './context/ThemeContext'
import RecommendationProvider from './context/RecommendationContext'
import { LanguageProvider } from './i18n/LanguageContext'
import AppRoutes from './routes/AppRoutes'

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <RecommendationProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </RecommendationProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
