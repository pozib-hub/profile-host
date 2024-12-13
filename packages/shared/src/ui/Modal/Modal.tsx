import React, { FC, useCallback, useEffect, useRef, useState } from 'react'

import cn from '@shared/lib/classNames/classNames'
import { Portal } from '../Portal/Portal'

import Dialog from 'rc-dialog'
import { Icon } from '../Icon/Icon'
// import 'rc-dialog/assets/index.css'
import styles from './Modal.module.scss'
import './kek.scss'
import CSSMotion from './CSSMotion'

export type ContentRef = {
    focus: () => void
    changeActive: (next: boolean) => void
}

const DEFAULT_ANIMATION_DELAY = 300

type MousePosition = {
    x: number
    y: number
} | null

let mousePosition: MousePosition = null

const getClickPosition = (e: MouseEvent) => {
    mousePosition = {
        x: e.pageX,
        y: e.pageY,
    }
    setTimeout(() => {
        mousePosition = null
    }, 100)
}

document.documentElement.addEventListener('click', getClickPosition, true)

function getScroll(w: Window, top?: boolean): number {
    let ret = w[`page${top ? 'Y' : 'X'}Offset`]
    const method = `scroll${top ? 'Top' : 'Left'}` as 'scrollTop' | 'scrollLeft'
    if (typeof ret !== 'number') {
        const d = w.document
        ret = d.documentElement[method]
        if (typeof ret !== 'number') {
            ret = d.body[method]
        }
    }
    return ret
}

type CompatibleDocument = {
    parentWindow?: Window
} & Document

function offset(el: Element) {
    const rect = el.getBoundingClientRect()
    const pos = {
        left: rect.left,
        top: rect.top,
    }
    const doc = el.ownerDocument as CompatibleDocument
    const w = (doc.defaultView as Window) || doc.parentWindow
    if (w) {
        pos.left += getScroll(w)
        pos.top += getScroll(w, true)
    }
    return pos
}
interface IModalProps {
    classNames?: {
        header?: string
        body?: string
        footer?: string
        overlay?: string
        content?: string
        wrapper?: string
    }
    width?: string | number
    height?: string | number
    variant?: 'default' | 'medium' | 'full'
    orientation?: 'center' | 'right'
    animationDelay?: number
    isMobile?: boolean
    isOpen: boolean
    onClose?: () => void
    onChangeClose?: (open: boolean) => void
    children?: React.ReactNode
    lazy?: boolean
}

enum KeyCode {
    TAB = 'Tab',
    ESCAPE = 'Escape',
    ENTER = 'Enter',
    SPACE = ' ',
}

