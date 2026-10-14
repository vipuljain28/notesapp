import { describe, expect, it, vi } from 'vitest'
import { retry } from '@utils/retry'

describe('retry', () => {
  it('retries with exponential delays and returns the successful result', async () => {
    const operation = vi.fn<() => Promise<string>>()
      .mockRejectedValueOnce(new Error('first'))
      .mockRejectedValueOnce(new Error('second'))
      .mockResolvedValue('done')
    const wait = vi.fn<(delayMs: number) => Promise<void>>(async () => undefined)

    await expect(retry(operation, { wait })).resolves.toBe('done')
    expect(operation).toHaveBeenCalledTimes(3)
    expect(wait.mock.calls.map(([delay]) => delay)).toEqual([1000, 2000])
  })

  it('does not retry when the error is not retryable', async () => {
    const operation = vi.fn().mockRejectedValue(new Error('invalid'))
    await expect(retry(operation, { shouldRetry: () => false })).rejects.toThrow('invalid')
    expect(operation).toHaveBeenCalledTimes(1)
  })
})
