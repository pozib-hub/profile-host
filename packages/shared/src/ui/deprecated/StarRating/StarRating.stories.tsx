import { Meta, StoryObj } from '@storybook/react'

import { CenterDecorator } from '@shared/config/storybook/CenterDecorator/CenterDecorator'
import { StarRating } from './StarRating'

const meta: Meta<typeof StarRating> = {
    title: 'shared/StarRating',
    component: StarRating,
    decorators: [CenterDecorator]
}

export default meta

type Story = StoryObj<typeof StarRating>

export const Default: Story = {
    args: {},
}
