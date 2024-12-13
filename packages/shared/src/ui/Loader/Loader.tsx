import React, { FC } from 'react'

import cn from '@shared/lib/classNames/classNames'

import './Loader.scss'

interface ILoaderProps {
    className?: string;
}

export const Loader: FC<ILoaderProps> = (props) => {
    const {
        className,
    } = props

    return (
        <div className={cn('lds-ellipsis', className)}>
            <div />
            <div />
            <div />
            <div />
        </div>
    )
}
