import { Fragment, ReactNode, useState } from 'react'
import { Listbox as HListBox } from '@headlessui/react'

import cn from '@shared/lib/classNames/classNames'

import { HStack } from '../Stack'
import { Button } from '../Button/Button'
import styles from './ListBox.module.scss'

export interface ListBoxItem {
    value: string
    content: ReactNode
    disabled?: boolean
}

type DropdownDirection = 'top' | 'bottom'

interface ListBoxProps {
    items?: ListBoxItem[]
    className?: string
    value?: string
    defaultValue?: string
    onChange: (value: string) => void
    readonly?: boolean
    direction?: DropdownDirection
    label?: string
}

const mapDirectionClass: Record<DropdownDirection, string> = {
    bottom: styles.optionsBottom,
    top: styles.optionsTop,
}

export function ListBox(props: ListBoxProps) {
    const {
        className,
        items,
        value,
        defaultValue,
        onChange,
        readonly,
        direction = 'bottom',
        label,
    } = props

    // TODO сделть автоопределение есть такая утилита как floating см ее
    const optionsClasses = [mapDirectionClass[direction]]

    return (
        <HStack gap={1}>
            {label && <span>{`${label}>`}</span>}
            <HListBox
                disabled={readonly}
                as="div"
                className={cn(styles.ListBox, className)}
                value={value}
                onChange={onChange}
            >
                <HListBox.Button className={styles.trigger} disabled={readonly} as={Button}>
                    {value ?? defaultValue}
                </HListBox.Button>
                <HListBox.Options className={cn(styles.options, optionsClasses)}>
                    {items?.map((item) => (
                        <HListBox.Option
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            as={Fragment}
                        >
                            {({ active, selected }) => (
                                <li
                                    className={cn(styles.item, {
                                        [styles.active]: active,
                                        [styles.disabled]: item.disabled,
                                    })}
                                >
                                    {selected && '!!!'}
                                    {item.content}
                                </li>
                            )}
                        </HListBox.Option>
                    ))}
                </HListBox.Options>
            </HListBox>
        </HStack>
    )
}
