import { describe, expect, it } from 'vitest'
import { cartSlice } from '@store/cartSlice'

const reduce = cartSlice.reducer
const addItem = cartSlice.actions.addItem
const removeItem = cartSlice.actions.removeItem
const updateQuantity = cartSlice.actions.updateQuantity
const loadCart = cartSlice.actions.loadCart

describe('cartSlice', () => {
  it('keeps item quantities and total synchronized', () => {
    let state = reduce(undefined, addItem({ id: 1, name: 'Notebook', quantity: 2, price: 3 }))
    state = reduce(state, addItem({ id: 1, name: 'Notebook', quantity: 1, price: 3 }))
    expect(state.items[0].quantity).toBe(3)
    expect(state.total).toBe(9)
    state = reduce(state, updateQuantity({ id: 1, quantity: 2 }))
    expect(state.total).toBe(6)
    state = reduce(state, removeItem(1))
    expect(state).toEqual({ items: [], total: 0 })
  })

  it('ignores invalid quantities and recalculates the total when restoring state', () => {
    const initial = reduce(undefined, addItem({ id: 1, name: 'Notebook', quantity: 1, price: 3 }))
    const invalid = reduce(initial, updateQuantity({ id: 1, quantity: 0 }))
    expect(invalid).toEqual(initial)
    expect(reduce(undefined, loadCart({
      items: [{ id: 2, name: 'Pen', quantity: 2, price: 1.5 }],
      total: 900,
    })).total).toBe(3)
  })

  it('ignores invalid cart additions and supports clearing the cart', () => {
    const state = reduce(undefined, addItem({ id: 1, name: 'Notebook', quantity: 1, price: 3 }))
    expect(reduce(state, addItem({ id: 2, name: 'Bad', quantity: 0, price: 3 }))).toEqual(state)
    expect(reduce(state, addItem({ id: 3, name: 'Bad', quantity: 1, price: -1 }))).toEqual(state)
    expect(reduce(state, updateQuantity({ id: 2, quantity: 2 }))).toEqual(state)
    expect(reduce(state, removeItem(999))).toEqual(state)
    expect(reduce(state, cartSlice.actions.clearCart())).toEqual({ items: [], total: 0 })
  })
})
