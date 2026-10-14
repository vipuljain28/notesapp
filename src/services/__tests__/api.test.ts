import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { api } from '@services/api'
import { ApiError } from '@app-types/errors'

beforeEach(() => {
  vi.stubEnv('VITE_API_URL', 'https://jsonplaceholder.typicode.com')
})
afterEach(() => vi.unstubAllEnvs())

describe('API client', () => {
  it('returns decoded JSON from a successful response', async () => {
    const result = await api.get<{ id: number }>('/users/1')
    expect(result.id).toBe(1)
  })

  it('classifies client failures and does not retry them', async () => {
    await expect(api.get('/users/999')).rejects.toMatchObject({
      kind: 'UNKNOWN',
      status: 404,
      retryable: false,
    } satisfies Partial<ApiError>)
  })
})
