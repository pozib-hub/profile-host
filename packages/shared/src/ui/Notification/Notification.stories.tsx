import { Meta, StoryObj } from '@storybook/react'

import { CenterDecorator } from '@shared/config/storybook/CenterDecorator/CenterDecorator'

import { showNotification } from './showNotification'
import { Button } from '../deprecated/Button/Button'
import { Flex } from '../Stack/Flex/Flex'

const Wrapper = ({ timeOut }: { timeOut: number }) => {
    const handleClickError = () => {
        showNotification({ timeOut, variant: 'error', text: 'Notification variant error' })
    }

    const handleClickInfo = () => {
        showNotification({ timeOut, variant: 'info', text: 'Notification variant info' })
    }

    const handleClickWarning = () => {
        showNotification({ timeOut, variant: 'warning', text: 'Notification variant warning' })
    }

    const handleClickSuccess = () => {
        showNotification({ timeOut, variant: 'success', text: 'Notification variant success' })
    }

    return (
        <Flex direction="row" gap={4}>
            <Button onClick={handleClickError}>Error</Button>
            <Button onClick={handleClickInfo}>Info</Button>
            <Button onClick={handleClickWarning}>Warning</Button>
            <Button onClick={handleClickSuccess}>Success</Button>
        </Flex>
    )
}

const meta: Meta<typeof Wrapper> = {
    title: 'shared/showNotification',
    component: Wrapper,
    decorators: [CenterDecorator],
}

export default meta

type Story = StoryObj<typeof Wrapper>

export const Default: Story = {
    args: {
        timeOut: 5000,
    },
}
