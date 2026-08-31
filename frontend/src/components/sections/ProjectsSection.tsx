import { useTranslation } from 'react-i18next'
import { FolderGit2 } from 'lucide-react'

import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, Skeleton } from '@/components/ui'
import { Container } from '@/components/layout'
import { useProjects } from '@/hooks'

export function ProjectsSection() {
  const { t } = useTranslation()
  const { data: projects, isLoading, isError } = useProjects()

  return (
    <section id="projects" className="py-16 md:py-24 bg-muted/30">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">{t('projects.title')}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t('projects.subtitle')}</p>
        </div>

        {isLoading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
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

        {!isLoading && !isError && projects && projects.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            {t('projects.empty')}
          </div>
        )}

        {!isLoading && !isError && projects && projects.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.id} className="flex flex-col justify-between overflow-hidden">
                {project.screenshots?.[0] ? (
                  <img
                    src={project.screenshots[0].image}
                    alt={project.screenshots[0].title || project.name}
                    className="h-48 w-full object-cover border-b"
                  />
                ) : (
                  <div className="h-48 w-full bg-muted flex items-center justify-center border-b">
                    <FolderGit2 className="size-12 text-muted-foreground/50" />
                  </div>
                )}
                <div>
                  <CardHeader>
                    <CardTitle>{project.name}</CardTitle>
                    {project.company && (
                      <span className="text-xs text-muted-foreground">
                        {project.company.name}
                      </span>
                    )}
                    <CardDescription className="line-clamp-3">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                </div>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.tech_stack.map((tech) => (
                      <Badge key={tech.id} variant="secondary">
                        {tech.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
