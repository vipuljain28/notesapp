import { describe, expect, it } from 'vitest'
import { contactSlice } from '@store/contactSlice'
import {
  createContact,
  deleteContact,
  fetchContacts,
  updateContact,
} from '@store/contactThunks'

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

  it('supports synchronous selection and contact list updates', () => {
    const contact = { id: 1, name: 'Sam', email: 'sam@example.com' }
    let state = contactSlice.reducer(undefined, contactSlice.actions.setContacts([contact]))
    state = contactSlice.reducer(state, contactSlice.actions.addContact({ ...contact, id: 2 }))
    state = contactSlice.reducer(state, contactSlice.actions.selectContact(2))
    state = contactSlice.reducer(
      state,
      contactSlice.actions.updateContact({ ...contact, id: 2, name: 'Samuel' }),
    )
    state = contactSlice.reducer(state, contactSlice.actions.setLoading(true))
    state = contactSlice.reducer(state, contactSlice.actions.setError('failed'))

    expect(state.items[1].name).toBe('Samuel')
    expect(state.selectedId).toBe(2)
    expect(state.loading).toBe(true)
    expect(state.error).toBe('failed')
    expect(
      contactSlice.reducer(state, contactSlice.actions.selectContact(null)).selectedId,
    ).toBeNull()
  })

  it('applies successful writes and records delete failures', () => {
    const base = contactSlice.reducer(
      undefined,
      contactSlice.actions.setContacts([
        { id: 1, name: 'Sam', email: 'sam@example.com' },
        { id: 2, name: 'Lee', email: 'lee@example.com' },
      ]),
    )
    const created = contactSlice.reducer(
      base,
      createContact.fulfilled(
        { id: 3, name: 'Kim', email: 'kim@example.com' },
        'create',
        { name: 'Kim', email: 'kim@example.com' },
      ),
    )
    const updated = contactSlice.reducer(
      created,
      updateContact.fulfilled(
        { id: 1, name: 'Samuel', email: 'sam@example.com' },
        'update',
        { id: 1, name: 'Samuel', email: 'sam@example.com' },
      ),
    )
    const deleted = contactSlice.reducer(
      updated,
      deleteContact.fulfilled(2, 'delete', 2),
    )
    const selected = contactSlice.reducer(
      { ...deleted, selectedId: 3 },
      deleteContact.fulfilled(3, 'delete-selected', 3),
    )
    const failed = contactSlice.reducer(
      selected,
      deleteContact.rejected(new Error('failed'), 'delete-failed', 1, 'cannot delete'),
    )

    expect(created.items).toHaveLength(3)
    expect(updated.items[0].name).toBe('Samuel')
    expect(deleted.items.map(({ id }) => id)).toEqual([1, 3])
    expect(selected.selectedId).toBeNull()
    expect(failed.error).toBe('cannot delete')
  })
})
