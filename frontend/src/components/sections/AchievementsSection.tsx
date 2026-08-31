import { useTranslation } from 'react-i18next'
import { Award } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle, Skeleton } from '@/components/ui'
import { Container } from '@/components/layout'
import { useAchievements } from '@/hooks'

export function AchievementsSection() {
  const { t } = useTranslation()
  const { data: achievements, isLoading, isError } = useAchievements()

  return (
    <section id="achievements" className="py-16 md:py-24 bg-muted/30">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">{t('achievements.title')}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t('achievements.subtitle')}</p>
        </div>

        {isLoading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
              </Card>
            ))}
          </div>
        )}

        {isError && (
          <div className="text-center py-12 text-muted-foreground">
            {t('common.error')}
          </div>
        )}

        {!isLoading && !isError && achievements && achievements.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            {t('achievements.empty')}
          </div>
        )}

        {!isLoading && !isError && achievements && achievements.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((item) => (
              <Card key={item.id} className="flex flex-col justify-between">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2 text-primary">
                    <Award className="size-5" />
                    {item.company && (
                      <span className="text-xs text-muted-foreground">
                        {item.company.name}
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
