import React, { useEffect, useState } from 'react'
import { ThemeContext, type Theme } from './theme-context'

const THEME_KEY = 'portfolio-theme'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'system'
    const stored = localStorage.getItem(THEME_KEY) as Theme | null
    return stored || 'system'
  })

  const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light'>('light')

  useEffect(() => {
    const root = document.documentElement

    const updateResolvedTheme = () => {
      let isDark = false
      if (theme === 'system') {
        if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
          isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        }
      } else {
        isDark = theme === 'dark'
      }

      setResolvedTheme(isDark ? 'dark' : 'light')
      if (isDark) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }

    updateResolvedTheme()

    if (theme === 'system' && typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const listener = () => updateResolvedTheme()
      mediaQuery.addEventListener('change', listener)
      return () => mediaQuery.removeEventListener('change', listener)
    }
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_KEY, newTheme)
    }
    setThemeState(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
