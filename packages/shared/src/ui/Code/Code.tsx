import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'

import cn from '@shared/lib/classNames/classNames'

import styles from './Code.module.scss'
import { Icon } from '../Icon/Icon'

interface ICodeProps {
    className?: string
    children: string
}

export const Code: FC<ICodeProps> = memo(function Code(props) {
    const { className, children } = props

    const { t } = useTranslation()

    const onCopy = () => {
        navigator.clipboard.writeText(children)
    }

    return (
        <pre className={cn(styles.wrapper, className)}>
            <Icon id="Copy_2" clickable onClick={onCopy} className={styles.btnCopy} />
            <code>{children}</code>
        </pre>
    )
})
