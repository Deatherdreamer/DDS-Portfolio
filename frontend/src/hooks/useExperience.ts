import { useQuery } from '@tanstack/react-query'
import { fetchAchievements, fetchCompanies, fetchPositions } from '@/services'

export const experienceKeys = {
  companies: ['companies'] as const,
  positions: ['positions'] as const,
  achievements: ['achievements'] as const,
}

export function useCompanies() {
  return useQuery({
    queryKey: experienceKeys.companies,
    queryFn: fetchCompanies,
  })
}

export function usePositions() {
  return useQuery({
    queryKey: experienceKeys.positions,
    queryFn: fetchPositions,
  })
}

export function useAchievements() {
  return useQuery({
    queryKey: experienceKeys.achievements,
    queryFn: fetchAchievements,
  })
}
