import { api } from './client'

export interface HealthResponse {
  status: string
  time: string
}

export function fetchHealth(): Promise<HealthResponse> {
  return api<HealthResponse>('/health')
}
