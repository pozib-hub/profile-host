import { CSSProperties, DetailedHTMLProps, HtmlHTMLAttributes, ReactNode } from 'react'

import cn from '@shared/lib/classNames/classNames'

import styles from './Flex.module.scss'

export type FlexJustify = 'start' | 'center' | 'end' | 'between'
export type FlexAlign = 'start' | 'center' | 'end' | 'baseLine'
export type FlexDirection = 'row' | 'column'

export type FlexGap = number

type DivProps = DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement>

const justifyClasses: Record<FlexJustify, string> = {
    start: styles.justifyStart,
    center: styles.justifyCenter,
    end: styles.justifyEnd,
    between: styles.justifyBetween,
}

const alignClasses: Record<FlexAlign, string> = {
    start: styles.alignStart,
    center: styles.alignCenter,
    end: styles.alignEnd,
    baseLine: styles.alignBaseLine,
}

const directionClasses: Record<FlexDirection, string> = {
    row: styles.directionRow,
    column: styles.directionColumn,
}

export interface FlexProps extends DivProps {
    className?: string
    children: ReactNode
    justify?: FlexJustify
    align?: FlexAlign
    direction: FlexDirection
    gap?: FlexGap
    padding?: FlexGap
    fullWidth?: boolean
    fullHeight?: boolean
}

export const Flex = (props: FlexProps) => {
    const {
        className,
        children,
        justify = 'start',
        align = 'center',
        direction = 'row',
        gap = 0,
        padding = 0,
        fullWidth,
        fullHeight,
    } = props

    const classes = [
        styles.flex,
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
    ]

    const mods = {
        [styles.fullWidth]: fullWidth,
        [styles.fullHeight]: fullHeight,
    }

    const style: CSSProperties = {}

    if (gap) {
        style.gap = gap * 4
    }

    if (padding) {
        style.padding = padding * 4
    }

    return (
        <div className={cn(classes, mods)} style={style}>
            {children}
        </div>
    )
}
