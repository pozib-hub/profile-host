
import path from 'path'
import getHashDigest from './getHashDigest'

interface IOptions {
    context: string;
    hashSalt?: string;
    hashFunction?: string;
    hashDigest?: string;
    hashDigestLength?: number;
    hashStrategy?: string;
    regExp?: string;
    content?: string;
}

export default function interpolateName(
    loaderContext: any,
    name: string,
    options: IOptions,
) {
    const filename = name || '[hash].[ext]'

    const { context } = options
    const { content } = options
    const { regExp } = options

    let ext = 'bin'
    let basename = 'file'
    let directory = ''
    let folder = ''
    let query = ''

    if (loaderContext.resourcePath) {
        const parsed = path.parse(loaderContext.resourcePath)
        let { resourcePath } = loaderContext

        if (parsed.ext) {
            ext = parsed.ext.substr(1)
        }

        if (parsed.dir) {
            basename = parsed.name
            resourcePath = parsed.dir + path.sep
        }

        if (typeof context !== 'undefined') {
            directory = path
                .relative(context, `${resourcePath}_`)
                .replace(/\\/g, '/')
                .replace(/\.\.(\/)?/g, '_$1')
            directory = directory.substr(0, directory.length - 1)
        } else {
            directory = resourcePath.replace(/\\/g, '/').replace(/\.\.(\/)?/g, '_$1')
        }

        if (directory.length <= 1) {
            directory = ''
        } else {
            // directory.length > 1
            folder = path.basename(directory)
        }
    }

    if (loaderContext.resourceQuery && loaderContext.resourceQuery.length > 1) {
        query = loaderContext.resourceQuery

        const hashIdx = query.indexOf('#')

        if (hashIdx >= 0) {
            query = query.substr(0, hashIdx)
        }
    }

    let url = filename

    if (content) {
        // Match hash template
        url = url
            // `hash` and `contenthash` are same in `loader-utils` context
            // let's keep `hash` for backward compatibility
            .replace(
                /\[(?:([^[:\]]+):)?(?:hash|contenthash)(?::([a-z]+\d*(?:safe)?))?(?::(\d+))?\]/gi,
                (all, hashType, digestType, maxLength) =>
                    getHashDigest(content, hashType, digestType, parseInt(maxLength, 10)),
            )
    }

    url = url
        .replace(/\[ext\]/gi, () => ext)
        .replace(/\[name\]/gi, () => basename)
        .replace(/\[path\]/gi, () => directory)
        .replace(/\[folder\]/gi, () => folder)
        .replace(/\[query\]/gi, () => query)

    if (regExp && loaderContext.resourcePath) {
        const match = loaderContext.resourcePath.match(new RegExp(regExp))

        if (match) {
            match.forEach((matched: any, i: any) => {
                url = url.replace(new RegExp(`\\[${i}\\]`, 'ig'), matched)
            })
        }
    }

    if (
        typeof loaderContext.options === 'object'
        && typeof loaderContext.options.customInterpolateName === 'function'
    ) {
        url = loaderContext.options.customInterpolateName.call(
            loaderContext,
            url,
            name,
            options,
        )
    }

    return url
}
