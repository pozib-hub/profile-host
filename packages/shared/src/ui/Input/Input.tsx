import React, { forwardRef, useEffect, useRef } from 'react'

import cn from '@shared/lib/classNames/classNames'
import { mergeRefs } from '@shared/lib/ref/mergeRefs'

import { IInputProps } from './types'
import { InputContainer } from './InputContainer/InputContainer'

import styles from './Input.module.scss'

export const Input = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
    const {
        classNameWrapper,
        variant = 'default',
        type = 'text',
        label,
        iconLeft,
        iconRight,
        errorMessage,
        isError,
        style,
        autoFocus,
        disabled,
        placeholder,
        size = 'medium',
        width,
        readonly,
        children,
        required,
        ...inputProps
    } = props

    const refInput = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (autoFocus) {
            // setFocus(true)
            refInput.current?.focus()
        }
    }, [autoFocus])

    return (
        <InputContainer {...props}>
            <input
                ref={mergeRefs([ref, refInput])}
                type={type}
                {...inputProps}
                readOnly={readonly}
                placeholder={placeholder}
                disabled={disabled}
                className={cn(styles.input, props.className)}
                style={{}}
            />
        </InputContainer>
    )
})
