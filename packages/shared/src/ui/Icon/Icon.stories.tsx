
import { Meta, StoryObj } from '@storybook/react'

import { CenterDecorator } from '@shared/config/storybook/CenterDecorator/CenterDecorator'

import * as Icons from '../../assets/icons/svg'
import { Icon, IconId } from './Icon'

const meta: Meta<typeof Icon> = {
    title: 'shared/Icon',
    component: Icon,
    decorators: [CenterDecorator],
}

export default meta

type Story = StoryObj<typeof Icon>;

export const AllIcons: Story = {
    args: {
        color: "black",
        size: 50,
    },
    render: (args) => (
        <div style={{ display: 'flex', flexDirection: "column", gap: '30px', padding: 20 }}>
            {Object.keys(Icons).map((iconId) => (
                <div key={iconId} style={{ display: 'flex', alignItems: "center", gap: '8px' }}>
                    <Icon id={iconId as IconId} color={args.color} size={args.size} />
                    <div>{iconId}</div>
                </div>
            ))}
        </div>
    ),
}