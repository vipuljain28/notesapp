import { configureStore } from '@reduxjs/toolkit'
import { contactSlice } from './contactSlice'
import { cartSlice } from './cartSlice'
import { formSlice } from './formSlice'
import { uiSlice } from './uiSlice'
import { readCart, writeCart } from '@services/cartPersistence'

export const store = configureStore({
  reducer: {
    contacts: contactSlice.reducer,
    cart: cartSlice.reducer,
    form: formSlice.reducer,
    ui: uiSlice.reducer,
  },
})

const savedCart = readCart()
if (savedCart) store.dispatch(cartSlice.actions.loadCart(savedCart))

store.subscribe(() => {
  writeCart(store.getState().cart)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
