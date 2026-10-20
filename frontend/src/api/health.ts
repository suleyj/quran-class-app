export interface HealthResponse {
  status: string
  time: string
}

export async function fetchHealth(): Promise<HealthResponse> {
  const res = await fetch('/api/health')
  if (!res.ok) {
    throw new Error(`Health check failed with status ${res.status}`)
  }
  return res.json()
}
