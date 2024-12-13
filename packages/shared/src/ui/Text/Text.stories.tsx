import { Meta, StoryObj } from '@storybook/react'

import { CenterDecorator } from '@shared/config/storybook/CenterDecorator/CenterDecorator'
import { Text } from './Text'

const meta: Meta<typeof Text> = {
    title: 'shared/Text',
    component: Text,
    decorators: [CenterDecorator],
}

export default meta

type Story = StoryObj<typeof Text>

export const Default: Story = {
    args: {
        children: 'Text',
    },
}

export const Accent: Story = {
    args: {
        variant: 'accent',
        children: 'Text',
    },
}

// TODO

// export const Paragraph: Story = {
//     args: {
//         variant: 'p',
//         children: 'Text',
//     },
//     decorators: [CenterDecorator],
// }

// export const ParagraphError: Story = {
//     args: {
//         variant: 'p',
//         color: 'red',
//         children: 'Text',
//     },
//     decorators: [CenterDecorator],
// }

// export const ParagraphEllipsis: Story = {
//     args: {
//         variant: 'p',
//         ellipsis: true,
//         children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, quod rem error enim tenetur ab suscipit impedit sint culpa ea.',
//     },
//     decorators: [CenterDecorator],
// }

// export const ParagraphEllipsisWith50px: Story = {
//     args: {
//         variant: 'p',
//         ellipsis: {
//             width: 50,
//         },
//         children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, quod rem error enim tenetur ab suscipit impedit sint culpa ea.',
//     },
//     decorators: [CenterDecorator],
// }

// export const ParagraphEllipsisWith50pxIn3Lines: Story = {
//     args: {
//         variant: 'p',
//         ellipsis: {
//             width: 50,
//             lines: 3,
//         },
//         children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, quod rem error enim tenetur ab suscipit impedit sint culpa ea. Dolor, quod rem error enim tenetur ab suscipit impedit sint culpa ea',
//     },
//     decorators: [CenterDecorator],
// }

// // export const DefaultThemeDark: Story = {
// //     ...Default,
// //     decorators: [CenterDecorator, ThemeDecorator(Theme.DARK)],
// // }
