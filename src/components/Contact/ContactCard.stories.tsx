import type { Meta, StoryObj } from '@storybook/react-vite'
import { ContactCard } from '@components/Contact/ContactCard'

const meta = {
  title: 'Contact/ContactCard',
  component: ContactCard,
  args: {
    contact: {
      id: 1,
      name: 'Leanne Graham',
      email: 'leanne@example.com',
      phone: '1-770-736-8031',
      company: 'Romaguera-Crona',
    },
    onEdit: () => undefined,
    onDelete: () => undefined,
  },
} satisfies Meta<typeof ContactCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
