import { ApiError, type ApiErrorKind } from '@app-types/errors'
import { retry, type RetryOptions } from '@utils/retry'

const DEFAULT_TIMEOUT_MS = 5000
const DEFAULT_MAX_RETRIES = 3
const DEFAULT_RETRY_DELAY_MS = 1000

export interface ApiClientOptions {
  baseUrl?: string
  timeoutMs?: number
  maxRetries?: number
  retryBaseDelayMs?: number
  wait?: RetryOptions['wait']
  fetcher?: typeof fetch
}

function classifyError(status?: number): ApiErrorKind {
  if (status === undefined) return 'NETWORK'
  if (status === 408 || status === 504) return 'TIMEOUT'
  if (status >= 500) return 'SERVER_ERROR'
  if (status === 400 || status === 422) return 'VALIDATION_ERROR'
  return 'UNKNOWN'
}

function isRetryable(error: unknown): boolean {
  return error instanceof ApiError && error.retryable
}

export function createApiClient(options: ApiClientOptions = {}) {
  async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const baseUrl = options.baseUrl ?? import.meta.env.VITE_API_URL
    if (!baseUrl) {
      throw new ApiError('The API URL is not configured.', 'UNKNOWN')
    }

    const fetcher = options.fetcher ?? fetch
    return retry(
      async (attempt) => {
        const controller = new AbortController()
        const timeout = setTimeout(
          () => controller.abort(),
          options.timeoutMs ?? DEFAULT_TIMEOUT_MS,
        )
        const method = init.method ?? 'GET'
        const url = new URL(path, baseUrl).toString()

        try {
          const response = await fetcher(url, {
            ...init,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              ...init.headers,
            },
            signal: controller.signal,
          })

          if (!response.ok) {
            const kind = classifyError(response.status)
            throw new ApiError(
              `Request failed with status ${response.status}.`,
              kind,
              response.status,
              kind === 'SERVER_ERROR' || kind === 'TIMEOUT',
            )
          }

          if (response.status === 204 || response.headers.get('content-length') === '0') {
            return undefined as T
          }

          try {
            return (await response.json()) as T
          } catch (error) {
            throw new ApiError(
              'The server returned an invalid response.',
              'UNKNOWN',
              response.status,
              false,
              { cause: error },
            )
          }
        } catch (error) {
          if (error instanceof ApiError) {
            console.warn(`[api] ${method} ${url} attempt ${attempt + 1}: ${error.message}`)
            throw error
          }

          if (controller.signal.aborted) {
            const timeoutError = new ApiError(
              'The request timed out.',
              'TIMEOUT',
              undefined,
              true,
              { cause: error },
            )
            console.warn(`[api] ${method} ${url} attempt ${attempt + 1}: ${timeoutError.message}`)
            throw timeoutError
          }

          const networkError = new ApiError(
            'Unable to connect to the server.',
            'NETWORK',
            undefined,
            true,
            { cause: error },
          )
          console.warn(`[api] ${method} ${url} attempt ${attempt + 1}: ${networkError.message}`)
          throw networkError
        } finally {
          clearTimeout(timeout)
        }
      },
      {
        maxRetries: options.maxRetries ?? DEFAULT_MAX_RETRIES,
        baseDelayMs: options.retryBaseDelayMs ?? DEFAULT_RETRY_DELAY_MS,
        shouldRetry: isRetryable,
        wait: options.wait,
      },
    )
  }

  return {
    get: <T>(path: string): Promise<T> => request<T>(path),
    post: <T>(path: string, body: unknown): Promise<T> =>
      request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
    put: <T>(path: string, body: unknown): Promise<T> =>
      request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
    delete: <T>(path: string): Promise<T> =>
      request<T>(path, { method: 'DELETE' }),
  }
}

export const api = createApiClient()
