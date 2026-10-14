import { afterEach, describe, expect, it, vi } from 'vitest'
import { readCart, writeCart } from '@services/cartPersistence'

afterEach(() => localStorage.clear())

describe('cart persistence', () => {
  it('restores valid items and recalculates the total', () => {
    localStorage.setItem(
      'contact-manager-cart',
      JSON.stringify({
        items: [{ id: 1, name: 'Notebook', quantity: 2, price: 4 }],
        total: 999,
      }),
    )
    expect(readCart()).toEqual({
      items: [{ id: 1, name: 'Notebook', quantity: 2, price: 4 }],
      total: 8,
    })
  })

  it('warns and drops invalid storage', () => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    localStorage.setItem(
      'contact-manager-cart',
      JSON.stringify({ items: [{ id: 1, name: 'Bad', quantity: 0, price: 2 }] }),
    )
    expect(readCart()).toBeNull()
    expect(warning).toHaveBeenCalledOnce()
    warning.mockRestore()
  })

  it('writes the latest state to localStorage', () => {
    const cart = { items: [{ id: 1, name: 'Pen', quantity: 1, price: 2 }], total: 2 }
    writeCart(cart)
    expect(JSON.parse(localStorage.getItem('contact-manager-cart') ?? 'null')).toEqual(cart)
  })
})
