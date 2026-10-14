import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TextInput } from '@components/Common/TextInput'

describe('TextInput', () => {
  it('associates its label and exposes field errors accessibly', () => {
    render(<TextInput label="Email" type="email" error="Enter a valid email." />)
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a valid email.')
  })
})
