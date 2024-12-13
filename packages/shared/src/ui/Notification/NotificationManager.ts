import { EventEmitter } from 'events'

import { INotification } from './Notification'

const createUUID = () => {
    const pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    return pattern.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}

const Constants = {
    EMIT_EVENT_NAME: 'notifications',
}

class NotificationManager extends EventEmitter {
    listNotify: INotification[]

    constructor() {
        super()
        this.listNotify = []
    }

    async create(notify: INotification) {
        const defaultNotify: INotification = {
            id: createUUID(),
            variant: 'info',
            title: '',
            text: '',
            timeOut: 5000,
        }

        if (notify.priority) {
            this.listNotify.unshift(Object.assign(defaultNotify, notify))
        } else {
            this.listNotify.push(Object.assign(defaultNotify, notify))
        }

        this.emitChange()
    }

    remove(notification: INotification) {
        this.listNotify = this.listNotify.filter((n) => notification.id !== n.id)
        this.emitChange()
    }

    removeAll() {
        this.listNotify.length = 0
        this.emitChange()
    }

    emitChange() {
        this.emit(Constants.EMIT_EVENT_NAME, this.listNotify)
    }

    addChangeListener(callback: (notifications: INotification[]) => void) {
        this.addListener(Constants.EMIT_EVENT_NAME, callback)
    }

    removeChangeListener(callback: (notifications: INotification[]) => void) {
        this.removeListener(Constants.EMIT_EVENT_NAME, callback)
    }
}

export default new NotificationManager()
