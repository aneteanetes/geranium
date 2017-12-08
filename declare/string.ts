export class StringHelper {
    static replaceAll(str: string, search: string, replacement: string): string {
        return str.replace(new RegExp(search, 'g'), replacement);
    }
    static random(length: number): string {
        var chars = 'abcdefghijkl0123456789mnopqrstuvwxyz';
        var result = '';
        for (var i = length; i > 0; --i)
            result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }
    static randomize(str: string): string {
        return str + this.random(6);
    }
}