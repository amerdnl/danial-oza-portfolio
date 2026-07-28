import { Route, Routes } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import HomePage from '../pages/HomePage'
import AboutPage from '../pages/AboutPage'
import ServicesPage from '../pages/ServicesPage'
import RecommendationPage from '../pages/RecommendationPage'
import AchievementsPage from '../pages/AchievementsPage'
import FAQPage from '../pages/FAQPage'
import ContactPage from '../pages/ContactPage'
import NotFoundPage from '../pages/NotFoundPage'

/**
 * Route table.
 *
 * Every page renders inside AppLayout, which supplies the navbar, footer,
 * floating WhatsApp button, and scroll/focus handling.
 *
 * Paths are kept in sync with src/routes/navItems.js — add a page in both
 * places, plus a `routeMeta` entry in src/i18n/ui.js for its title and
 * description.
 *
 * Pages are imported eagerly rather than lazily: the whole bundle is small
 * and mostly React, so code splitting would add loading states for very
 * little saving.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="recommendation" element={<RecommendationPage />} />
        <Route path="achievements" element={<AchievementsPage />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
