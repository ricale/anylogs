type Hash = Record<string ,unknown>
type ConvertAllKeysOptions = {
    searcher: RegExp | string
    replacer: (substring: string, ...args: any[]) => string
}

function isHash(src: unknown): src is Hash {
    return !!src && typeof src === typeof {};
}

function convertAllHashKeys (
    hash: Hash,
    options: ConvertAllKeysOptions
) {
    return Object.keys(hash).reduce((result: typeof hash, k: string) => {
        const newKey = k.replace(options.searcher, options.replacer);
        result[newKey] = convertAllKeys(hash[k], options);
        return result;
    }, {});
}

export default function convertAllKeys<T>(
    value: T,
    options: ConvertAllKeysOptions = {
        searcher: /_([a-z])/g,
        replacer: (_, ...args) => args[0].toUpperCase(),
    }
): T {
    if(Array.isArray(value)) {
        return value.map(v => convertAllKeys(v, options)) as any as T;

    } else if(isHash(value)) {
        return convertAllHashKeys(value, options) as T;

    } else {
        return value;
    }
}
