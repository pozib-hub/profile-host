import { HTMLAttributes, memo, ReactNode } from 'react'

import cn from '@shared/lib/classNames/classNames'
import styles from './Card.module.scss'

export type CardVariant = 'normal' | 'outlined' | 'light'
export type CardBorder = 'round' | 'normal' | 'partial'
export type CardPadding = number

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string
    children: ReactNode
    variant?: CardVariant
    padding?: CardPadding
    border?: CardBorder
    fullWidth?: boolean
    fullHeight?: boolean
}

export const Card = memo((props: CardProps) => {
    const {
        className,
        children,
        variant = 'normal',
        padding = 2,
        border = 'normal',
        fullWidth,
        fullHeight,
        ...otherProps
    } = props

    const style = {
        padding: padding * 4,
        ...otherProps.style,
    }

    return (
        <div
            className={cn(
                styles.wrapper,
                {
                    [styles.fullWidth]: fullWidth,
                    [styles.fullHeight]: fullHeight,
                },
                className,
                styles[variant],
                styles[border],
            )}
            {...otherProps}
            style={style}
        >
            {children}
        </div>
    )
})
