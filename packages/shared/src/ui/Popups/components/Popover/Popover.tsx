import { ReactNode } from 'react'
import { Popover as HPopover } from '@headlessui/react'

import cn from '@shared/lib/classNames/classNames'
import { DropdownDirection } from '@shared/types/ui'
import { mapDirectionClass } from '../../styles/consts'

import popupStyles from '../../styles/popup.module.scss'
import styles from './Popover.module.scss'

interface PopoverProps {
    classNameWrapper?: string
    classNamePanel?: string
    direction?: DropdownDirection
    trigger: ReactNode
    children: ReactNode
}

export function Popover(props: PopoverProps) {
    const {
        classNameWrapper,
        classNamePanel,
        trigger,
        direction = 'bottom right',
        children,
    } = props

    const menuClasses = [mapDirectionClass[direction], popupStyles.menu]

    return (
        <HPopover className={cn(styles.wrapper, popupStyles.popup, classNameWrapper)}>
            <HPopover.Button as="div" className={popupStyles.trigger}>
                {trigger}
            </HPopover.Button>

            <HPopover.Panel className={cn(styles.panel, ...menuClasses, classNamePanel)}>
                {children}
            </HPopover.Panel>
        </HPopover>
    )
}
