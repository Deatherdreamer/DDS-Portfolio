import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe, Menu, Moon, Sun, X } from 'lucide-react'

import { Button } from '@/components/ui'
import { Container } from './Container'
import { NAV_ITEMS } from '@/constants'
import { useTheme } from '@/hooks'

export function Navbar() {
  const { t, i18n } = useTranslation()
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleLanguage = () => {
    const nextLang = i18n.language.startsWith('es') ? 'en' : 'es'
    i18n.changeLanguage(nextLang)
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <a href="#home" className="text-lg font-bold tracking-tight text-foreground">
          DDS<span className="text-primary">.dev</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(item.labelKey)}
            </a>
          ))}
        </nav>

        {/* Action buttons */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            title={i18n.language.startsWith('es') ? 'Switch to English' : 'Cambiar a Español'}
            aria-label="Toggle language"
          >
            <Globe className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            aria-label="Toggle language"
          >
            <Globe className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </Container>

      {/* Mobile nav menu */}
      {mobileMenuOpen && (
        <div className="border-b bg-background md:hidden">
          <Container className="flex flex-col gap-4 py-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {t(item.labelKey)}
              </a>
            ))}
          </Container>
        </div>
      )}
    </header>
  )
}
