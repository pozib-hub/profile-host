import React, { useState, useRef, useEffect } from 'react'
import cn from 'classnames'

import styles from './FlipCard.module.scss'

interface IProps {
    disabled?: boolean
    actionFlip?: 'click' | 'hover'
    typeFlip?: 'vertical' | 'horizontal'
    frontContent: React.ReactNode
    backContent: React.ReactNode
    classNameWrapper?: string
    classNameContainer?: string
    classNameContent?: string
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
    onHover?: (event: React.MouseEvent<HTMLDivElement>) => void
    onHoverEnd?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export const FlipCard = (props: IProps) => {
    const {
        disabled,
        classNameWrapper,
        classNameContainer,
        classNameContent,
        frontContent,
        backContent,
        actionFlip = 'click',
        typeFlip = 'horizontal',
        onClick,
        onHover,
        onHoverEnd,
    } = props

    const [isFlipped, setIsFlipped] = useState<boolean>(false)
    const [initHeight, setInitialHeight] = useState<number>(0)
    const refContainerBox = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (refContainerBox.current) {
            setInitialHeight(refContainerBox.current.clientHeight)
        }
    }, [])

    const onClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        if (disabled || actionFlip !== 'click') return
        changeFlip()
        onClick?.(event)
    }

    const onHoverHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        if (disabled || actionFlip !== 'hover') return
        changeFlip()
        onHover?.(event)
    }

    const onHoverEndHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        if (disabled || actionFlip !== 'hover') return
        changeFlip()
        onHoverEnd?.(event)
    }

    const resizeCardByBackContent = () => {
        // бывает такое, что передняя и задняя сторона карточки отличаются высотой контента
        // и если задняя сторона больше переденей, нужно пересчитать высоту всей карточки

        if (!refContainerBox.current) return

        if (!isFlipped) {
            const heightBackContent = refContainerBox.current.children[1]
            refContainerBox.current.style.height = heightBackContent.scrollHeight + 'px'
            return
        }

        refContainerBox.current.style.height = initHeight + 'px'
    }

    const changeFlip = () => {
        resizeCardByBackContent()
        setIsFlipped((prev) => !prev)
    }

    return (
        <div
            className={cn(styles.wrapper, styles[typeFlip], classNameWrapper, {
                [styles.flipped]: isFlipped,
                [styles.disabled]: disabled,
            })}
            onClick={onClickHandler}
            onMouseEnter={onHoverHandler}
            onMouseLeave={onHoverEndHandler}
        >
            <div ref={refContainerBox} className={cn(styles.container, classNameContainer)}>
                <div className={cn(styles.front, classNameContent)}>{frontContent}</div>
                <div className={cn(styles.back, classNameContent)}>{backContent}</div>
            </div>
        </div>
    )
}
