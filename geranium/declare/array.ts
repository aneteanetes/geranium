interface Array<T> {
	remove: (item: T) => Array<T>;
	removeSame: () => Array<T>;
}
if (!Array.prototype.remove) {
    Array.prototype.remove = function <T>(elem: T): T[] {
        return this.filter(e => e !== elem);
    }
}
if (!Array.prototype.removeSame) {
	Array.prototype.removeSame = function <T>(): T[] {
		return this.filter(function (elem, index, self) {
			return index == self.indexOf(elem);
		})
	}
}