import { http, HttpResponse } from 'msw'
interface MockContact {
  id: number
  name: string
  email: string
  phone?: string
  company?: { name: string }
}

const contacts: MockContact[] = [
  {
    id: 1,
    name: 'Leanne Graham',
    email: 'leanne@example.com',
    phone: '1-770-736-8031',
    company: { name: 'Romaguera-Crona' },
  },
]

export const handlers = [
  http.get('https://jsonplaceholder.typicode.com/users', () =>
    HttpResponse.json(contacts),
  ),
  http.get('https://jsonplaceholder.typicode.com/users/:id', ({ params }) => {
    const contact = contacts.find(({ id }) => id === Number(params.id))
    return contact
      ? HttpResponse.json(contact)
      : HttpResponse.json({ message: 'Contact not found.' }, { status: 404 })
  }),
  http.post('https://jsonplaceholder.typicode.com/users', async ({ request }) => {
    const contact = (await request.json()) as Omit<MockContact, 'id'>
    return HttpResponse.json({ ...contact, id: 101 }, { status: 201 })
  }),
  http.put('https://jsonplaceholder.typicode.com/users/:id', async ({ request, params }) => {
    const contact = (await request.json()) as MockContact
    return HttpResponse.json({ ...contact, id: Number(params.id) })
  }),
  http.delete('https://jsonplaceholder.typicode.com/users/:id', () =>
    new HttpResponse(null, { status: 200 }),
  ),
]
