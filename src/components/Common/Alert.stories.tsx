import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert } from '@components/Common/Alert'

const meta = {
  title: 'Common/Alert',
  component: Alert,
  args: { title: 'Request failed', children: 'Check the connection and retry.' },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Error: Story = { args: { variant: 'error' } }
export const Success: Story = { args: { variant: 'success', title: 'Saved', children: 'The changes were saved.' } }
