import type { Meta, StoryObj } from '@storybook/react-vite'
import { ContactForm } from '@components/Contact/ContactForm'

const meta = {
  title: 'Contact/ContactForm',
  component: ContactForm,
} satisfies Meta<typeof ContactForm>

export default meta
type Story = StoryObj<typeof meta>

export const Create: Story = {}
export const Edit: Story = {
  args: {
    initialContact: {
      id: 1,
      name: 'Leanne Graham',
      email: 'leanne@example.com',
      phone: '1-770-736-8031',
    },
  },
}
