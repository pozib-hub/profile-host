

import { useState } from 'react'
import { Meta, StoryFn, StoryObj } from '@storybook/react'

import { CenterDecorator } from '@shared/config/storybook/CenterDecorator/CenterDecorator'
import { Tags, TagItem } from './Tags'

const meta: Meta<typeof Tags> = {
    title: 'shared/Tags',
    component: Tags,
    decorators: [CenterDecorator],
}

export default meta

type Story = StoryObj<typeof Tags>;

type Obj = { sec: { type: string } }

export const SingleString: StoryFn = (args) => {
    const [singleString, setSingleString] = useState<string | null>(null)

    return (
        <Tags
            {...args}
            tags={[
                { label: "Bug", value: "bug" },
                { label: "Feature Request", value: "feature-request" },
                { label: "Documentation", value: "documentation" },
                { label: "Improvement", value: "improvement" }
            ]}
            value={singleString}
            onChange={(value) => setSingleString(value.value)}
        />
    )
}

export const SingleNumber: StoryFn = (args) => {
    const [singleNumber, setSingleNumber] = useState<number | null>(null)

    return (
        <Tags
            {...args}
            tags={[
                { label: "1", value: 1 },
                { label: "2", value: 2 },
                { label: "5", value: 5 },
                { label: "6", value: 6 }
            ]}
            value={singleNumber}
            onChange={(value) => setSingleNumber(value.value)}
        />
    )
}

export const SingleObj: StoryFn = (args) => {
    const [singleObj, setSingleObj] = useState<Obj | null>(null)

    return (
        <Tags
            {...args}
            tags={[
                { label: "1", value: { sec: { type: "1" } } },
                { label: "2", value: { sec: { type: "2" } } },
                { label: "5", value: { sec: { type: "5" } } },
                { label: "6", value: { sec: { type: "6" } } }
            ]}
            value={singleObj}
            onChange={(value) => setSingleObj(value.value)}
            fieldCompareValue='sec'
        />
    )
}

export const SingleTagString: StoryFn = (args) => {
    const [singleTagString, setSingleTagString] = useState<TagItem<string> | null>(null)

    return (
        <Tags
            {...args}
            tags={[
                { label: "Bug", value: "bug" },
                { label: "Feature Request", value: "feature-request" },
                { label: "Documentation", value: "documentation" },
                { label: "Improvement", value: "improvement" }
            ]}
            value={singleTagString}
            onChange={(value) => setSingleTagString(value)}
        />
    )
}

export const SingleTagNumber: StoryFn = (args) => {
    const [singleTagNumber, setSingleTagNumber] = useState<TagItem<number> | null>(null)

    return (
        <Tags
            tags={[
                { label: "1", value: 1 },
                { label: "2", value: 2 },
                { label: "5", value: 5 },
                { label: "6", value: 6 }
            ]}
            value={singleTagNumber}
            onChange={(value) => setSingleTagNumber(value)}
        />
    )
}

export const SingleTagObj: StoryFn = (args) => {
    const [singleTagObj, setSingleTagObj] = useState<TagItem<Obj> | null>(null)

    return (
        <Tags
            tags={[
                { label: "1", value: { sec: { type: "1" } } },
                { label: "2", value: { sec: { type: "2" } } },
                { label: "5", value: { sec: { type: "5" } } },
                { label: "6", value: { sec: { type: "6" } } }
            ]}
            value={singleTagObj}
            onChange={(value) => setSingleTagObj(value)}
            fieldCompareValue='sec'
        />
    )
}

// multi ---------------------------------

export const MultiString: StoryFn = (args) => {
    const [multiString, setMultiString] = useState<string[]>([])

    return (
        <Tags
            isMulti
            tags={[
                { label: "Urgent", value: "urgent" },
                { label: "In Progress", value: "in-progress" },
                { label: "Completed", value: "completed" },
                { label: "On Hold", value: "on-hold" }
            ]}
            value={multiString}
            onChange={(v) => setMultiString(v.map(v => v.value))}
        />
    )
}

export const MultiNumber: StoryFn = (args) => {
    const [multiNumber, setMultiNumber] = useState<number[]>([])

    return (
        <Tags
            isMulti
            tags={[
                { label: "1", value: 1 },
                { label: "2", value: 2 },
                { label: "5", value: 5 },
                { label: "6", value: 6 }
            ]}
            value={multiNumber}
            onChange={(v) => setMultiNumber(v.map(v => v.value))}
        />
    )
}

export const MultiObj: StoryFn = (args) => {
    const [multiObj, setMultiObj] = useState<Obj[]>([])

    return (
        <Tags<Obj>
            isMulti
            tags={[
                { label: "1", value: { sec: { type: "1" } } },
                { label: "2", value: { sec: { type: "2" } } },
                { label: "5", value: { sec: { type: "5" } } },
                { label: "6", value: { sec: { type: "6" } } }
            ]}
            value={multiObj}
            onChange={(v) => setMultiObj(v.map(v => v.value))}
            fieldCompareValue="sec"
        />
    )
}

export const MultiTagString: StoryFn = (args) => {
    const [multiTagString, setMultiTagString] = useState<TagItem<string>[]>([])

    return (
        <Tags
            isMulti
            tags={[
                { label: "Bug", value: "bug" },
                { label: "Feature Request", value: "feature-request" },
                { label: "Documentation", value: "documentation" },
                { label: "Improvement", value: "improvement" }
            ]}
            value={multiTagString}
            onChange={(value) => setMultiTagString(value)}
        />
    )
}

export const MultiTagNumber: StoryFn = (args) => {
    const [multiTagNumber, setMultiTagNumber] = useState<TagItem<number>[]>([])

    return (
        <Tags
            isMulti
            tags={[
                { label: "1", value: 1 },
                { label: "2", value: 2 },
                { label: "5", value: 5 },
                { label: "6", value: 6 }
            ]}
            value={multiTagNumber}
            onChange={(value) => setMultiTagNumber(value)}
        />
    )
}

export const MultiTagObj: StoryFn = (args) => {
    const [multiTagObj, setMultiTagObj] = useState<TagItem<Obj>[]>([])

    return (
        <Tags<Obj>
            isMulti
            tags={[
                { label: "1", value: { sec: { type: "1" } } },
                { label: "2", value: { sec: { type: "2" } } },
                { label: "5", value: { sec: { type: "5" } } },
                { label: "6", value: { sec: { type: "6" } } }
            ]}
            value={multiTagObj}
            onChange={(value) => setMultiTagObj(value)}
            fieldCompareValue='sec'
        />
    )
}
