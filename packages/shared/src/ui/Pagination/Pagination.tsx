import React, { FC, memo } from 'react'

import cn from '@shared/lib/classNames/classNames'

import { DOTS, usePagination } from './usePagination'

import styles from './Pagination.module.scss'

interface IPaginationProps {
    className?: string
    totalCount: number
    siblingCount?: number
    currentPage: number
    pageSize: number
    disabled?: boolean
    onPageChange: (page: number) => void
}

export const Pagination: FC<IPaginationProps> = memo(function Pagination(props) {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className,
        disabled,
    } = props

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    })

    const lastPage = paginationRange[paginationRange.length - 1]

    if (currentPage === 0 || paginationRange.length < 2) {
        return null
    }

    const onNext = () => {
        onPageChange(currentPage + 1)
    }

    const onPrevious = () => {
        onPageChange(currentPage - 1)
    }

    return (
        <ul className={cn(styles.wrapper, className)}>
            <li
                className={cn(styles.item, {
                    [styles.disabled]: currentPage === 1,
                })}
                onClick={() => {
                    if (currentPage === 1 || disabled) return
                    onPrevious()
                }}
            >
                <div className={cn(styles.arrow, styles.left)} />
            </li>
            {paginationRange.map((pageNumber, index) => {
                if (pageNumber === DOTS) {
                    return (
                        <li key={`${pageNumber}_${index}`} className={cn(styles.item, styles.dots)}>
                            …
                        </li>
                    )
                }

                return (
                    <li
                        key={`${pageNumber}_${index}`}
                        className={cn(styles.item, {
                            [styles.selected]: pageNumber === currentPage,
                            [styles.disabled]: disabled,
                        })}
                        onClick={() => {
                            if (disabled) return
                            onPageChange(pageNumber)
                        }}
                    >
                        {pageNumber}
                    </li>
                )
            })}
            <li
                className={cn(styles.item, {
                    [styles.disabled]: currentPage === lastPage,
                })}
                onClick={() => {
                    if (currentPage === lastPage || disabled) return
                    onNext()
                }}
            >
                <div className={cn(styles.arrow, styles.right)} />
            </li>
        </ul>
    )
})
