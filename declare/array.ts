export class ArrayHelper {
    static remove<T>(array: T[], item: T): T[] {
        return array.filter(e => e !== item);
    }

    static removeSame<T>(array: T[]): T[] {
        return array.filter(function (elem, index, self) {
            return index == self.indexOf(elem);
        });
    }

    static groupBy<T>(array: T[], key: string): Array<Array<T>> {
        var groups = [];

        var targetKeys = array.map(x => x[key]);

        var unique = targetKeys.filter((value, index, array) => array.indexOf(value) === index);

        unique.forEach(z => {
            groups.push(array.filter(x => x[key] == z));
        })

        return groups;
    }
}