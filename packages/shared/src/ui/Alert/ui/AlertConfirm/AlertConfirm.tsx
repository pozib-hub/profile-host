import { useTranslation } from 'react-i18next'

import { Button } from '../../../Button'
import { Icon } from '../../../Icon'
import { HStack, VStack } from '../../../Stack'
import { IContentProps } from '../../types'

import styles from '../Alert/Alert.module.scss'

export const AlertConfirm = (props: IContentProps) => {
    const { title, content, onConfirm, onCancel } = props

    const { t } = useTranslation()

    return (
        <VStack fullWidth>
            <HStack className={styles.body} align="start">
                <Icon id="Warning" className={styles.icon} />
                <VStack className={styles.paragraph} gap={2}>
                    <span className={styles.title}>{title || t('alert.title.confirm')}</span>
                    <div className={styles.content}>{content}</div>
                </VStack>
            </HStack>
            <HStack className={styles.btns} fullWidth justify="end" gap={4}>
                <Button variant="filled" onClick={onCancel}>
                    {t('cancel')}
                </Button>
                <Button variant="filled" color="success" onClick={onConfirm}>
                    {t('yes')}
                </Button>
            </HStack>
        </VStack>
    )
}
