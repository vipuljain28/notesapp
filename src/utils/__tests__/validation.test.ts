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

  it('enforces name, email, and phone length boundaries', () => {
    expect(validateContact({
      name: 'n'.repeat(256),
      email: `a${'b'.repeat(250)}@example.com`,
      phone: '1'.repeat(21),
    })).toEqual({
      name: 'Name must be 255 characters or fewer.',
      email: 'Enter a valid email address (up to 255 characters).',
      phone: 'Enter a valid phone number (up to 20 characters).',
    })
  })
})
