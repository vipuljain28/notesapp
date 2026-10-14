import { describe, expect, it } from 'vitest'
import { contactSlice } from '@store/contactSlice'
import { fetchContacts } from '@store/contactThunks'

describe('contactSlice', () => {
  it('tracks request state and cache timestamp', () => {
    const pending = contactSlice.reducer(undefined, fetchContacts.pending('request', undefined))
    expect(pending.loading).toBe(true)
    expect(pending.error).toBeNull()

    const fulfilled = contactSlice.reducer(
      pending,
      fetchContacts.fulfilled(
        [{ id: 1, name: 'Sam', email: 'sam@example.com' }],
        'request',
        undefined,
      ),
    )
    expect(fulfilled.items).toHaveLength(1)
    expect(fulfilled.loading).toBe(false)
    expect(fulfilled.lastFetchedAt).toEqual(expect.any(Number))
  })

  it('sets a user-facing error after a failed request', () => {
    const state = contactSlice.reducer(
      undefined,
      fetchContacts.rejected(new Error('offline'), 'request', undefined, 'offline'),
    )
    expect(state.error).toBe('offline')
    expect(state.loading).toBe(false)
  })
})
