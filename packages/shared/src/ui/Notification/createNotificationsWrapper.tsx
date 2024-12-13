import { createRoot } from 'react-dom/client'

import NotificationsContainer from './NotificationContainer'

export default async function createNotificationsWrapper() {
    return new Promise((resolve) => {
        const NotificationWrapper = document.createElement('div')
        NotificationWrapper.id = 'notifications'

        document.body.appendChild(NotificationWrapper)

        const root = createRoot(NotificationWrapper)
        root.render(<NotificationsContainer onMount={() => resolve(null)} />)
    })
}
