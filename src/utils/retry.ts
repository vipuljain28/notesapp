export interface RetryOptions {
  maxRetries?: number
  baseDelayMs?: number
  shouldRetry?: (error: unknown) => boolean
  wait?: (delayMs: number) => Promise<void>
}

const delay = (milliseconds: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, milliseconds))

export async function retry<T>(
  operation: (attempt: number) => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const {
    maxRetries = 3,
    baseDelayMs = 1000,
    shouldRetry = () => true,
    wait = delay,
  } = options

  for (let attempt = 0; ; attempt += 1) {
    try {
      return await operation(attempt)
    } catch (error) {
      if (attempt >= maxRetries || !shouldRetry(error)) {
        throw error
      }
      await wait(baseDelayMs * 2 ** attempt)
    }
  }
}
