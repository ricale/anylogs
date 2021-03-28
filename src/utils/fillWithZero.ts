export default function fillWithZero(n: number, digit = 2) {
    const length = `${n}`.length;
    if(length > digit) {
        return `${n}`;
    }
    return `${'0'.repeat(digit - length)}${n}`;
}
