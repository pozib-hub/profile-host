import path from 'path'
import webpack from 'webpack'

export function buildAliases(basePath: string): Record<string, string> {
    // TODO
    return {
        "@app": path.join(basePath, "app"),
        "@entities": path.join(basePath, 'entities'),
        "@features": path.join(basePath, 'features'),
        "@pages": path.join(basePath, 'pages'),
        "@shared": path.join(basePath, 'shared'),
        "@widgets": path.join(basePath, 'widgets'),
        "@utils": path.join(basePath, 'utils'),
    }
}
