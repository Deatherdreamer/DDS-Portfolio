import { apiClient } from './apiClient'
import type { Project, Technology } from '@/types'

export async function fetchProjects(): Promise<Project[]> {
  return apiClient.get<Project[]>('/projects/')
}

export async function fetchProjectById(id: number): Promise<Project> {
  return apiClient.get<Project>(`/projects/${id}/`)
}

export async function fetchTechnologies(): Promise<Technology[]> {
  return apiClient.get<Technology[]>('/technologies/')
}
