import { useTranslation } from 'react-i18next'
import { Briefcase } from 'lucide-react'

import { Badge, Card, CardContent, CardHeader, CardTitle, Skeleton } from '@/components/ui'
import { Container } from '@/components/layout'
import { useCompanies } from '@/hooks'

export function ExperienceSection() {
  const { t } = useTranslation()
  const { data: companies, isLoading, isError } = useCompanies()

  return (
    <section id="experience" className="py-16 md:py-24">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">{t('experience.title')}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t('experience.subtitle')}</p>
        </div>

        {isLoading && (
          <div className="max-w-2xl mx-auto space-y-4">
            {[1, 2].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-1/3 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
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

        {!isLoading && !isError && companies && companies.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            {t('experience.empty')}
          </div>
        )}

        {!isLoading && !isError && companies && companies.length > 0 && (
          <div className="max-w-2xl mx-auto space-y-6">
            {companies.map((company) => (
              <Card key={company.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center gap-2">
                    <Briefcase className="size-5 text-primary" />
                    <CardTitle className="text-lg">{company.name}</CardTitle>
                  </div>
                  <Badge variant={company.is_remote ? 'secondary' : 'outline'}>
                    {company.is_remote ? t('experience.remote') : t('experience.onSite')}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    {company.start_date} — {company.end_date || t('experience.present')}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
