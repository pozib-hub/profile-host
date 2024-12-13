import ReactSelect, { GroupBase, Props } from 'react-select'

import cn from '@shared/lib/classNames/classNames'

import { InputContainer } from '../Input'

import styles from './Select.module.scss'

type Variants = 'filled' | 'outline' | 'default'

interface ISelectProps<OptionType, IsMulti extends boolean, Group extends GroupBase<OptionType>>
    extends Props<OptionType, IsMulti, Group> {
    className?: string
    label?: string
    isError?: boolean
    errorMessage?: boolean | string
    variant?: Variants
    width?: string | number
}

export function Select<
    OptionType,
    IsMulti extends boolean = false,
    Group extends GroupBase<OptionType> = GroupBase<OptionType>,
>(props: ISelectProps<OptionType, IsMulti, Group>) {
    const {
        className,
        label,
        isError,
        errorMessage,
        variant = 'default',
        width,
        placeholder,
        ...otherProps
    } = props

    return (
        <div className={cn(styles.wrapper, className)} style={{ width }}>
            <ReactSelect
                {...otherProps}
                components={{
                    Control: ({ children, hasValue, isFocused }) => {
                        const value = hasValue || isFocused ? 'true' : undefined
                        return (
                            <InputContainer
                                label={label}
                                isError={isError}
                                errorMessage={errorMessage}
                                variant={variant}
                                value={value}
                                placeholder=""
                            >
                                {children}
                            </InputContainer>
                        )
                    },
                }}
                placeholder={label ? '' : placeholder}
                styles={{
                    valueContainer: (base) => ({ ...base, padding: '0 8px' }),
                    dropdownIndicator: (base) => ({ ...base, padding: '6px 8px' }),
                }}
            />
        </div>
    )
}
