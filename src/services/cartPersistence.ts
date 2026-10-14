import type { CartState } from '@store/cartSlice'

const CART_STORAGE_KEY = 'contact-manager-cart'

export function readCart(): CartState | null {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (!stored) return null

    const parsed: unknown = JSON.parse(stored)
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      !('items' in parsed) ||
      !Array.isArray(parsed.items) ||
      !parsed.items.every(
        (item) =>
          typeof item === 'object' &&
          item !== null &&
          'id' in item &&
          typeof item.id === 'number' &&
          'name' in item &&
          typeof item.name === 'string' &&
          'quantity' in item &&
          typeof item.quantity === 'number' &&
          Number.isInteger(item.quantity) &&
          item.quantity >= 1 &&
          item.quantity <= 999 &&
          'price' in item &&
          typeof item.price === 'number' &&
          Number.isFinite(item.price) &&
          item.price >= 0,
      )
    ) {
      throw new Error('Stored cart has an invalid shape.')
    }

    const items = parsed.items
    return {
      items,
      total: items.reduce((total, item) => total + item.price * item.quantity, 0),
    }
  } catch (error) {
    console.warn('[cart] Could not restore saved cart; starting with an empty cart.', error)
    return null
  }
}

export function writeCart(cart: CartState): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  } catch (error) {
    console.error('[cart] Could not persist cart to localStorage.', error)
  }
}
