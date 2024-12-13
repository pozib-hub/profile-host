import React, { ButtonHTMLAttributes, FC } from 'react'

import cn from '@shared/lib/classNames/classNames'

import styles from './Button.module.scss'

type Variants = 'primary' | 'dashed' | 'transparent' | 'outline'
type Sizes = 'small' | 'medium' | 'large'
type Color = 'danger' | 'primary' | 'default '

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variants
    size?: Sizes
    color?: Color
    isLoading?: boolean
    fullWidth?: boolean
    disabled?: boolean
    clearPadding?: boolean
}
/**
 * @deprecated
 */
export const Button: FC<IButtonProps> = (props) => {
    const {
        className,
        children,
        variant = 'primary',
        size = 'medium',
        color = 'default',
        isLoading,
        fullWidth,
        disabled,
        clearPadding,
        ...buttonProps
    } = props

    const classes = [
        styles.button,
        styles[variant],
        styles[size],
        styles[color],
        {
            [styles.disabled]: disabled,
            [styles.loading]: isLoading,
            [styles.clearPadding]: clearPadding,
        },
        className,
    ]

    const style: React.CSSProperties = {}

    if (fullWidth) {
        style.width = '100%'
    }

    return (
        <button
            data-testid="button"
            type="button"
            {...buttonProps}
            disabled={disabled || isLoading}
            className={cn(classes)}
            style={style}
        >
            {isLoading && (
                <div className={styles.loader}>
                    <div />
                </div>
            )}
            <div className={cn(styles.content)}>{children}</div>
        </button>
    )
}
