import { memo, ReactNode, useCallback } from 'react'
import _ from 'lodash'

import cn from '@shared/lib/classNames/classNames'

import { Flex, FlexDirection } from '../Stack/Flex/Flex'

import styles from './Tags.module.scss'

export interface TagItem<ValueType> {
    value: ValueType
    label: ReactNode
    disabled?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TypesISValuePrimitive<ValueType> = {}

type TypesISValueObject<ValueType> = {
    fieldCompareValue: keyof ValueType
}

type CompareValue<ValueType> = ValueType extends object
    ? TypesISValueObject<ValueType>
    : TypesISValuePrimitive<ValueType>

type TabsPropsBase<
    ValueType,
    Multi extends boolean | undefined = boolean | undefined,
> = CompareValue<ValueType> & {
    isMulti?: Multi
    className?: string
    size?: 'small' | 'default' | 'large'
    direction?: FlexDirection
    tags: TagItem<ValueType>[]

    value: Multi extends true
        ? ValueType[] | TagItem<ValueType>[]
        : ValueType | TagItem<ValueType> | null

    onChange: Multi extends true
        ? (value: TagItem<ValueType>[]) => void
        : (value: TagItem<ValueType>) => void
}

type SingleTabProps<ValueType> = TabsPropsBase<ValueType, false> & {
    isMulti?: false
    value: ValueType | TagItem<ValueType> | null
    onChange: (value: TagItem<ValueType>) => void
}

type MultiTabProps<ValueType> = TabsPropsBase<ValueType, true> & {
    isMulti: true
    value: ValueType[] | TagItem<ValueType>[]
    onChange: (value: TagItem<ValueType>[]) => void
}

const isObject = (value: unknown): value is object => typeof value === 'object' && value !== null

function isTagItem<ValueType>(item: unknown): item is TagItem<ValueType> {
    return typeof item === 'object' && item !== null && 'value' in item && 'label' in item
}

export type ITagsProps<ValueType> = SingleTabProps<ValueType> | MultiTabProps<ValueType>

function TagsComponent<ValueType>(props: ITagsProps<ValueType>) {
    const { className, size = 'default', isMulti, tags, value, direction = 'row', onChange } = props

    const { fieldCompareValue } = props as TypesISValueObject<ValueType>

    const checkSelectedTag = useCallback(
        (value: TagItem<ValueType> | ValueType, tag: TagItem<ValueType>) => {
            if (Array.isArray(value)) {
                throw new Error('value must not be an array')
            }

            if (isTagItem(value)) {
                if (isObject(value.value)) {
                    return _.isEqual(tag.value[fieldCompareValue], value.value[fieldCompareValue])
                } else {
                    return tag.value === value.value
                }
            } else {
                if (isObject(value)) {
                    return _.isEqual(tag.value[fieldCompareValue], value[fieldCompareValue])
                } else {
                    return tag.value === value
                }
            }
        },
        [fieldCompareValue],
    )

    const handlerClick = useCallback(
        (tag: TagItem<ValueType>) => () => {
            if (tag.disabled) return

            if (isMulti) {
                const prevValues = tags.filter((t) => {
                    const prev = value.find((v) => {
                        if (isTagItem(v)) {
                            return _.isEqual(v.value, t.value)
                        } else {
                            return _.isEqual(v, t.value)
                        }
                    })
                    return prev
                })

                const hasValue = prevValues.findIndex((v) => checkSelectedTag(v, tag))

                if (hasValue === -1) {
                    onChange([...prevValues, tag])
                } else {
                    onChange(prevValues.filter((_, index) => index !== hasValue))
                }
            } else {
                onChange(tag)
            }
        },
        [checkSelectedTag, isMulti, onChange, tags, value],
    )

    return (
        <Flex direction={direction} gap={2} align="start" className={cn(styles.wrapper, className)}>
            {tags.map((tag, index) => {
                let isSelected = false

                if (isMulti) {
                    isSelected = value.some((v) => checkSelectedTag(v, tag))
                } else if (value) {
                    isSelected = checkSelectedTag(value, tag)
                }

                return (
                    <div
                        className={cn(
                            styles.tag,
                            styles[size],
                            { [styles.disabled]: tag.disabled },
                            { [styles.selected]: isSelected },
                        )}
                        key={tag.label?.toString() + String(index)}
                        onClick={handlerClick(tag)}
                    >
                        {tag.label}
                    </div>
                )
            })}
        </Flex>
    )
}

export const Tags = memo(TagsComponent) as typeof TagsComponent
