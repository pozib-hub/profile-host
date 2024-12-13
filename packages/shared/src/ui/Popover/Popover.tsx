import { ReactNode } from 'react'
import { Popover as HPopover, PopoverPanel, PopoverButton } from '@headlessui/react'

import cn from '@shared/lib/classNames/classNames'

import styles from './Popover.module.scss'

type DropdownDirection = 'bottom left' | 'bottom right' | 'top right' | 'top left'

const mapDirectionClass: Record<DropdownDirection, string> = {
    'bottom left': styles.optionsBottomLeft,
    'bottom right': styles.optionsBottomRight,
    'top right': styles.optionsTopRight,
    'top left': styles.optionsTopLeft,
}

interface PopoverProps {
    className?: string
    direction?: DropdownDirection
    trigger: ReactNode
    children: ReactNode
}

export function Popover(props: PopoverProps) {
    const { className, trigger, direction = 'bottom right', children } = props

    const panelClasses = mapDirectionClass[direction]

    return (
        <HPopover className={cn(styles.Popover, className)}>
            <PopoverButton as="div" className={styles.trigger}>
                {trigger}
            </PopoverButton>

            <PopoverPanel className={cn(styles.panel, panelClasses)}>{children}</PopoverPanel>
        </HPopover>
    )
}
