import { GroupBase } from 'react-select'
import { AsyncPaginateProps } from 'react-select-async-paginate'

export type Variants = 'filled' | 'outline' | 'default'

export interface AsyncSelectProps<
    OptionType,
    Group extends GroupBase<OptionType>,
    Additional,
    IsMulti extends boolean = false,
> extends AsyncPaginateProps<OptionType, Group, Additional, IsMulti> {
    label?: string
    isError?: boolean
    errorMessage?: boolean | string
    variant?: Variants
    width?: string | number
}

export type TAdditional = {
    page: string
}