export const Modal: FC<IModalProps> = (props) => {
    const {
        classNames: classNamesProps = {},
        children,
        animationDelay,
        isMobile,
        isOpen,
        onClose,
        onChangeClose,
        orientation = 'center',
        width,
        height,
    } = props

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>()
    const dialogRef = useRef<HTMLDivElement | null>(null)

    const [isClosing, setIsClosing] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    const [transformOrigin, setTransformOrigin] = React.useState<string>()

    const onPrepare = () => {
        if (!dialogRef.current) return

        const elementOffset = offset(dialogRef.current)

        // setTransformOrigin(mousePosition ? `${mousePosition.x}px ${mousePosition.y}px` : "")
        setTransformOrigin(
            mousePosition
                ? // eslint-disable-next-line max-len
                  `${mousePosition.x - elementOffset.left}px ${mousePosition.y - elementOffset.top}px`
                : '',
        )
    }

    const handlerClose = useCallback(() => {
        if (onClose) {
            setIsClosing(true)
            timerRef.current = setTimeout(() => {
                onClose()
                setIsClosing(false)
            }, animationDelay || DEFAULT_ANIMATION_DELAY)
        }
    }, [animationDelay, onClose])

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === KeyCode.ESCAPE) {
                handlerClose()
            }
        },
        [handlerClose],
    )

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown)

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
            }
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [onKeyDown])

    useEffect(() => {
        setIsMounted(isOpen)
    }, [isOpen])

    const panelRef = React.useRef<HTMLDivElement | undefined>(undefined)
    const contentRef = React.useRef<ContentRef>()

    const sentinelStartRef = useRef<HTMLDivElement>(null)
    const sentinelEndRef = useRef<HTMLDivElement>(null)

    const contentStyle: React.CSSProperties = {
        width: 500,
    }

    if (width !== undefined) {
        contentStyle.width = width
    }
    if (height !== undefined) {
        contentStyle.height = height
    }

    function onInternalClose(e: React.SyntheticEvent) {
        onClose?.()
    }

    function onWrapperKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key === 'Escape') {
            e.stopPropagation()
            onInternalClose(e)
            return
        }

        // keep focus inside dialog
        if (isOpen && e.key === KeyCode.TAB) {
            contentRef.current?.changeActive(!e.shiftKey)
        }
    }

    if (transformOrigin) {
        contentStyle.transformOrigin = transformOrigin
    }

    const classes = [
        {
            [styles.opened]: isOpen,
            [styles.closing]: isClosing,
            [styles.mobile]: isMobile,
            [styles.mounted]: isMounted,
        },
        styles[orientation],
        styles.wrapper,
        classNamesProps.wrapper,
    ]

    const Mask = () => (
        <>
            <CSSMotion
                visible={isOpen}
                motionName={'rc-dialog-fade'}
                leavedClassName={`rc-dialog-mask-hidden`}
            >
                {({ className: motionClassName, style: motionStyle }, ref) => (
                    <div
                        ref={ref}
                        style={{ ...motionStyle }}
                        className={cn(`rc-dialog-mask`, motionClassName)}
                    />
                )}
            </CSSMotion>
        </>
    )

    if (!isOpen) {
        return null
    }

    const entityStyle = { outline: 'none' }
    const sentinelStyle = { width: 0, height: 0, overflow: 'hidden', outline: 'none' }

    return (
        <Portal>
            <div className={cn(classes)}>
                <div
                    role="presentation"
                    className={cn(styles.overlay, classNamesProps.overlay)}
                    onClick={handlerClose}
                >
                    <div
                        role="presentation"
                        className={cn(styles.body, classNamesProps.body)}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    )

    return (
        <Portal>
            <div className={cn(`rc-dialog-root`)}>
                <Mask />
                <div
                    tabIndex={-1}
                    // onKeyDown={onWrapperKeyDown}
                    // className={classNames(`${prefixCls}-wrap`, wrapClassName, modalClassNames?.wrapper)}
                    className={cn(`rc-dialog-wrap`)}
                    // ref={wrapperRef}
                    // onClick={onWrapperClick}
                    // style={mergedStyle}
                    onClick={onClose}
                >
                    <CSSMotion
                        visible={isOpen}
                        onVisibleChanged={onChangeClose}
                        onAppearPrepare={onPrepare}
                        onEnterPrepare={onPrepare}
                        motionName={'rc-dialog-zoom'}
                        forceRender={false}
                        removeOnLeave={false}
                        ref={dialogRef}
                    >
                        {({ className: motionClassName, style: motionStyle }, motionRef) => (
                            <div
                                key="dialog-element"
                                role="dialog"
                                aria-modal="true"
                                ref={motionRef}
                                style={{ ...motionStyle, ...contentStyle }}
                                className={cn('ant-modal', motionClassName)}
                                // onMouseDown={onMouseDown}
                                // onMouseUp={onMouseUp}
                            >
                                <div ref={sentinelStartRef} tabIndex={0} style={entityStyle}>
                                    {/* <MemoChildren shouldUpdate={visible || forceRender}>
                                    {modalRender ? modalRender(content) : content}
                                </MemoChildren> */}
                                    <div
                                        className={cn(`rc-dialog-content`)}
                                        // style={modalStyles?.content}
                                    >
                                        {/* {closerNode} */}
                                        {/* {headerNode} */}
                                        <div
                                            className={cn(`rc-dialog-body`)}
                                            // style={{ ...bodyStyle, ...modalStyles?.body }}
                                            // {...bodyProps}
                                        >
                                            {children}
                                        </div>
                                        {/* {footerNode} */}
                                    </div>
                                </div>
                                <div tabIndex={0} ref={sentinelEndRef} style={sentinelStyle} />
                            </div>
                        )}
                    </CSSMotion>
                </div>
            </div>
        </Portal>
    )

    // return (
    //     <Portal>
    //         <div
    //             className={cn(classes)}
    //         >
    //             <div
    //                 tabIndex={-1}
    //                 // role="presentation"
    //                 className={cn(
    //                     styles.mask,
    //                     // { [styles.mounted]: isMounted },
    //                     // classNamesProps.overlay
    //                 )}
    //             // onClick={handlerClose}
    //             >
    //             </div>
    //             <div className={"ant-wrap"}>

    //                 <Dialog
    //                     // width={500}
    //                     // {...restProps}
    //                     // zIndex={1000}
    //                     // getContainer={getContainer === undefined ? getContextPopupContainer : getContainer}
    //                     visible={isOpen}
    //                     mousePosition={mousePosition}
    //                     onClose={handlerClose}
    //                     closable={true}
    //                     // closeIcon={<Icon id='About' />}
    //                     transitionName="zoom"
    //                     maskTransitionName={"fade"}
    //                 // focusTriggerAfterClose={false}
    //                 // className={classNames(hashId, className, modalContext?.className)}
    //                 // style={{ ...style }}
    //                 // classNames={{
    //                 //     ...modalContext?.classNames,
    //                 //     ...modalClassNames,
    //                 //     wrapper: classNames(wrapClassNameExtended, modalClassNames?.wrapper),
    //                 // }}
    //                 // styles={{ ...modalContext?.styles, ...modalStyles }}
    //                 // panelRef={panelRef as any}
    //                 >
    //                     {children}
    //                 </Dialog>
    //             </div>
    //         </div>
    //     </Portal>
    // )
}
