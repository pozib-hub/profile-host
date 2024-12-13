import { Meta, StoryObj } from '@storybook/react'

import { CenterDecorator } from '@shared/config/storybook/CenterDecorator/CenterDecorator'
import { Modal } from './Modal'

const meta: Meta<typeof Modal> = {
    title: 'shared/Modal',
    component: Modal,
}

export default meta

type Story = StoryObj<typeof Modal>

export const Transparent: Story = {
    decorators: [CenterDecorator],
}
