import { memo } from 'react'

import cn from '@shared/lib/classNames/classNames'

import styles from './Text.module.scss'

export type TextVariant = 'primary' | 'error' | 'accent' | 'hint'
export type TextAlign = 'right' | 'left' | 'center'
export type TextSize = 's' | 'm' | 'l'

interface TextProps {
    className?: string
    title?: string
    children?: string
    variant?: TextVariant
    align?: TextAlign
    size?: TextSize
    bold?: boolean
    'data-testid'?: string
}

type HeaderTagType = 'h1' | 'h2' | 'h3'

const mapSizeToClass: Record<TextSize, string> = {
    s: styles.size_s,
    m: styles.size_m,
    l: styles.size_l,
}

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    s: 'h3',
    m: 'h2',
    l: 'h1',
}

export const Text = memo((props: TextProps) => {
    const {
        className,
        children,
        title,
        variant = 'primary',
        align = 'left',
        size = 'm',
        bold,
        'data-testid': dataTestId = 'Text',
    } = props

    const HeaderTag = mapSizeToHeaderTag[size]
    const sizeClass = mapSizeToClass[size]

    const additionalClasses = [className, styles[variant], styles[align], sizeClass]

    return (
        <div className={cn(styles.wrapper, { [styles.bold]: bold }, ...additionalClasses)}>
            {title && (
                <HeaderTag className={styles.title} data-testid={`${dataTestId}.Header`}>
                    {title}
                </HeaderTag>
            )}
            <p className={styles.text} data-testid={`${dataTestId}.Paragraph`}>
                {children}
            </p>
        </div>
    )
})
