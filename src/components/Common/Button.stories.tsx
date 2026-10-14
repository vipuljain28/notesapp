import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@components/Common/Button'

const meta = {
  title: 'Common/Button',
  component: Button,
  args: { children: 'Save changes' },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'danger', 'success'] },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
export const Secondary: Story = { args: { variant: 'secondary' } }
export const Disabled: Story = { args: { disabled: true } }
