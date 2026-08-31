import { useTranslation } from 'react-i18next'
import { ArrowRight, Mail } from 'lucide-react'

import { Button } from '@/components/ui'
import { Container } from '@/components/layout'
import { SOCIAL_LINKS } from '@/constants'

export function HeroSection() {
  const { t } = useTranslation()

  return (
    <section id="home" className="py-20 md:py-32">
      <Container className="flex flex-col items-center text-center">
        <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-3">
          {t('hero.greeting')}
        </p>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4">
          {t('hero.name')}
        </h1>
        <h2 className="text-xl sm:text-2xl font-medium text-primary mb-6">
          {t('hero.role')}
        </h2>
        <p className="max-w-2xl text-muted-foreground text-base sm:text-lg mb-8 leading-relaxed">
          {t('hero.description')}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <a href="#projects">
              {t('hero.viewProjects')} <ArrowRight className="size-4 ml-1" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={SOCIAL_LINKS.email}>
              <Mail className="size-4 mr-1" /> {t('hero.contact')}
            </a>
          </Button>
        </div>
      </Container>
    </section>
  )
}
