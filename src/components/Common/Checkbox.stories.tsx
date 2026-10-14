import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from '@components/Common/Checkbox'

const meta = {
  title: 'Common/Checkbox',
  component: Checkbox,
  args: { label: 'Send a copy' },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Checked: Story = { args: { checked: true } }
