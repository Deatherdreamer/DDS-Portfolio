export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export const NAV_ITEMS = [
  { labelKey: 'nav.home', href: '#home' },
  { labelKey: 'nav.projects', href: '#projects' },
  { labelKey: 'nav.experience', href: '#experience' },
  { labelKey: 'nav.achievements', href: '#achievements' },
] as const

export const SOCIAL_LINKS = {
  github: 'https://github.com/Deatherdreamer',
  linkedin: 'https://www.linkedin.com',
  email: 'mailto:contact@example.com',
} as const
