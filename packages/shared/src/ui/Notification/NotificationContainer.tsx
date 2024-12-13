import React, {
    useCallback, useLayoutEffect, useState, FC,
} from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import NotificationManager from './NotificationManager'
import Notification, { INotification } from './Notification'

import styles from './Notification.module.scss'

const enterTimeout = 800
const leaveTimeout = 800

interface INotificationsContainerProps {
    onMount?: () => void
}

const NotificationsContainer: FC<INotificationsContainerProps> = ({ onMount }) => {
    const [notifications, setNotifications] = useState<INotification[]>([])

    const handleStoreChange = useCallback((notifications: INotification[]) => {
        setNotifications([...notifications])
    }, [])

    const handleRequestHide = useCallback((notification: INotification) => {
        NotificationManager.remove(notification)
    }, [])

    useLayoutEffect(() => {
        onMount?.()
        NotificationManager.addChangeListener(handleStoreChange)

        return () => {
            NotificationManager.removeChangeListener(handleStoreChange)
        }
    }, [handleStoreChange, onMount])

    const items = notifications.map((notification) => {
        const key = notification.id || String(new Date().getTime())

        return (
            <CSSTransition
                key={key}
                classNames={{
                    enter: styles['notification-enter'],
                    exit: styles['notification-exit'],
                }}
                timeout={{ enter: enterTimeout, exit: leaveTimeout }}
            >
                <Notification
                    variant={notification.variant}
                    text={notification.text}
                    title={notification.title}
                    timeOut={notification.timeOut}
                    callback={notification.callback}
                    onClick={notification.onClick}
                    onRequestHide={() => handleRequestHide(notification)}
                />
            </CSSTransition>
        )
    })

    return <TransitionGroup className={styles['notifications-container']}>{items}</TransitionGroup>
}

export default NotificationsContainer
