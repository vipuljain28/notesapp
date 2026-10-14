import { createAsyncThunk } from '@reduxjs/toolkit'
import { contactService } from '@services/contactService'
import { ApiError } from '@types/errors'
import type { RootState } from '@store/index'
import type { Contact } from '@store/contactSlice'

export const CONTACT_CACHE_TTL_MS = 5 * 60 * 1000

export const fetchContacts = createAsyncThunk<
  Contact[],
  { force?: boolean } | undefined,
  { state: RootState; rejectValue: string }
>(
  'contacts/fetch',
  async (_, { rejectWithValue }) => {
    try {
      return await contactService.list()
    } catch (error) {
      return rejectWithValue(
        error instanceof ApiError ? error.message : 'Unable to load contacts.',
      )
    }
  },
  {
    condition: (options, { getState }) => {
      const { contacts } = getState()
      const fresh =
        contacts.lastFetchedAt !== null &&
        Date.now() - contacts.lastFetchedAt < CONTACT_CACHE_TTL_MS
      return Boolean(options?.force || !fresh || contacts.items.length === 0)
    },
  },
)

export const createContact = createAsyncThunk<
  Contact,
  Omit<Contact, 'id'>,
  { rejectValue: string }
>('contacts/create', async (contact, { rejectWithValue }) => {
  try {
    return await contactService.create(contact)
  } catch (error) {
    return rejectWithValue(
      error instanceof ApiError ? error.message : 'Unable to create contact.',
    )
  }
})

export const updateContact = createAsyncThunk<
  Contact,
  Contact,
  { rejectValue: string }
>('contacts/update', async (contact, { rejectWithValue }) => {
  try {
    return await contactService.update(contact)
  } catch (error) {
    return rejectWithValue(
      error instanceof ApiError ? error.message : 'Unable to update contact.',
    )
  }
})

export const deleteContact = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>('contacts/delete', async (id, { rejectWithValue }) => {
  try {
    await contactService.remove(id)
    return id
  } catch (error) {
    return rejectWithValue(
      error instanceof ApiError ? error.message : 'Unable to delete contact.',
    )
  }
})
