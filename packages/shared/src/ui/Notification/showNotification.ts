import createNotificationsWrapper from './createNotificationsWrapper'
import { INotification } from './Notification'
import NotificationManager from './NotificationManager'

export const showNotification = (notification: INotification) => {
    if (!document.getElementById('notifications')) {
        createNotificationsWrapper().then(() => NotificationManager.create(notification))
    } else {
        NotificationManager.create(notification)
    }
}
