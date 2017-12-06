interface Array<T> {
    remove(item: T): Array<T>;
    removeSame(): Array<T>;
    groupBy(key: string): Array<Array<T>>;
}
if (!Array.prototype.remove) {
    Array.prototype.remove = function <T>(item: T): T[] {
        return this.filter(e => e !== item);
    }
}
if (!Array.prototype.removeSame) {
    Array.prototype.removeSame = function <T>(): T[] {
        return this.filter(function (elem, index, self) {
            return index == self.indexOf(elem);
        })
    }
}
if (!Array.prototype.groupBy) {
    Array.prototype.groupBy = function<T>(key: string): Array<Array<T>>{
        var arr = this as Array<T>;
        var groups = [];

        var targetKeys = arr.map(x => x[key]);

        var unique = targetKeys.filter((value, index, array) => array.indexOf(value) === index);

        unique.forEach(z => {
            groups.push(arr.filter(x => x[key] == z));
        });

        return groups;
    }
}