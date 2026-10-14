import { useAppDispatch } from '@store/hooks'
import { deleteContact } from '@store/contactThunks'
import type { Contact } from '@store/contactSlice'
import { useContacts } from '@hooks/useContacts'
import { Alert, Button, Card, Modal, Spinner } from '@components/Common'
import { ContactCard } from '@components/Contact/ContactCard'
import { ContactForm } from '@components/Contact/ContactForm'

export function ContactList(): React.JSX.Element {
  const { contacts, loading, error, refresh } = useContacts()
  const dispatch = useAppDispatch()
  const [editingContact, setEditingContact] = useState<Contact | null>(null)

  async function handleDelete(contact: Contact): Promise<void> {
    if (!window.confirm(`Delete ${contact.name}?`)) return
    await dispatch(deleteContact(contact.id))
  }

  return (
    <section aria-labelledby="contacts-heading" className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-700">People</p>
          <h2 id="contacts-heading" className="mt-1 text-2xl font-bold text-slate-900">Contacts</h2>
        </div>
        <Button type="button" variant="secondary" onClick={() => void refresh()} disabled={loading}>Refresh contacts</Button>
      </div>

      <Card header={<h3 className="font-semibold text-slate-900">Add a contact</h3>}>
        <ContactForm />
      </Card>

      <Modal
        isOpen={editingContact !== null}
        title="Edit contact"
        onClose={() => setEditingContact(null)}
      >
        {editingContact && (
          <ContactForm
            key={editingContact.id}
            initialContact={editingContact}
            onSaved={() => setEditingContact(null)}
          />
        )}
      </Modal>

      {loading && contacts.length === 0 && <div className="py-8 text-center"><Spinner message="Loading contacts…" /></div>}
      {error && <Alert variant="error" title="Contacts could not be loaded">{error}</Alert>}
      {!loading && !error && contacts.length === 0 && <p className="rounded-lg bg-slate-50 p-6 text-center text-slate-600">No contacts yet.</p>}
      {contacts.length > 0 && (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {contacts.map((contact) => (
            <li key={contact.id}><ContactCard contact={contact} onEdit={setEditingContact} onDelete={(entry) => void handleDelete(entry)} /></li>
          ))}
        </ul>
      )}
      {loading && contacts.length > 0 && <p className="text-sm text-slate-600" role="status">Refreshing contacts…</p>}
    </section>
  )
}
import { useState } from 'react'
