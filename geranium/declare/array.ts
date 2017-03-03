interface Array<T> {
    remove: (item: T) => Array<T>;
}
if (!Array.prototype.remove) {
    Array.prototype.remove = function <T>(elem: T): T[] {
        return this.filter(e => e !== elem);
    }
}