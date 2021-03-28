import fillWithZero from './fillWithZero';

type ToDateStringOptions = {
    fullYear?: boolean
    hasTime?: boolean
}

const defaultOptions: ToDateStringOptions = {
    fullYear: true,
    hasTime: true,
};

export default function toDateString(
    date: Date | string | number,
    options?: ToDateStringOptions,
) {
    const o = { ...(options || {}) };
    Object.keys(defaultOptions).forEach(key => {
        const optionName = key as keyof ToDateStringOptions;
        if(o[optionName] === undefined) {
            o[optionName] = defaultOptions[optionName];
        }
    });

    const d = (
        typeof date === 'string' ? new Date(date) :
        typeof date === 'number' ? new Date(date) :
                                   date
    );
    const year = o.fullYear ? d.getFullYear() : d.getFullYear() % 100;
    const month = fillWithZero(d.getMonth() + 1);
    const day = fillWithZero(d.getDate());

    if(!o.hasTime) {
        return `${year}-${month}-${day}`;
    }

    const hours = fillWithZero(d.getHours());
    const minutes = fillWithZero(d.getMinutes());

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}
