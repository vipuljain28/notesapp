import type { Meta, StoryObj } from '@storybook/react-vite'
import { Spinner } from '@components/Common/Spinner'

const meta = {
  title: 'Common/Spinner',
  component: Spinner,
  args: { message: 'Loading contacts…' },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Medium: Story = {}
export const Large: Story = { args: { size: 'large' } }
