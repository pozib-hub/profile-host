import { InputHTMLAttributes, ReactNode } from 'react'

export type Variants = 'filled' | 'outline' | 'default'
export type Sizes = 's' | 'm' | 'l'

export interface IInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    variant?: Variants
    classNameWrapper?: string
    label?: string
    iconLeft?: React.ReactNode
    iconRight?: React.ReactNode
    errorMessage?: boolean | string
    isError?: boolean
    autoFocus?: boolean
    readonly?: boolean
    disabled?: boolean
    placeholder?: string
    size?: Sizes
    children?: ReactNode
}
