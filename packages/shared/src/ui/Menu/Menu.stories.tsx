import { Meta, StoryObj } from '@storybook/react'

import { CenterDecorator } from '@shared/config/storybook/CenterDecorator/CenterDecorator'

import { Button } from '../deprecated/Button/Button'
import { Menu } from './Menu'

const meta: Meta<typeof Menu> = {
    title: 'shared/Menu',
    component: Menu,
    decorators: [CenterDecorator],
}

export default meta

type Story = StoryObj<typeof Menu>

export const Default: Story = {
    args: {
        trigger: <Button>Open</Button>,
        items: [
            {
                content: 'first',
            },
            {
                content: 'second',
            },
            {
                content: 'third',
            },
        ],
    },
}
