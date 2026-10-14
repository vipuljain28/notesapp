import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card } from '@components/Common/Card'

const meta = {
  title: 'Common/Card',
  component: Card,
  args: {
    header: 'Contact',
    children: 'A content area with consistent spacing.',
    footer: 'Footer actions',
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
