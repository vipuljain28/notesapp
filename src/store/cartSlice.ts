import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface CartItem {
  id: number
  name: string
  quantity: number
  price: number
}

export interface CartState {
  items: CartItem[]
  total: number
}

const initialState: CartState = {
  items: [],
  total: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find((item) => item.id === action.payload.id)
      if (existing) {
        existing.quantity += action.payload.quantity
      } else {
        state.items.push(action.payload)
      }
      state.total += action.payload.price * action.payload.quantity
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload)
      if (item) {
        state.total -= item.price * item.quantity
        state.items = state.items.filter((i) => i.id !== action.payload)
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find((i) => i.id === action.payload.id)
      if (item) {
        const priceDiff = item.price * (action.payload.quantity - item.quantity)
        item.quantity = action.payload.quantity
        state.total += priceDiff
      }
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
    },
    loadCart: (state, action: PayloadAction<CartState>) => {
      state.items = action.payload.items
      state.total = action.payload.total
    },
  },
})
