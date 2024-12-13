import path from "path"
import webpack, { RuleSetRule } from "webpack"

import { BuildPaths } from '../build/types/config'
import { buildAliases } from '../build/alias/buildAliases'
import { buildCssLoaders } from '../build/loaders/buildCssLoaders'


export default ({ config }: { config: webpack.Configuration }) => {

    const paths: BuildPaths = {
        build: "",
        html: "",
        entry: "",
        src: path.resolve(__dirname, "..", "..", "src"),
        locales: "",
        buildLocales: "",
    }

    const rules: RuleSetRule[] = [
        // тут мы разворачиваем существующие И исключаем правила для svg
        ...(config.module?.rules || []).map((rule) => {
            if (rule && typeof rule === "object"
                && rule.test instanceof RegExp
                && rule.test.test('.svg')
            ) {
                return { ...rule, exclude: /\.svg$/i }
            }
            return rule as RuleSetRule
        }),
        {
            test: /\.svg$/,
            use: "@svgr/webpack"
        },
        ...buildCssLoaders(true) as RuleSetRule[],
    ].filter(Boolean)

    const resolve: webpack.Configuration["resolve"] = {
        modules: [...(config.resolve?.modules || []), paths.src],
        extensions: [...(config.resolve?.extensions || []), '.tsx', '.ts', '.js'],
        alias: {
            ...config.resolve?.alias,
            ...buildAliases(paths.src)
        }
    }

    const plugins = [
        new webpack.DefinePlugin({
            __IS_DEV__: true,
            __PROJECT__: JSON.stringify("storybook")
        }),
    ]

    const modifyConfig: webpack.Configuration = {
        ...config,
        resolve: {
            ...config.resolve,
            ...resolve
        },
        module: {
            ...config.module,
            rules: rules
        },
        plugins: [
            ...(config.plugins?.filter(Boolean) || []),
            ...plugins
        ],
    }

    return modifyConfig
}