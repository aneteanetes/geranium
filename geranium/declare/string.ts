interface String {
    replaceAll(search: string, replacement: string): string;
    random(length: number): string;
    randomize(): string;
}
if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function (search, replacement) {
        return this.replace(new RegExp(search, 'g'), replacement);
    }
}
if (!String.prototype.random) {
    String.prototype.random = function (length: number) {
        var chars = 'abcdefghijkl0123456789mnopqrstuvwxyz';
        var result = '';
        for (var i = length; i > 0; --i)
            result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }
}
if (!String.prototype.randomize) {
    String.prototype.randomize = function () {
        return this+this.random(6);
    }
}