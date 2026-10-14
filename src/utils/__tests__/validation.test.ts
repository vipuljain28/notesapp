import { describe, expect, it } from 'vitest'
import { validateContact } from '@utils/validation'

describe('validateContact', () => {
  it('requires a name and a valid email', () => {
    expect(validateContact({ name: '', email: 'bad', phone: '' })).toEqual({
      name: 'Name is required.',
      email: 'Enter a valid email address (up to 255 characters).',
    })
  })

  it('accepts valid optional phone values and rejects invalid phone values', () => {
    expect(validateContact({ name: 'Sam', email: 'sam@example.com', phone: '+1 (555) 010-0200' })).toEqual({})
    expect(validateContact({ name: 'Sam', email: 'sam@example.com', phone: 'phone' }).phone).toContain('valid phone')
  })
})
