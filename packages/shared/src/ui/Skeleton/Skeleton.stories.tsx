import { Meta, StoryObj } from '@storybook/react'

import { CenterDecorator } from '@shared/config/storybook/CenterDecorator/CenterDecorator'
import { Skeleton } from './Skeleton'

const meta: Meta<typeof Skeleton> = {
    title: 'shared/Skeleton',
    component: Skeleton,
    decorators: [CenterDecorator],
}

export default meta

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
    args: {
        height: 60,
        width: 200,
    },
}

export const Circle: Story = {
    args: {
        border: '50%',
        width: 100,
        height: 100,
    },
}
