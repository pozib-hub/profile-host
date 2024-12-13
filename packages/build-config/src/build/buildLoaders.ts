import webpack from 'webpack'

import { BuildOptions } from './types/config'
import { buildCssLoaders } from './loaders/buildCssLoaders'
import { buildBabelLoader } from './loaders/buildBabelLoader'

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const baseBabelLoader = buildBabelLoader({ ...options, isTSX: false })
    const tsxBabelLoader = buildBabelLoader({ ...options, isTSX: true })

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff)$/i,
        use: ['file-loader'],
        exclude: /node_modules/,
    }

    const svgLoader = {
        test: /\.svg$/,
        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    icon: true,
                    svgConfig: {
                        plugins: [
                            {
                                name: 'convertColors',
                                params: {
                                    currentColor: true,
                                },
                            },
                        ],
                    },
                },
            },
        ],
        exclude: /node_modules/,
    }

    const cssLoaders = buildCssLoaders(options.isDev)

    // Если не используем тайпскрипт - нужен babel-loader
    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }

    return [fileLoader, svgLoader, baseBabelLoader, tsxBabelLoader, typescriptLoader, ...cssLoaders]
}
