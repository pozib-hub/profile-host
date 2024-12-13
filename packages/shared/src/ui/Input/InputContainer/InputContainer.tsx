import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'

import cn from '@shared/lib/classNames/classNames'

import { IInputProps } from '../types'

import styles from './InputContainer.module.scss'

export const InputContainer: FC<IInputProps> = memo(function InputContainer(props) {
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
        ...inputProps
    } = props

    const { t } = useTranslation('input')

    const isLabelWithPlaceholder = Boolean(label) && Boolean(placeholder)

    const wrapperStyle = {
        ...style,
        width: width || undefined,
    }

    return (
        <div className={cn(styles.wrapper, classNameWrapper)} style={wrapperStyle}>
            <div
                className={cn(styles.container, styles[`variant-${variant}`], styles[size], {
                    [styles.disabled]: disabled,
                    [styles.error]: isError,
                    [styles['label-static']]: isLabelWithPlaceholder,
                    [styles['not-empty']]: Boolean(props.value),
                })}
            >
                {iconLeft && <div className={styles['icon-left']}>{iconLeft}</div>}
                <div className={styles['container-input']}>
                    {children}
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
                <p className={styles['error-message']}>
                    {typeof errorMessage === 'boolean' ? t('errors.required') : errorMessage}
                </p>
            )}
        </div>
    )
})
