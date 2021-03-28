export default function convertUnderscoreToCamelCase(str: string) {
    return str
        .replace(/^([A-Z]+)/, (_, p1) => p1.toLowerCase())
        .replace(/(_[A-Z]+)/g, (_, p1) => `${p1.slice(1, 2)}${p1.slice(2).toLowerCase()}`);
}
  