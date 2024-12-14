import path from 'path'
import webpack from 'webpack'
import {
    BuildMode,
    BuildPaths,
    BuildOptions,
    BuildPlatform,
    buildWebpackConfig,
} from '@packages/bulild-config/src/build'

import packageJson from './package.json'

interface EnvVariables {
    mode?: BuildMode
    analyzer?: boolean
    port?: number
    platform?: BuildPlatform
    PROFILE_REMOTE_URL?: string
    CATALOG_REMOTE_URL?: string
}

export default (env: EnvVariables) => {
    console.log('kek')

    const paths: BuildPaths = {
        build: path.resolve(__dirname, 'build'),
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        // public: path.resolve(__dirname, 'public'),
        src: path.resolve(__dirname, 'src'),
        // TODO
        locales: path.resolve(__dirname, 'src', 'locales'),
        buildLocales: path.resolve(__dirname, 'build', 'locales'),
    }
    const PROFILE_REMOTE_URL = env.PROFILE_REMOTE_URL ?? 'http://localhost:3001'
    const CATALOG_REMOTE_URL = env.CATALOG_REMOTE_URL ?? 'http://localhost:3002'

    console.log('kek')

    let config: webpack.Configuration = buildWebpackConfig({
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
        paths,
        analyzer: env.analyzer,
        platform: env.platform ?? 'desktop',
        isDev: env.mode === 'development',
    })

    const moduleFederationPlugin = new webpack.container.ModuleFederationPlugin({
        name: 'host',
        filename: 'remoteEntry.js',

        remotes: {
            profile: `shop@${PROFILE_REMOTE_URL}/remoteEntry.js`,
            catalog: `admin@${CATALOG_REMOTE_URL}/remoteEntry.js`,
        },
        shared: {
            ...packageJson.dependencies,
            react: {
                eager: true,
                // requiredVersion: packageJson.dependencies['react'],
            },
            'react-router-dom': {
                eager: true,
                // requiredVersion: packageJson.dependencies['react-router-dom'],
            },
            'react-dom': {
                eager: true,
                // requiredVersion: packageJson.dependencies['react-dom'],
            },
        },
    })

    const plugins = [...(config.plugins as webpack.WebpackPluginInstance[]), moduleFederationPlugin]

    config = {
        ...config,
        plugins: plugins,
    }

    return config
}
