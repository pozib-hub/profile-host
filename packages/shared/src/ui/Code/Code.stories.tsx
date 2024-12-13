import { Meta, StoryObj } from '@storybook/react'

import { CenterDecorator } from '@shared/config/storybook/CenterDecorator/CenterDecorator'

import { Code } from './Code'

const meta: Meta<typeof Code> = {
    title: 'shared/Code',
    component: Code,
    decorators: [CenterDecorator],
}

export default meta

type Story = StoryObj<typeof Code>;

const code = `
import { Meta, StoryObj } from '@storybook/react'

import { ThemeDecorator } from 'src/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { CenterDecorator } from 'shared/config/storybook/CenterDecorator/CenterDecorator'
import { Theme } from 'src/app/providers/ThemeProvider'
import { Code } from './Code'

const meta: Meta<typeof Code> = {
    title: 'shared/Code',
    component: Code,
}

export default meta

type Story = StoryObj<typeof Code>;
`

export const Block: Story = {
    args: {
        children: code,
    },
}