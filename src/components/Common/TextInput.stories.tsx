import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextInput } from '@components/Common/TextInput'

const meta = {
  title: 'Common/TextInput',
  component: TextInput,
  args: { label: 'Email', type: 'email', placeholder: 'name@example.com' },
} satisfies Meta<typeof TextInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Invalid: Story = { args: { error: 'Enter a valid email address.' } }
