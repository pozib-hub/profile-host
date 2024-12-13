import { Meta, StoryObj } from '@storybook/react'

import { ListBox } from './ListBox'

const meta: Meta<typeof ListBox> = {
    title: 'shared/ListBox',
    component: ListBox,
}

export default meta

type Story = StoryObj<typeof ListBox>

export const Default: Story = {
    args: {},
}
