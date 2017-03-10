module geranium.runtime.reflection {
    export class Property {
        /**
            * Returns indexer of real value
        */
        static define(target, name: string, get: (val: any) => any, set: (val: any) => any): any {

            var property: any = name;
            var indexer = Symbol(name);

            if ((target as Object).hasOwnProperty(name)) {
                property = Object.getOwnPropertySymbols(target)
                    .filter(x => x.toString() == 'Symbol(' + name + ')')[0];
                if (property != undefined)
                    target[indexer] = target[property];
                else {
                    target[indexer] = target[name];
                    property = name;
                }
            } else
                target[indexer] = target[name];

            Object.defineProperty(target, property, {
                get() { return get(target[indexer]); },
                set(val) {
                    var setVal = set(val);
                    if (setVal != undefined)
                        target[indexer] = val;
                }
            });

            return indexer;
        }
    }
}