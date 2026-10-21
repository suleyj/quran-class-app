import { describe, it, expect, vi, afterEach } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'

import App from '../App.vue'
import { fetchHealth } from '@/api/health'

vi.mock('@/api/health')

describe('App', () => {

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('shows healthy status when the API responds ok', async () => {
    vi.mocked(fetchHealth).mockResolvedValue({ status: 'ok', time: '2026-01-01T00:00:00Z' })

    const wrapper = mount(App)
    await flushPromises()

    const health = wrapper.get('[data-testid="health"]')
    expect(health.attributes('data-status')).toBe('ok')
    expect(health.text()).toContain('healthy')
  })

  it('shows unavailable when the API call fails', async () => {
    vi.mocked(fetchHealth).mockRejectedValue(new Error('boom'))

    const wrapper = mount(App)
    await flushPromises()

    const health = wrapper.get('[data-testid="health"]')
    expect(health.attributes('data-status')).toBe('down')
    expect(health.text()).toContain('unavailable')
  })
})
