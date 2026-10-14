import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from '@components/Common/Select'

const meta = {
  title: 'Common/Select',
  component: Select,
  args: {
    label: 'Status',
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ],
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Invalid: Story = { args: { error: 'Choose a status.' } }
