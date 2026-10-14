import type { Meta, StoryObj } from '@storybook/react-vite'
import { CartItem } from '@components/Shopping/CartItem'

const meta = {
  title: 'Shopping/CartItem',
  component: CartItem,
  args: {
    item: { id: 1, name: 'Notebook', quantity: 2, price: 4.5 },
    onRemove: () => undefined,
  },
} satisfies Meta<typeof CartItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
