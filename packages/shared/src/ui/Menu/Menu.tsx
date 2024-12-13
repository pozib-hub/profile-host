import { Fragment, ReactNode } from 'react'
import { Menu as HMenu } from '@headlessui/react'

import cn from '@shared/lib/classNames/classNames'
// import { MenuDirection } from 'shared/types/ui'
import { AppLink } from '../AppLink'

import styles from './Menu.module.scss'

export interface MenuItem {
    disabled?: boolean
    content?: ReactNode
    onClick?: () => void
    href?: string
}

type MenuDirection = 'bottom left' | 'bottom right' | 'top right' | 'top left'

interface MenuProps {
    className?: string
    items: MenuItem[]
    direction?: MenuDirection
    trigger: ReactNode
}

const mapDirectionClass: Record<MenuDirection, string> = {
    'bottom left': styles.optionsBottomLeft,
    'bottom right': styles.optionsBottomRight,
    'top right': styles.optionsTopRight,
    'top left': styles.optionsTopLeft,
}

export function Menu(props: MenuProps) {
    const { className, trigger, items, direction = 'bottom right' } = props

    const classDirection = mapDirectionClass[direction]

    return (
        <HMenu as="div" className={cn(styles.wrapper, className)}>
            <HMenu.Button className={styles.trigger}>{trigger}</HMenu.Button>
            <HMenu.Items className={cn(styles.list, classDirection)}>
                {items.map((item, index) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            type="button"
                            disabled={item.disabled}
                            onClick={item.onClick}
                            className={cn(styles.item, { [styles.active]: active })}
                        >
                            {item.content}
                        </button>
                    )

                    if (item.href) {
                        return (
                            <HMenu.Item
                                key={index}
                                as={AppLink}
                                to={item.href}
                                disabled={item.disabled}
                            >
                                {content}
                            </HMenu.Item>
                        )
                    }

                    return (
                        <HMenu.Item key={index} as={Fragment} disabled={item.disabled}>
                            {content}
                        </HMenu.Item>
                    )
                })}
            </HMenu.Items>
        </HMenu>
    )
}
