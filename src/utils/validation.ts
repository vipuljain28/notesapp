import type { Contact } from '@store/contactSlice'

export type ContactFieldErrors = Partial<Record<'name' | 'email' | 'phone', string>>

export function validateContact(
  contact: Pick<Contact, 'name' | 'email' | 'phone'>,
): ContactFieldErrors {
  const errors: ContactFieldErrors = {}
  const name = contact.name.trim()
  const email = contact.email.trim()
  const phone = contact.phone?.trim() ?? ''

  if (!name) errors.name = 'Name is required.'
  else if (name.length > 255) errors.name = 'Name must be 255 characters or fewer.'

  if (!email) errors.email = 'Email is required.'
  else if (email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address (up to 255 characters).'
  }

  if (phone && (phone.length > 20 || !/^[\d\s()+.-]+$/.test(phone))) {
    errors.phone = 'Enter a valid phone number (up to 20 characters).'
  }

  return errors
}
