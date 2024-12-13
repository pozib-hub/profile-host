import React from 'react'
import { createPortal } from 'react-dom'

interface IPortalProps {
    children: React.ReactNode
    element?: HTMLElement
}

export const Portal: React.FC<IPortalProps> = (props) => {
    const { children, element = document.body } = props

    return createPortal(children, element)
}
