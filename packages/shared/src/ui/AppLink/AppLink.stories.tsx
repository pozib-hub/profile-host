import { Meta, StoryObj } from '@storybook/react'

import { CenterDecorator } from '@shared/config/storybook/CenterDecorator/CenterDecorator'
import { AppLink } from './AppLink'

const meta: Meta<typeof AppLink> = {
    title: 'shared/AppLink',
    args: {
        to: '',
        children: 'Text',
    },
    component: AppLink,
    decorators: [CenterDecorator],
}

export default meta

type Story = StoryObj<typeof AppLink>

export const Primary: Story = {
    args: {
        variant: 'primary',
    },
}

export const Secondary: Story = {
    args: {
        variant: 'primary',
    },
}
