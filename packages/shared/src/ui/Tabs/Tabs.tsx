import { memo, ReactNode, useCallback } from 'react'

import cn from '@shared/lib/classNames/classNames'
import { Card } from '../Card/Card'
import { Flex, FlexDirection } from '../Stack/Flex/Flex'

import styles from './Tabs.module.scss'

export interface TabItem {
    value: string
    content: ReactNode
}

interface TabsProps {
    className?: string
    tabs: TabItem[]
    value: string
    onTabClick: (tab: TabItem) => void
    direction?: FlexDirection
}

export const Tabs = memo((props: TabsProps) => {
    const { className, tabs, onTabClick, value, direction = 'row' } = props

    const clickHandle = useCallback(
        (tab: TabItem) => () => {
            onTabClick(tab)
        },
        [onTabClick],
    )

    return (
        <Flex
            direction={direction}
            gap={2}
            align="start"
            className={cn(styles.Tabs, {}, [className])}
        >
            {tabs.map((tab) => {
                const isSelected = tab.value === value
                return (
                    <Card
                        variant={isSelected ? 'light' : 'normal'}
                        className={cn(styles.tab, {
                            [styles.selected]: isSelected,
                        })}
                        key={tab.value}
                        onClick={clickHandle(tab)}
                        border="round"
                    >
                        {tab.content}
                    </Card>
                )
            })}
        </Flex>
    )
})