import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { contactService } from '@services/contactService'

beforeEach(() => vi.stubEnv('VITE_API_URL', 'https://jsonplaceholder.typicode.com'))
afterEach(() => vi.unstubAllEnvs())

describe('contactService', () => {
  it('maps the provider company object to the contact company name', async () => {
    await expect(contactService.list()).resolves.toEqual([
      expect.objectContaining({
        id: 1,
        name: 'Leanne Graham',
        company: 'Romaguera-Crona',
      }),
    ])
  })

  it('sends contact writes and maps their response', async () => {
    await expect(
      contactService.create({ name: 'Sam', email: 'sam@example.com', phone: '555-0100' }),
    ).resolves.toMatchObject({ id: 101, name: 'Sam', email: 'sam@example.com' })
  })
})
