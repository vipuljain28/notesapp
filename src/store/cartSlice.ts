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
      if (
        !Number.isFinite(action.payload.price) ||
        action.payload.price < 0 ||
        !Number.isInteger(action.payload.quantity) ||
        action.payload.quantity < 1
      ) return
      const existing = state.items.find((item) => item.id === action.payload.id)
      if (existing) {
        if (existing.quantity + action.payload.quantity > 999) return
        existing.quantity += action.payload.quantity
        state.total += existing.price * action.payload.quantity
      } else {
        state.items.push(action.payload)
        state.total += action.payload.price * action.payload.quantity
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload)
      if (item) {
        state.total -= item.price * item.quantity
        state.items = state.items.filter((i) => i.id !== action.payload)
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      if (!Number.isInteger(action.payload.quantity) || action.payload.quantity < 1 || action.payload.quantity > 999) return
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
      state.total = action.payload.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      )
    },
  },
})
