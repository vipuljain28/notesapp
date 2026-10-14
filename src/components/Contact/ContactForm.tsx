import { useState, type FormEvent } from 'react'
import { Button, TextInput } from '@components/Common'
import type { Contact } from '@store/contactSlice'
import { useAppDispatch } from '@store/hooks'
import { createContact, updateContact } from '@store/contactThunks'
import { validateContact } from '@utils/validation'

interface ContactFormProps {
  initialContact?: Contact
  onSaved?: () => void
}

export function ContactForm({ initialContact, onSaved }: ContactFormProps): React.JSX.Element {
  const dispatch = useAppDispatch()
  const [name, setName] = useState(initialContact?.name ?? '')
  const [email, setEmail] = useState(initialContact?.email ?? '')
  const [phone, setPhone] = useState(initialContact?.phone ?? '')
  const [errors, setErrors] = useState<Partial<Record<'name' | 'email' | 'phone', string>>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    const contact: Omit<Contact, 'id'> = { name, email, phone }
    const nextErrors = validateContact(contact)
    setErrors(nextErrors)
    setSubmitError(null)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    try {
      if (initialContact) {
        const result = await dispatch(updateContact({ ...contact, id: initialContact.id }))
        if (updateContact.fulfilled.match(result)) {
          onSaved?.()
        } else {
          setSubmitError(result.payload ?? 'Unable to update contact.')
        }
      } else {
        const result = await dispatch(createContact(contact))
        if (createContact.fulfilled.match(result)) {
          setName('')
          setEmail('')
          setPhone('')
          onSaved?.()
        } else {
          setSubmitError(result.payload ?? 'Unable to create contact.')
        }
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={(event) => void handleSubmit(event)} className="grid gap-4" noValidate>
      <TextInput label="Name" name="name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} error={errors.name} required maxLength={255} />
      <TextInput label="Email" name="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} error={errors.email} required maxLength={255} />
      <TextInput label="Phone (optional)" name="phone" type="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} error={errors.phone} maxLength={20} />
      {submitError && <p role="alert" className="text-sm text-red-700">{submitError}</p>}
      <Button type="submit" disabled={submitting}>{submitting ? 'Saving…' : initialContact ? 'Save changes' : 'Add contact'}</Button>
    </form>
  )
}
