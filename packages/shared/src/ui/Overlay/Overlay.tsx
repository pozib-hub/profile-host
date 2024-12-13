import { memo } from 'react'

import cn from '@shared/lib/classNames/classNames'

import styles from './Overlay.module.scss'

interface OverlayProps {
    className?: string
    clickable?: boolean
    onClick?: () => void
}

export const Overlay = memo((props: OverlayProps) => {
    const { className, clickable = true, onClick } = props

    return (
        <div
            onClick={onClick}
            className={cn(styles.wrapper, { [styles.clickable]: clickable }, className)}
        />
    )
})
