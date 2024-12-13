import { ButtonHTMLAttributes, ForwardedRef, forwardRef, ReactNode } from 'react'

import cn from '@shared/lib/classNames/classNames'
import styles from './Button.module.scss'

export type ButtonVariant = 'clear' | 'outline' | 'filled'
export type ButtonColor = 'normal' | 'success' | 'error'

export type ButtonSize = 's' | 'm' | 'l' | 'xl'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    /**
     * Тема кнопки. Отвечает за визуал (в рамке, без стилей, противоположный теме приложения цвет и тд)
     */
    variant?: ButtonVariant
    /**
     * Флаг, делающий кнопку квадратной
     */
    square?: boolean
    /**
     * Размер кнопки в соответствии с дизайн системой
     */
    size?: ButtonSize
    /**
     * Флаг, отвечающий за работу кнопки
     */
    disabled?: boolean
    /**
     * Содержимое кнопки
     */
    children?: ReactNode
    /**
     * Увеличивает кнопку на всю свободную ширину
     */
    fullWidth?: boolean

    color?: ButtonColor

    addonLeft?: ReactNode
    addonRight?: ReactNode
    isLoading?: boolean
}

export const Button = forwardRef((props: IButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const {
        className,
        children,
        variant = 'outline',
        square,
        disabled,
        fullWidth,
        size = 'm',
        addonLeft,
        addonRight,
        color = 'normal',
        isLoading,
        ...otherProps
    } = props

    const mods = {
        [styles.square]: square,
        [styles.disabled]: disabled,
        [styles.fullWidth]: fullWidth,
        [styles.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
    }

    return (
        <button
            type="button"
            className={cn(
                styles.Button,
                mods,
                className,
                styles[variant],
                styles[size],
                styles[color],
            )}
            disabled={disabled}
            {...otherProps}
            ref={ref}
        >
            {isLoading && (
                <div className={styles.loader}>
                    <div />
                </div>
            )}
            <div className={styles.addonLeft}>{addonLeft}</div>
            {children}
            <div className={styles.addonRight}>{addonRight}</div>
        </button>
    )
})
