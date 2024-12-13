import { CSSProperties, useMemo, HTMLAttributes, FC } from 'react'
import cn from '@shared/lib/classNames/classNames'

import * as Icons from '../../assets/icons/svg'

import styles from './Icon.module.scss'

export type IconId = keyof typeof Icons

interface IProps extends HTMLAttributes<HTMLElement> {
    className?: string
    size?: number
    id: IconId
    color?: CSSProperties['color']
    inverted?: boolean
    clickable?: boolean
}

export const Icon: FC<IProps> = (props) => {
    const { id, className, size, color, inverted, clickable, ...divProps } = props

    const inlineStyles = useMemo<CSSProperties>(
        () => ({
            width: size || 25,
            height: size || 25,
            color: color || undefined,
        }),
        [size, color],
    )

    const IconById = Icons[id]
    const classess = [styles.wrapper, { [styles.inverted]: inverted }, className]

    if (!IconById) {
        throw new Error(`Icon with id "${id}" not found`)
    }

    if (clickable) {
        return (
            <button
                {...divProps}
                type="button"
                className={cn(...classess, styles.btn)}
                style={inlineStyles}
                onClick={props.onClick}
            >
                <IconById />
            </button>
        )
    }

    return (
        <div className={cn(...classess)} style={inlineStyles} {...divProps}>
            <IconById />
        </div>
    )
}
