import webpack from 'webpack'
import Dotenv from 'dotenv-webpack'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import CopyPlugin from "copy-webpack-plugin"
import CircularDependencyPlugin from "circular-dependency-plugin"
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"

import { BuildOptions } from './types/config'

export function buildPlugins({
    paths,
    isDev,
}: BuildOptions): webpack.WebpackPluginInstance[] {
    const isProd = !isDev

    const plugins = [
        new HTMLWebpackPlugin({
            template: paths.html,
        }),
        new webpack.ProgressPlugin(),
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __PROJECT__: JSON.stringify("frontend"),
        }),
        new Dotenv({
            safe: true,
            systemvars: true,
        }),
        new webpack.ProvidePlugin({}),
        new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp
            exclude: /node_modules/,
            // include specific files based on a RegExp
            // include: /dir/,
            // add errors to webpack instead of warnings
            failOnError: true,
            // allow import cycles that include an asyncronous import,
            // e.g. via import(/* webpackMode: "weak" */ './file.js')
            // allowAsyncCycles: false,
            // // set the current working directory for displaying module paths
            // cwd: process.cwd(),
        }),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
                mode: "write-references"
            },
        })
    ]

    if (isProd) {
        const prod_plugins = [
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
            }),
            new CopyPlugin({
                patterns: [
                    { from: paths.locales, to: paths.buildLocales },
                ],
            }),
        ]

        plugins.push(...prod_plugins)
    }

    if (isDev) {
        const dev_plugins = [
            new ReactRefreshWebpackPlugin(),
            new BundleAnalyzerPlugin({
                openAnalyzer: false,
            }),
        ]

        plugins.push(...dev_plugins)
    }

    return plugins
}
