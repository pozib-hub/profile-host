import { Meta, StoryObj } from '@storybook/react'

import { CenterDecorator } from '@shared/config/storybook/CenterDecorator/CenterDecorator'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
    title: 'deprecated/shared/Button',
    component: Button,
    decorators: [CenterDecorator],
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
    args: {
        variant: 'primary',
        children: 'Text',
    },
}

export const Dashed: Story = {
    args: {
        variant: 'dashed',
        children: 'Text',
    },
}

export const Transparent: Story = {
    args: {
        variant: 'transparent',
        children: 'Text',
    },
}

export const Outline: Story = {
    args: {
        variant: 'outline',
        children: 'Text',
    },
}
