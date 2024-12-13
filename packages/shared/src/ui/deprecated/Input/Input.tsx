import React, { FC, InputHTMLAttributes, memo, useEffect, useRef, useState } from 'react'

import cn from '@shared/lib/classNames/classNames'

import styles from './Input.module.scss'

type Variants = 'filled' | 'outline' | 'default'
type Sizes = 'small' | 'medium' | 'large'
export interface IInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    variant?: Variants
    classNameWrapper?: string
    label?: string
    iconLeft?: React.ReactNode
    iconRight?: React.ReactNode
    errorMessage?: string
    error?: boolean
    autoFocus?: boolean
    disabled?: boolean
    placeholder?: string
    size?: Sizes
}

/**
 * @deprecated
 */
export const Input: FC<IInputProps> = memo(function Input(props) {
    const {
        classNameWrapper,
        variant = 'default',
        type = 'text',
        label,
        iconLeft,
        iconRight,
        errorMessage,
        error,
        style,
        autoFocus,
        disabled,
        placeholder,
        size = 'medium',
        width,
        ...inputProps
    } = props

    const isLabelWithPlaceholder = Boolean(label) && Boolean(placeholder)

    const [isFocus, setFocus] = useState(false)
    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (autoFocus) {
            setFocus(true)
            ref.current?.focus()
        }
    }, [autoFocus])

    const wrapperStyle = {
        ...style,
        width: width || undefined,
    }

    return (
        <div className={cn(styles.wrapper, classNameWrapper)} style={wrapperStyle}>
            <div
                className={cn(styles.container, styles[`variant-${variant}`], styles[size], {
                    [styles.disabled]: disabled,
                    [styles.error]: error,
                    [styles['label-static']]: isLabelWithPlaceholder,
                })}
            >
                {iconLeft && <div className={styles['icon-left']}>{iconLeft}</div>}
                <div className={styles['container-input']}>
                    <input
                        ref={ref}
                        type={type}
                        {...inputProps}
                        placeholder={placeholder}
                        disabled={disabled}
                        className={cn(styles.input, props.className, {
                            [styles['not-empty']]: Boolean(props.value),
                        })}
                        style={{}}
                    />
                    {label && !props.hidden && (
                        <label className={cn(styles.label)}>
                            <span className={styles['label-text']}>{label}</span>
                            {props.required && (
                                <span className={styles['label-star-required']}>∗</span>
                            )}
                        </label>
                    )}
                    {variant === 'outline' && (
                        <fieldset
                            aria-hidden="true"
                            className={styles.fieldset}
                            style={iconLeft ? { padding: '0 32px' } : {}}
                        >
                            <legend
                                className={styles.legend}
                                style={label ? undefined : { width: '0.01px' }}
                            >
                                <span className={styles['label-text']}>{label}</span>
                                {props.required && (
                                    <span className={styles['label-required']}>∗</span>
                                )}
                            </legend>
                        </fieldset>
                    )}
                </div>
                {iconRight && <div className={styles['icon-right']}>{iconRight}</div>}
            </div>
            {errorMessage && (
                <p className={styles['error-message']} title={errorMessage}>
                    {errorMessage}
                </p>
            )}
        </div>
    )
})
