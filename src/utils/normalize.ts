type Creator<T> = {
    create(): T
}
const normalizeObject = <T extends NonNullable<unknown>, TCreator extends Creator<T>>(
    creatorOrDefault: TCreator | T,
    obj: Partial<T>,
    cb?: (key: keyof T) => void,
): T => {
    const empty = (creatorOrDefault as TCreator).create?.() ?? creatorOrDefault;
    const callback = cb ?? ((key: keyof T) => empty[key] = obj[key] as T[keyof T]);

    Object.keys(empty).forEach((key) => {
        if (key in obj) {
            // @TODO check types
            callback(key as keyof T);
        }
    });
    return empty;
};

export default normalizeObject;
