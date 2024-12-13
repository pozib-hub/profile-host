import { Meta, StoryObj } from '@storybook/react'

import { CenterDecorator } from '@shared/config/storybook/CenterDecorator/CenterDecorator'
import { Loader } from './Loader'

const meta: Meta<typeof Loader> = {
    title: 'shared/Loader',
    component: Loader,
    decorators: [CenterDecorator]
}

export default meta

type Story = StoryObj<typeof Loader>;

export const Default: Story = {
}
