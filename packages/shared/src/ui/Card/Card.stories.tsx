import { Meta, StoryObj } from '@storybook/react'

import { CenterDecorator } from '@shared/config/storybook/CenterDecorator/CenterDecorator'

import { Text } from '../Text/Text'
import { Card } from './Card'

const meta: Meta<typeof Card> = {
    title: 'shared/Card',
    component: Card,
    decorators: [CenterDecorator],
}

export default meta

type Story = StoryObj<typeof Card>

export const Primary: Story = {
    args: {
        children: <Text variant="primary">test</Text>,
    },
}

export const Accent: Story = {
    args: {
        children: <Text variant="accent">test</Text>,
    },
}

export const Error: Story = {
    args: {
        children: <Text variant="error">test</Text>,
    },
}

export const PrimaryS: Story = {
    args: {
        children: (
            <Text variant="primary" size="s">
                test
            </Text>
        ),
    },
}

export const PrimaryM: Story = {
    args: {
        children: (
            <Text variant="primary" size="m">
                test
            </Text>
        ),
    },
}

export const PrimaryL: Story = {
    args: {
        children: (
            <Text variant="primary" size="l">
                test
            </Text>
        ),
    },
}

export const PrimaryBold: Story = {
    args: {
        children: (
            <Text variant="primary" bold>
                test
            </Text>
        ),
    },
}

export const PrimaryWithTitle: Story = {
    args: {
        children: (
            <Text variant="primary" bold title="TEst">
                TEST
            </Text>
        ),
    },
}
