import { Meta, StoryObj } from '@storybook/react'

import { CenterDecorator } from '@shared/config/storybook/CenterDecorator/CenterDecorator'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
    title: 'shared/Button',
    component: Button,
    decorators: [CenterDecorator],
}

export default meta

type Story = StoryObj<typeof Button>

export const Filled: Story = {
    args: {
        variant: 'filled',
        children: 'Text',
    },
}

export const FilledError: Story = {
    args: {
        variant: 'filled',
        color: 'error',
        children: 'Text',
    },
}

export const FilledSuccess: Story = {
    args: {
        variant: 'filled',
        color: 'success',
        children: 'Text',
    },
}

export const Outline: Story = {
    args: {
        variant: 'outline',
        children: 'Text',
    },
}

export const OutlineError: Story = {
    args: {
        variant: 'outline',
        color: 'error',
        children: 'Text',
    },
}

export const OutlineSuccess: Story = {
    args: {
        variant: 'outline',
        color: 'success',
        children: 'Text',
    },
}

export const Clear: Story = {
    args: {
        variant: 'clear',
        children: 'Text',
    },
}

export const ClearError: Story = {
    args: {
        variant: 'clear',
        color: 'error',
        children: 'Text',
    },
}

export const ClearSuccess: Story = {
    args: {
        variant: 'clear',
        color: 'success',
        children: 'Text',
    },
}
