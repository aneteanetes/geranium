export function promised<T>(value: T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        try {
            resolve(value);
        } catch (error) {
            reject(error);
        }
    })
}