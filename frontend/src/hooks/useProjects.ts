import { useQuery } from '@tanstack/react-query'
import { fetchProjects, fetchProjectById, fetchTechnologies } from '@/services'

export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  detail: (id: number) => [...projectKeys.all, 'detail', id] as const,
  technologies: ['technologies'] as const,
}

export function useProjects() {
  return useQuery({
    queryKey: projectKeys.lists(),
    queryFn: fetchProjects,
  })
}

export function useProject(id: number) {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: () => fetchProjectById(id),
    enabled: Boolean(id),
  })
}

export function useTechnologies() {
  return useQuery({
    queryKey: projectKeys.technologies,
    queryFn: fetchTechnologies,
  })
}
