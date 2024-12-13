import ReactDOM from 'react-dom/client'

import { IAlertProps } from './types'
import { Alert } from './ui/Alert/Alert'

export const showAlert = (props: IAlertProps) => {
    const { type = 'info', title, content, onConfirm, onCancel } = props

    const container = document.createElement('div')
    container.className = 'alert-container'
    document.body.appendChild(container)

    const root = ReactDOM.createRoot(container)

    const closeModal = () => {
        root.unmount()
        document.body.removeChild(container)
    }

    root.render(
        <Alert
            type={type}
            title={title}
            content={content}
            onConfirm={onConfirm}
            onCancel={onCancel}
            onClose={closeModal}
        />,
    )
}
