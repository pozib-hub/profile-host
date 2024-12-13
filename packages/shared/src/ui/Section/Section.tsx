import React, { FC, useEffect, useState, useRef } from 'react'

import useResizeObserver from '@shared/lib/hooks/useResizeObserver'
import cn from '@shared/lib/classNames/classNames'

import styles from './Section.module.scss'

interface IProps {
    classNames?: {
        wrapper?: string
        title?: string
        contentWrapper?: string
        content?: string
    }
    openByClickTitle?: boolean
    title?: string
    icon?: React.ReactNode
    children: React.ReactElement
    defaultOpen?: boolean
    delayAnimation?: string
}

export const Section: FC<IProps> = (props) => {
    const {
        classNames,
        title,
        icon,
        defaultOpen = true,
        delayAnimation = '0.3s',
        openByClickTitle,
        children,
    } = props

    const refWrapperContent = useRef<HTMLDivElement>(null)
    const [refContent, sizeContent] = useResizeObserver<HTMLDivElement>()
    const [open, setOpen] = useState(defaultOpen)

    useEffect(() => {
        const wrapper = refWrapperContent.current
        const content = refContent.current

        if (defaultOpen && wrapper && content) {
            wrapper.style.maxHeight = `${content.scrollHeight}px`
        }
    }, [defaultOpen, refContent])

    useEffect(() => {
        const wrapper = refWrapperContent.current
        const content = refContent.current

        if (!wrapper || !content) return

        if (open) {
            wrapper.style.maxHeight = `${content.scrollHeight}px`
        } else {
            wrapper.style.maxHeight = '0'
        }
    }, [open, refContent, sizeContent])

    const onToggleOpen = () => {
        setOpen((prev) => !prev)
    }

    const onClickTitle = () => {
        if (openByClickTitle) {
            onToggleOpen()
        }
    }

    const transitionAnimation = open
        ? `max-height ${delayAnimation} ease`
        : `max-height ${delayAnimation} ease-out`

    return (
        <div className={cn(styles.wrapper, classNames?.wrapper)}>
            <div className={styles.header}>
                <div
                    className={cn(styles.title, classNames?.title, {
                        [styles.clickTitle]: openByClickTitle,
                    })}
                    onClick={onClickTitle}
                >
                    {icon}
                    {title}
                </div>
                <div
                    className={cn(styles.chevronIcon, {
                        [styles.open]: open,
                    })}
                    onClick={onToggleOpen}
                />
            </div>
            <div
                ref={refWrapperContent}
                className={cn(styles.content, classNames?.content)}
                style={{
                    transition: transitionAnimation,
                }}
            >
                <div
                    // нам нужно отслеживать resize именно у дочернего компонента
                    ref={refContent}
                    className={cn(classNames?.contentWrapper)}
                    style={{
                        // нужно для предотвращения схлопывания родительских и дочерних отступов
                        // для правильного расчета высоты родителя, если у дочерного есть вертикальные отступы
                        overflow: 'hidden',
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    )
}
