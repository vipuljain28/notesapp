import { api } from '@services/api'
import type { Contact } from '@store/contactSlice'

export const contactService = {
  list: (): Promise<Contact[]> => api.get<Contact[]>('/users'),
  get: (id: number): Promise<Contact> => api.get<Contact>(`/users/${id}`),
  create: (contact: Omit<Contact, 'id'>): Promise<Contact> =>
    api.post<Contact>('/users', contact),
  update: (contact: Contact): Promise<Contact> =>
    api.put<Contact>(`/users/${contact.id}`, contact),
  remove: (id: number): Promise<void> => api.delete<void>(`/users/${id}`),
}
