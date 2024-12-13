import React, { memo } from 'react'

import cn from '@shared/lib/classNames/classNames'

import { HStack } from '../Stack'
import { Icon } from '../Icon/Icon'

import styles from './AppLogo.module.scss'

interface AppLogoProps {
    className?: string
    size?: number
}

export const AppLogo = memo(({ className, size = 50 }: AppLogoProps) => {
    return (
        <HStack fullWidth justify="center" className={cn(styles.wrapper, className)}>
            <Icon id="AppImage" size={size} className={styles.logo} />
            <div className={styles.gradientBig} />
            <div className={styles.gradientSmall} />
        </HStack>
    )
})
