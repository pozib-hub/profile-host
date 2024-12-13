import { memo, useState, FC } from 'react'

import { Carousel as ReactCarousel, CarouselProps } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import cn from '@shared/lib/classNames/classNames'
import { Skeleton } from '../Skeleton'

import styles from './Carousel.module.scss'

interface ICarouselProps extends Partial<CarouselProps> {
    dynamicDots?: boolean
    isLoading?: boolean
    isDesktop?: boolean
    skeleton?: {
        borderRadius?: string
        width?: string | number
        height?: string | number
    }
}

const gapDots = 32
const widthDot = 8

export const Carousel: FC<ICarouselProps> = memo(function Slider(props) {
    const [selectedItemIndex, setSelectedItemIndex] = useState(props.selectedItem || 0)

    const lengthChildren = props.children?.length || 0
    const indexLastChildren = lengthChildren ? lengthChildren - 1 : 0

    let renderItems: number[] = []

    if (selectedItemIndex === 0) {
        renderItems = [0, 1, 2]
    } else if (selectedItemIndex === indexLastChildren) {
        renderItems = [indexLastChildren - 2, indexLastChildren - 1, indexLastChildren]
    } else {
        renderItems = [selectedItemIndex - 1, selectedItemIndex, selectedItemIndex + 1]
    }

    const showIndicators =
        props.showIndicators !== undefined && !props.isLoading
            ? props.showIndicators
            : props.isDesktop

    const showArrows = props.showArrows !== undefined ? props.showArrows : props.isDesktop

    const widthDots = (widthDot + gapDots) * lengthChildren - gapDots

    return (
        <ReactCarousel
            selectedItem={selectedItemIndex}
            showIndicators={showIndicators}
            showArrows={showArrows}
            onChange={(index) => setSelectedItemIndex(index)}
            renderIndicator={(
                onClickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void,
                isSelected: boolean,
                index: number,
                label: string,
            ) => {
                if (props.dynamicDots && !renderItems.includes(index)) {
                    return null
                }

                if (props.dynamicDots && props.isLoading) {
                    return <Skeleton height="8px" width="88px" />
                }

                return (
                    <li
                        className={cn(styles.dot, {
                            [styles.selected]: isSelected,
                        })}
                        onClick={onClickHandler}
                        onKeyDown={onClickHandler}
                        value={index}
                        key={index}
                        role="button"
                        tabIndex={0}
                        aria-label={`${label} ${index + 1}`}
                        style={{
                            marginRight: indexLastChildren === index ? 0 : gapDots,
                        }}
                    />
                )
            }}
            renderArrowPrev={
                props.dynamicDots
                    ? (onClickHandler: () => void, hasPrev: boolean, label: string) => (
                          <button
                              className={cn(styles.arrow_prev, { [styles.none]: !hasPrev })}
                              type="button"
                              aria-label={label}
                              onClick={onClickHandler}
                              style={{
                                  left: `calc(50% - ${widthDots}px)`,
                              }}
                          >
                              {/* <IconProvider iconId="ChevronLeftIcon" /> */}
                              {'<'}
                          </button>
                      )
                    : undefined
            }
            renderArrowNext={
                props.dynamicDots
                    ? (onClickHandler: () => void, hasNext: boolean, label: string) => (
                          <button
                              className={cn(styles.arrow_next, { [styles.none]: !hasNext })}
                              type="button"
                              aria-label={label}
                              onClick={onClickHandler}
                              style={{
                                  left: `calc(50% + ${widthDots}px)`,
                              }}
                          >
                              {/* <Icon iconId="ChevronRightIcon" /> */}
                              {'>'}
                          </button>
                      )
                    : undefined
            }
            {...props}
            className={cn(
                styles.carousel,
                { [styles.dynamicDots]: props.dynamicDots && (showIndicators || showArrows) },
                { [styles.loading]: props.isLoading },
                props.className,
            )}
        >
            {props.isLoading
                ? [
                      <Skeleton
                          key={'Skeleton'}
                          height={props.skeleton?.height || '100%'}
                          border={props.skeleton?.borderRadius}
                          width={props.skeleton?.width}
                      />,
                  ]
                : props.children}
        </ReactCarousel>
    )
})
