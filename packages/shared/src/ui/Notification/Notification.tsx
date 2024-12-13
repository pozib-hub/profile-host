import React, { useCallback, useEffect, useRef, FC } from 'react'
import { useTranslation } from 'react-i18next'

import cn from '@shared/lib/classNames/classNames'
import { Icon } from '../Icon/Icon'

import styles from './Notification.module.scss'

const titles = {
    info: 'notifications.info',
    success: 'notifications.success',
    warning: 'notifications.warning',
    error: 'notifications.error',
}

const icon = {
    success: <Icon id="Done" size={20} />,
    info: <Icon id="Info" size={26} />,
    warning: <Icon id="Warning" size={30} />,
    error: <Icon id="Error" size={26} />,
}

export interface INotification {
    id?: string
    variant: 'success' | 'info' | 'warning' | 'error'
    text?: string | string[]
    title?: string
    priority?: boolean
    timeOut?: number
    onClick?: () => void
    callback?: () => void
}

interface INotificationProps extends INotification {
    onRequestHide: () => void
}

const Notification: FC<INotificationProps> = (props) => {
    const { id, variant, text, title, priority, timeOut, onRequestHide, onClick, callback } = props

    const timer = useRef<ReturnType<typeof setInterval> | null>(null)
    const { t } = useTranslation()

    const handleClick = useCallback(() => {
        onClick?.()
        onRequestHide()
    }, [onClick, onRequestHide])

    const requestHide = useCallback(() => {
        onRequestHide()
        callback?.()
    }, [callback, onRequestHide])

    useEffect(() => {
        if (timeOut !== 0) {
            timer.current = setTimeout(requestHide, timeOut)
        }

        return () => {
            if (timer.current) {
                clearTimeout(timer.current)
            }
        }
    }, [id, requestHide, timeOut])

    return (
        <div role="presentation" className={styles.wrapper} onClick={handleClick}>
            <div className={cn(styles.content, styles[`variant--${variant}`])}>
                <div className={styles.icon}>{icon[variant]}</div>
                <div>
                    <div className={styles.title}>{title || t(titles[variant])}</div>
                    {Array.isArray(text) ? (
                        text.map((t) => (
                            <div key={t} className={styles.text}>
                                {t}
                            </div>
                        ))
                    ) : (
                        <div className={styles.text}>{text}</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Notification
