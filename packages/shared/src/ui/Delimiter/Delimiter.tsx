import React, { FC, memo, CSSProperties } from 'react'

import styles from './Delimiter.module.scss'

import cn from '@shared/lib/classNames/classNames'

interface IDelimiterProps {
    className?: string
    margin?: CSSProperties['marginBlock']
}
export const Delimiter: FC<IDelimiterProps> = memo(function Delimiter(props) {
    const { className, margin } = props

    const style: CSSProperties = {
        marginBlock: margin,
    }

    return <div className={cn(styles.delimiter, className)} style={style} />
})
