import { memo, useState } from 'react'

import cn from '@shared/lib/classNames/classNames'

import { Icon } from '../../Icon/Icon'

import styles from './StarRating.module.scss'

interface StarRatingProps {
    className?: string
    onSelect?: (starsCount: number) => void
    size?: number
    selectedStars?: number
}

const stars = [1, 2, 3, 4, 5]

export const StarRating = memo((props: StarRatingProps) => {
    const { className, size = 25, selectedStars = 0, onSelect } = props
    const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars)
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars))

    const onHover = (starsCount: number) => () => {
        if (!isSelected) {
            setCurrentStarsCount(starsCount)
        }
    }

    const onLeave = () => {
        if (!isSelected) {
            setCurrentStarsCount(0)
        }
    }

    const onClick = (starsCount: number) => () => {
        if (!isSelected) {
            onSelect?.(starsCount)
            setCurrentStarsCount(starsCount)
            setIsSelected(true)
        }
    }

    return (
        <div className={cn(styles.wrapper, className)}>
            {stars.map((starNumber) => (
                <Icon
                    data-testid={`StarRating.${starNumber}`}
                    data-selected={currentStarsCount >= starNumber}
                    clickable={!isSelected}
                    key={starNumber}
                    className={cn(styles.starIcon, {
                        [styles.selected]: isSelected,
                        [styles.hovered]: currentStarsCount >= starNumber,
                    })}
                    id="StarRating"
                    size={size}
                    onMouseLeave={onLeave}
                    onMouseEnter={onHover(starNumber)}
                    onClick={onClick(starNumber)}
                />
            ))}
        </div>
    )
})
