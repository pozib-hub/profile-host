import type { Preview } from '@storybook/react'

import { StyleDecorator } from '@shared/config/storybook/StyleDecorator/StyleDecorator'
import { ThemeDecorator, themesList } from '@shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { RouterDecorator } from '@shared/config/storybook/RouterDecorator/RouterDecorator'
import { LanguageDecorator } from '@shared/config/storybook/LanguageDecorator/LanguageDecorator'

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },

        layout: 'fullscreen',
        backgrounds: {
            values: themesList,
            default: themesList.find((i) => i.name === 'dark')?.name,
        },
    },
}

export const globalTypes = {
    local: {
        name: 'Language',
        description: 'Select the language of the app',
        defaultValue: 'ru',
        toolbar: {
            icon: 'globe',
            dynamicTitle: true,
            items: ['en', 'ru'],
        },
    },
}

export default {
    ...preview,
    decorators: [LanguageDecorator, RouterDecorator, ThemeDecorator, StyleDecorator],
}
