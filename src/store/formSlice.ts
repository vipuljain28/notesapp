import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface FormState {
  values: Record<string, unknown>
  errors: Record<string, string>
  dirty: boolean
}

const initialState: FormState = {
  values: {},
  errors: {},
  dirty: false,
}

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFieldValue: (state, action: PayloadAction<{ field: string; value: unknown }>) => {
      state.values[action.payload.field] = action.payload.value
      state.dirty = true
    },
    setFieldErrors: (state, action: PayloadAction<Record<string, string>>) => {
      state.errors = action.payload
    },
    setDirty: (state, action: PayloadAction<boolean>) => {
      state.dirty = action.payload
    },
    resetForm: (state) => {
      state.values = {}
      state.errors = {}
      state.dirty = false
    },
  },
})
