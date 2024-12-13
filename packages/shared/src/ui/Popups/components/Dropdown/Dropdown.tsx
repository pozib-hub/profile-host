import { Fragment, ReactNode } from 'react'
import { Menu } from '@headlessui/react'

import cn from '@shared/lib/classNames/classNames'
import { DropdownDirection } from '@shared/types/ui'
import { AppLink } from '../../../AppLink/AppLink'
import { mapDirectionClass } from '../../styles/consts'

import popupStyles from '../../styles/popup.module.scss'
import styles from './Dropdown.module.scss'

export interface DropdownItem {
    disabled?: boolean
    content?: ReactNode
    onClick?: () => void
    href?: string
}

interface DropdownProps {
    className?: string
    items: DropdownItem[]
    direction?: DropdownDirection
    trigger: ReactNode
}

export function Dropdown(props: DropdownProps) {
    const { className, trigger, items, direction = 'bottom right' } = props

    const menuClasses = [mapDirectionClass[direction], popupStyles.menu]

    return (
        <Menu as="div" className={cn(styles.Dropdown, popupStyles.popup, className)}>
            <Menu.Button className={popupStyles.trigger}>{trigger}</Menu.Button>
            <Menu.Items className={cn(styles.menu, ...menuClasses)}>
                {items.map((item, index) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            type="button"
                            disabled={item.disabled}
                            onClick={item.onClick}
                            className={cn(styles.item, {
                                [popupStyles.active]: active,
                            })}
                        >
                            {item.content}
                        </button>
                    )

                    if (item.href) {
                        return (
                            <Menu.Item
                                as={AppLink}
                                to={item.href}
                                disabled={item.disabled}
                                key={`dropdown-key-${index}`}
                            >
                                {content}
                            </Menu.Item>
                        )
                    }

                    return (
                        <Menu.Item
                            key={`dropdown-key-${index}`}
                            as={Fragment}
                            disabled={item.disabled}
                        >
                            {content}
                        </Menu.Item>
                    )
                })}
            </Menu.Items>
        </Menu>
    )
}
