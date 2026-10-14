import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

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
}

const initialState: ContactState = {
  items: [],
  selectedId: null,
  loading: false,
  error: null,
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
})
