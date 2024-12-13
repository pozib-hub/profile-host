import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { CenterDecorator } from '@shared/config/storybook/CenterDecorator/CenterDecorator'
import { Icon } from '../Icon/Icon'
import { Input } from './Input'
import { IInputProps } from './types'

const meta: Meta<typeof Input> = {
    title: 'shared/Input',
    component: Input,
    argTypes: {
        value: { control: 'text' },
    },
    decorators: [CenterDecorator],
}

export default meta

type Story = StoryObj<typeof Input>

// const Template: StoryFn<IInputProps> = (args) => {
//     const [value, setValue] = useState(args.value || '')

//     return <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />
// }

// TODO

const Template: StoryFn<IInputProps> = (args) => {
    const [value, setValue] = useState(args.value || '')

    return <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />
}

// Standard ------------

export const Standard = Template.bind({})
Standard.args = {}

export const StandardWithLabel = Template.bind({})
StandardWithLabel.args = {
    label: 'label',
}

export const StandardWithLabelAndPlaceholder = Template.bind({})
StandardWithLabelAndPlaceholder.args = {
    label: 'label',
    placeholder: 'placeholder',
}

export const StandardDisabled = Template.bind({})
StandardDisabled.args = {
    label: 'label',
    disabled: true,
}

export const StandardError = Template.bind({})
StandardError.args = {
    label: 'label',
    required: true,
    isError: true,
    errorMessage: 'Что то пошло не так',
}

export const StandardWithIcons = Template.bind({})
StandardWithIcons.args = {
    label: 'label',
    iconLeft: <Icon id="Eye" size={20} />,
    iconRight: <Icon id="Notification" size={18} />,
}

// Filled ------------

export const Filled = Template.bind({})
Filled.args = {
    variant: 'filled',
}

export const FilledWithLabel = Template.bind({})
FilledWithLabel.args = {
    label: 'label',
    variant: 'filled',
}

export const FilledWithLabelAndPlaceholder = Template.bind({})
FilledWithLabelAndPlaceholder.args = {
    label: 'label',
    variant: 'filled',
    placeholder: 'placeholder',
}

export const FilledDisabled = Template.bind({})
FilledDisabled.args = {
    label: 'label',
    variant: 'filled',
    disabled: true,
}

export const FilledError = Template.bind({})
FilledError.args = {
    label: 'label',
    variant: 'filled',
    required: true,
    isError: true,
    errorMessage: 'Что то пошло не так',
}

export const FilledWithIcons = Template.bind({})
FilledWithIcons.args = {
    label: 'label',
    variant: 'filled',
    iconLeft: <Icon id="Eye" size={20} />,
    iconRight: <Icon id="Notification" size={18} />,
}

// Outline ------------

export const Outline = Template.bind({})
Outline.args = {
    variant: 'outline',
}

export const OutlineWithLabel = Template.bind({})
OutlineWithLabel.args = {
    label: 'label',
    variant: 'outline',
}

export const OutlineWithLabelAndPlaceholder = Template.bind({})
OutlineWithLabelAndPlaceholder.args = {
    label: 'label',
    variant: 'outline',
    placeholder: 'placeholder',
}

export const OutlineDisabled = Template.bind({})
OutlineDisabled.args = {
    label: 'label',
    variant: 'outline',
    disabled: true,
}

export const OutlineError = Template.bind({})
OutlineError.args = {
    label: 'label',
    variant: 'outline',
    required: true,
    isError: true,
    errorMessage: 'Что то пошло не так',
}

export const OutlineWithIcons = Template.bind({})
OutlineWithIcons.args = {
    label: 'label',
    variant: 'outline',
    iconLeft: <Icon id="Eye" size={20} />,
    iconRight: <Icon id="Notification" size={18} />,
}
