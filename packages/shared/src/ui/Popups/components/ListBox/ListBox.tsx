import { Fragment, ReactNode, useMemo } from 'react'
import { Listbox as HListBox } from '@headlessui/react'

import cn from '@shared/lib/classNames/classNames'
import { DropdownDirection } from '@shared/types/ui'
import { mapDirectionClass } from '../../styles/consts'
import { HStack } from '../../../Stack'
import { Button } from '../../../Button'
import { Icon } from '../../../Icon/Icon'

import popupStyles from '../../styles/popup.module.scss'
import styles from './ListBox.module.scss'

export interface ListBoxItem<T extends string> {
    value: string
    content: ReactNode
    disabled?: boolean
}

interface ListBoxProps<T extends string> {
    items?: ListBoxItem<T>[]
    className?: string
    value?: T
    defaultValue?: string
    onChange: (value: T) => void
    readonly?: boolean
    direction?: DropdownDirection
    label?: string
    max?: boolean
}

export function ListBox<T extends string>(props: ListBoxProps<T>) {
    const {
        className,
        items,
        value,
        defaultValue,
        onChange,
        readonly,
        direction = 'bottom right',
        label,
        max,
    } = props

    const optionsClasses = [mapDirectionClass[direction], popupStyles.menu]

    const selectedItem = useMemo(() => {
        return items?.find((item) => item.value === value)
    }, [items, value])

    return (
        <HStack fullWidth={max} gap={1}>
            {label && <span>{`${label}>`}</span>}
            <HListBox
                disabled={readonly}
                as="div"
                className={cn(styles.ListBox, className, popupStyles.popup)}
                value={value}
                onChange={onChange}
            >
                <HListBox.Button
                    as={Button}
                    variant="filled"
                    disabled={readonly}
                    addonRight={<Icon id="ArrowBottom" />}
                    className={styles.trigger}
                >
                    <span className={styles.contentText}>
                        {selectedItem?.content ?? defaultValue}
                    </span>
                </HListBox.Button>
                <HListBox.Options className={cn(styles.options, ...optionsClasses)}>
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
                                        [popupStyles.active]: active,
                                        [popupStyles.disabled]: item.disabled,
                                        [popupStyles.selected]: selected,
                                    })}
                                >
                                    {selected}
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
