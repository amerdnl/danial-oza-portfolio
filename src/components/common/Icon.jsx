/**
 * Icon registry.
 *
 * Data files reference icons by name (e.g. `icon: 'HeartPulse'`). Those names
 * are resolved here against an explicit map so only the icons actually used
 * end up in the bundle — importing the whole of lucide-react with
 * `import * as Icons` would pull in hundreds of unused components.
 *
 * When adding an icon name to a data file, add the matching import here.
 */

import {
  Activity,
  Award,
  Baby,
  BookOpen,
  Briefcase,
  Building2,
  CheckCircle2,
  Circle,
  ClipboardList,
  Clock,
  HeartHandshake,
  HeartPulse,
  Home,
  Landmark,
  Laptop,
  LifeBuoy,
  Medal,
  MessageCircle,
  MessagesSquare,
  Plane,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  Video,
  Wallet,
} from 'lucide-react'

const ICON_MAP = {
  Activity,
  Award,
  Baby,
  BookOpen,
  Briefcase,
  Building2,
  CheckCircle2,
  ClipboardList,
  Clock,
  HeartHandshake,
  HeartPulse,
  Home,
  Landmark,
  Laptop,
  LifeBuoy,
  Medal,
  MessageCircle,
  MessagesSquare,
  Plane,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  Video,
  Wallet,
}

/**
 * Render an icon by name. Always decorative — callers supply the accessible
 * text, so this is hidden from assistive technology.
 */
export function Icon({ name, className = '' }) {
  const Component = ICON_MAP[name] ?? Circle
  return <Component aria-hidden="true" className={className} />
}

export default Icon
