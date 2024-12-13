import { CSSProperties, useMemo } from 'react'

import cn from '@shared/lib/classNames/classNames'
import { AppImage } from '../AppImage'
import { Skeleton } from '../Skeleton'
import { Icon } from '../Icon/Icon'

import styles from './Avatar.module.scss'
interface AvatarProps {
    className?: string
    src?: string
    size?: number
    alt?: string
}

export const Avatar = ({ className, src, size = 100, alt }: AvatarProps) => {
    const style = useMemo<CSSProperties>(
        () => ({
            width: size,
            height: size,
        }),
        [size],
    )

    const fallback = <Skeleton width={size} height={size} border="50%" />
    const errorFallback = <Icon id="UserFilled" size={size} />

    return (
        <AppImage
            fallback={fallback}
            errorFallback={errorFallback}
            src={src}
            alt={alt}
            style={style}
            className={cn(styles.wrapper, className)}
        />
    )
}
