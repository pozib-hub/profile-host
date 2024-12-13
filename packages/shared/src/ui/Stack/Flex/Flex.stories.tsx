import { Meta, StoryObj } from '@storybook/react'

import { CenterDecorator } from '@shared/config/storybook/CenterDecorator/CenterDecorator'
import { Flex } from './Flex'

const meta: Meta<typeof Flex> = {
    title: 'shared/Flex',
    component: Flex,
    decorators: [CenterDecorator],
}

export default meta

type Story = StoryObj<typeof Flex>

export const Row: Story = {
    args: {
        children: (
            <>
                <div>first</div>
                <div>second</div>
                <div>third</div>
                <div>fourth</div>
            </>
        ),
    },
}

export const RowGap: Story = {
    args: {
        gap: 1,
        children: (
            <>
                <div>first</div>
                <div>second</div>
                <div>third</div>
                <div>fourth</div>
            </>
        ),
    },
}

export const Column: Story = {
    args: {
        direction: 'column',
        children: (
            <>
                <div>first</div>
                <div>second</div>
                <div>third</div>
                <div>fourth</div>
            </>
        ),
    },
}

export const ColumnGap16: Story = {
    args: {
        gap: 4,
        direction: 'column',
        children: (
            <>
                <div>first</div>
                <div>second</div>
                <div>third</div>
                <div>fourth</div>
            </>
        ),
    },
}

export const ColumnAlignEnd: Story = {
    args: {
        direction: 'column',
        align: 'end',
        children: (
            <>
                <div>first</div>
                <div>second</div>
                <div>third</div>
                <div>fourth</div>
            </>
        ),
    },
}
