import type { Contact } from '@store/contactSlice'
import { Button, Card } from '@components/Common'

interface ContactCardProps {
  contact: Contact
  onDelete: (contact: Contact) => void
}

export function ContactCard({ contact, onDelete }: ContactCardProps): React.JSX.Element {
  return (
    <Card className="h-full" header={<h3 className="font-semibold text-slate-900">{contact.name}</h3>}>
      <dl className="grid gap-2 text-sm">
        <div><dt className="sr-only">Email</dt><dd><a className="text-indigo-700 underline" href={`mailto:${contact.email}`}>{contact.email}</a></dd></div>
        {contact.phone && <div><dt className="sr-only">Phone</dt><dd className="text-slate-600">{contact.phone}</dd></div>}
        {contact.company && <div><dt className="sr-only">Company</dt><dd className="text-slate-600">{contact.company}</dd></div>}
      </dl>
      <div className="mt-4 flex justify-end">
        <Button type="button" variant="danger" className="px-3 py-1.5 text-sm" onClick={() => onDelete(contact)}>Delete</Button>
      </div>
    </Card>
  )
}
