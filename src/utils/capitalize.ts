import isBlank from './isBlank';

export default function capitalize(strOrBlank: string | null | undefined) {
    if(isBlank(strOrBlank)) {
        return strOrBlank;
    }

    const str = strOrBlank as string;
    return `${str.slice(0,1).toUpperCase()}${str.slice(1)}`;
}
