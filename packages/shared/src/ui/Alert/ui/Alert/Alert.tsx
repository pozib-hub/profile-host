import { Card } from '../../../Card'
import { Overlay } from '../../../Overlay'

import cn from '@shared/lib/classNames/classNames'

import { AlertWarning } from '../AlertWarning/AlertWarning'
import { AlertError } from '../AlertError/AlertError'
import { AlertInfo } from '../AlertInfo/AlertInfo'
import { AlertConfirm } from '../AlertConfirm/AlertConfirm'
import { IAlertProps, IContentProps, Variant } from '../../types'

import styles from './Alert.module.scss'

const ContentByType: Record<Variant, (props: IContentProps) => JSX.Element> = {
    error: AlertError,
    warning: AlertWarning,
    info: AlertInfo,
    confirm: AlertConfirm,
}

export const Alert = (props: IAlertProps) => {
    const { type, title, content, onConfirm, onCancel, onClose } = props

    const handleConfirm = () => {
        onConfirm?.()
        onClose?.()
    }

    const handleCancel = () => {
        onCancel?.()
        onClose?.()
    }

    const Content = ContentByType[type]

    return (
        <div className={styles.wrapper}>
            <Overlay clickable={false} />
            <div className={styles.wrap} tabIndex={-1}>
                <Card role="dialog" className={cn(styles.modal, styles[type])}>
                    <div className={styles.modalContent}>
                        <Content
                            title={title}
                            content={content}
                            onConfirm={handleConfirm}
                            onCancel={handleCancel}
                        />
                    </div>
                </Card>
            </div>
        </div>
    )
}
