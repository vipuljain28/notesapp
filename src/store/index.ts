import { configureStore } from '@reduxjs/toolkit'
import { contactSlice } from './contactSlice'
import { cartSlice } from './cartSlice'
import { formSlice } from './formSlice'
import { uiSlice } from './uiSlice'

export const store = configureStore({
  reducer: {
    contacts: contactSlice.reducer,
    cart: cartSlice.reducer,
    form: formSlice.reducer,
    ui: uiSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
