import { API_BASE_URL } from '@/constants'
import type { ApiError } from '@/types'

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const error: ApiError = {
        message: errorData.detail || errorData.message || response.statusText,
        status: response.status,
        details: errorData,
      }
      throw error
    }

    return response.json() as Promise<T>
  }
}

export const apiClient = new ApiClient()
