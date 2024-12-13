import { ResolveOptions } from 'webpack'

import { BuildOptions } from './types/config'
import { buildAliases } from './alias/buildAliases'

export function buildResolvers(options: BuildOptions): ResolveOptions {
    const pathSRC = options.paths.src

    return {
        extensions: ['.tsx', '.ts', '.js'],
        preferAbsolute: true,
        modules: [pathSRC, 'node_modules'],
        mainFiles: ['index'],
        alias: buildAliases(pathSRC),
    }
}
