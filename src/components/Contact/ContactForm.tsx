import { useState, type FormEvent } from 'react'
import { Button, TextInput } from '@components/Common'
import type { Contact } from '@store/contactSlice'
import { useAppDispatch } from '@store/hooks'
import { createContact } from '@store/contactThunks'
import { validateContact } from '@utils/validation'

interface ContactFormProps {
  onCreated?: () => void
}

export function ContactForm({ onCreated }: ContactFormProps): React.JSX.Element {
  const dispatch = useAppDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
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
      const result = await dispatch(createContact(contact))
      if (createContact.fulfilled.match(result)) {
        setName('')
        setEmail('')
        setPhone('')
        onCreated?.()
      } else {
        setSubmitError(result.payload ?? 'Unable to create contact.')
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
      <Button type="submit" disabled={submitting}>{submitting ? 'Saving…' : 'Add contact'}</Button>
    </form>
  )
}
