import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import {
  createContact,
  deleteContact,
  fetchContacts,
  updateContact,
} from '@store/contactThunks'

export interface Contact {
  id: number
  name: string
  email: string
  phone?: string
  company?: string
}

export interface ContactState {
  items: Contact[]
  selectedId: number | null
  loading: boolean
  error: string | null
  lastFetchedAt: number | null
}

const initialState: ContactState = {
  items: [],
  selectedId: null,
  loading: false,
  error: null,
  lastFetchedAt: null,
}

export const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts: (state, action: PayloadAction<Contact[]>) => {
      state.items = action.payload
    },
    addContact: (state, action: PayloadAction<Contact>) => {
      state.items.push(action.payload)
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const index = state.items.findIndex((c) => c.id === action.payload.id)
      if (index >= 0) {
        state.items[index] = action.payload
      }
    },
    selectContact: (state, action: PayloadAction<number | null>) => {
      state.selectedId = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
        state.lastFetchedAt = Date.now()
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? 'Unable to load contacts.'
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.items.push(action.payload)
        state.lastFetchedAt = null
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const index = state.items.findIndex(({ id }) => id === action.payload.id)
        if (index !== -1) state.items[index] = action.payload
        state.lastFetchedAt = null
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(({ id }) => id !== action.payload)
        if (state.selectedId === action.payload) state.selectedId = null
        state.lastFetchedAt = null
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.error = action.payload ?? 'Unable to delete contact.'
      })
  },
})
