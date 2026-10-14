import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
}

export interface UIState {
  unsavedChanges: boolean
  toasts: Toast[]
  showConfirmDialog: boolean
  confirmMessage: string | null
}

const initialState: UIState = {
  unsavedChanges: false,
  toasts: [],
  showConfirmDialog: false,
  confirmMessage: null,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showUnsavedWarning: (state) => {
      state.unsavedChanges = true
    },
    hideUnsavedWarning: (state) => {
      state.unsavedChanges = false
    },
    addToast: (state, action: PayloadAction<Toast>) => {
      state.toasts.push(action.payload)
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload)
    },
    showConfirmDialog: (state, action: PayloadAction<string>) => {
      state.showConfirmDialog = true
      state.confirmMessage = action.payload
    },
    hideConfirmDialog: (state) => {
      state.showConfirmDialog = false
      state.confirmMessage = null
    },
  },
})
