import type { Meta, StoryObj } from '@storybook/react-vite'
import { Modal } from '@components/Common/Modal'
import { Button } from '@components/Common/Button'

const meta = {
  title: 'Common/Modal',
  component: Modal,
  args: {
    isOpen: true,
    title: 'Confirm action',
    onClose: () => undefined,
    children: <p>Are you sure you want to continue?</p>,
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {}
export const WithAction: Story = {
  args: {
    children: <><p>Review before continuing.</p><Button onClick={() => undefined}>Continue</Button></>,
  },
}
