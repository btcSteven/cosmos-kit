export function sum(iterable, callbackfn) {
    return Array.from(iterable).reduce(callbackfn);
}
