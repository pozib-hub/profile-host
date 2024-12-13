import { ReactNode } from 'react'

export type Variant = 'info' | 'error' | 'warning' | 'confirm'

export interface IAlertProps {
    type: Variant
    content: ReactNode
    title?: string
    onConfirm?: () => void
    onCancel?: () => void
    onClose?: () => void
}

export interface IContentProps {
    content: ReactNode
    title?: string
    onConfirm?: () => void
    onCancel?: () => void
}
