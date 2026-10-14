import { api } from '@services/api'
import type { Contact } from '@store/contactSlice'

interface JsonPlaceholderContact extends Omit<Contact, 'company'> {
  company?: string | { name: string }
}

function toContact(contact: JsonPlaceholderContact): Contact {
  return {
    id: contact.id,
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    company:
      typeof contact.company === 'string'
        ? contact.company
        : contact.company?.name,
  }
}

export const contactService = {
  async list(): Promise<Contact[]> {
    const contacts = await api.get<JsonPlaceholderContact[]>('/users')
    return contacts.map(toContact)
  },
  async get(id: number): Promise<Contact> {
    return toContact(await api.get<JsonPlaceholderContact>(`/users/${id}`))
  },
  async create(contact: Omit<Contact, 'id'>): Promise<Contact> {
    return toContact(await api.post<JsonPlaceholderContact>('/users', contact))
  },
  async update(contact: Contact): Promise<Contact> {
    return toContact(
      await api.put<JsonPlaceholderContact>(`/users/${contact.id}`, contact),
    )
  },
  remove: (id: number): Promise<void> => api.delete<void>(`/users/${id}`),
}
