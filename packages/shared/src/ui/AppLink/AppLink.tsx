import { LinkProps, NavLink } from 'react-router-dom'
import { memo, ReactNode } from 'react'

import cn from '@shared/lib/classNames/classNames'

import styles from './AppLink.module.scss'

export type AppLinkVariant = 'primary' | 'red'

interface AppLinkProps extends LinkProps {
    className?: string
    variant?: AppLinkVariant
    children?: ReactNode
    activeClassName?: string
    decoration?: boolean
}

export const AppLink = memo((props: AppLinkProps) => {
    const {
        to,
        className,
        children,
        variant = 'primary',
        activeClassName = '',
        decoration = false,
        ...otherProps
    } = props

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                cn(
                    styles.wrapper,
                    styles[variant],
                    { [activeClassName]: isActive, [styles.decoration]: decoration },
                    className,
                )
            }
            {...otherProps}
        >
            {children}
        </NavLink>
    )
})
