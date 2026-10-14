import type { RootState } from '@store/index'

export const selectContacts = (state: RootState) => state.contacts.items
export const selectContactsLoading = (state: RootState) => state.contacts.loading
export const selectContactsError = (state: RootState) => state.contacts.error
export const selectContactById = (id: number) => (state: RootState) =>
  state.contacts.items.find((contact) => contact.id === id)
export const selectCartItems = (state: RootState) => state.cart.items
export const selectCartTotal = (state: RootState) => state.cart.total
