import { apiClient } from './apiClient'
import type { Achievement, Company, Position } from '@/types'

export async function fetchCompanies(): Promise<Company[]> {
  return apiClient.get<Company[]>('/companies/')
}

export async function fetchPositions(): Promise<Position[]> {
  return apiClient.get<Position[]>('/positions/')
}

export async function fetchAchievements(): Promise<Achievement[]> {
  return apiClient.get<Achievement[]>('/achievements/')
}
