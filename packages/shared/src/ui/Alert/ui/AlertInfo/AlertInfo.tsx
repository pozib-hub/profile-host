import { useTranslation } from 'react-i18next'

import { Button } from '../../../Button'
import { Icon } from '../../../Icon'
import { HStack, VStack } from '../../../Stack'
import { IContentProps } from '../../types'

import styles from '../Alert/Alert.module.scss'
export const AlertInfo = (props: IContentProps) => {
    const { title, content, onConfirm } = props

    const { t } = useTranslation()

    return (
        <VStack fullWidth>
            <HStack className={styles.body} align="start">
                <Icon id="Info" size={30} className={styles.icon} />
                <div className={styles.paragraph}>
                    <span className={styles.title}>{title || t('alert.title.info')}</span>
                    <div className={styles.content}>{content}</div>
                </div>
            </HStack>
            <HStack className={styles.btns} fullWidth justify="end">
                <Button variant="filled" className="modal-button confirm" onClick={onConfirm}>
                    {t('yes')}
                </Button>
            </HStack>
        </VStack>
    )
}
