import { Meta, StoryObj } from '@storybook/react'

import { CenterDecorator } from '@shared/config/storybook/CenterDecorator/CenterDecorator'
import { AppImage } from './AppImage'
import { Skeleton } from '../Skeleton/Skeleton'

const meta: Meta<typeof AppImage> = {
    title: 'shared/AppImage',
    args: {
        // children: 'Text',
    },
    component: AppImage,
    decorators: [CenterDecorator],
}

export default meta

type Story = StoryObj<typeof AppImage>

export const Base: Story = {}

export const Loading: Story = {
    args: {
        src: 'https://via.placeholder.com/300x200',
        fallback: <Skeleton width={300} height={200} />,
    },
}

export const Error: Story = {
    args: {
        src: '',
        errorFallback: <div>Error stub</div>,
    },
}
