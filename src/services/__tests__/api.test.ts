import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { http, HttpResponse } from 'msw'
import { api, createApiClient } from '@services/api'
import { ApiError } from '@app-types/errors'
import { server } from '@mocks/server'

const baseUrl = 'https://jsonplaceholder.typicode.com'
let warning: ReturnType<typeof vi.spyOn>

beforeEach(() => {
  vi.stubEnv('VITE_API_URL', baseUrl)
  warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
})

afterEach(() => {
  warning.mockRestore()
  vi.unstubAllEnvs()
})

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
    expect(warning).toHaveBeenCalledOnce()
  })

  it('retries transient failures with exponential delays', async () => {
    let attempts = 0
    server.use(
      http.get(`${baseUrl}/users`, () => {
        attempts += 1
        return attempts < 3
          ? HttpResponse.json({}, { status: 503 })
          : HttpResponse.json([{ id: 1, name: 'Sam', email: 'sam@example.com' }])
      }),
    )
    const wait = vi.fn<(delayMs: number) => Promise<void>>(async () => undefined)
    const client = createApiClient({ baseUrl, wait })

    await expect(client.get('/users')).resolves.toHaveLength(1)
    expect(attempts).toBe(3)
    expect(wait.mock.calls.map(([delay]) => delay)).toEqual([1000, 2000])
  })

  it('normalizes network errors and stops after the configured retries', async () => {
    const fetcher = vi.fn<typeof fetch>().mockRejectedValue(new Error('offline'))
    const client = createApiClient({
      baseUrl,
      fetcher,
      maxRetries: 2,
      wait: async () => undefined,
    })

    await expect(client.get('/users')).rejects.toMatchObject({
      kind: 'NETWORK',
      retryable: true,
    })
    expect(fetcher).toHaveBeenCalledTimes(3)
  })

  it('does not retry malformed JSON responses', async () => {
    server.use(
      http.get(`${baseUrl}/users/bad`, () =>
        new HttpResponse('not-json', {
          status: 200,
          headers: { 'Content-Type': 'text/plain' },
        }),
      ),
    )
    const client = createApiClient({ baseUrl })

    await expect(client.get('/users/bad')).rejects.toMatchObject({
      kind: 'UNKNOWN',
      status: 200,
      retryable: false,
    })
    expect(warning).toHaveBeenCalledOnce()
  })

  it('returns undefined for no-content responses', async () => {
    server.use(
      http.delete(`${baseUrl}/users/1`, () => new HttpResponse(null, { status: 204 })),
    )
    await expect(api.delete('/users/1')).resolves.toBeUndefined()
  })

  it('reports a configuration error when the API URL is missing', async () => {
    vi.stubEnv('VITE_API_URL', '')
    await expect(api.get('/users')).rejects.toMatchObject({
      kind: 'UNKNOWN',
      retryable: false,
    })
  })

  it('maps server, timeout, and validation status codes', async () => {
    const client = createApiClient({ baseUrl, maxRetries: 0 })
    for (const [status, kind] of [
      [400, 'VALIDATION_ERROR'],
      [408, 'TIMEOUT'],
      [504, 'TIMEOUT'],
      [500, 'SERVER_ERROR'],
    ] as const) {
      server.use(
        http.get(`${baseUrl}/status/${status}`, () =>
          HttpResponse.json({}, { status }),
        ),
      )
      await expect(client.get(`/status/${status}`)).rejects.toMatchObject({
        kind,
        status,
      })
    }
  })
})
