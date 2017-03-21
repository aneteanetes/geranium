namespace geranium.runtime.reflection {
    export class Property {
        /**
         * Redefines property with new public accessors, safe
         * @param target
         * @param name of property
         * @param get new public setter
         * @param set new public getter
         */
        static redefine(target, name: string, get: (val: any) => any, set: (val: any) => any) {
            var protoPropertyDescriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(target), name);
            var ownPropertyDescriptor = Object.getOwnPropertyDescriptor(target, name);

            //prototype accessor
            if (ownPropertyDescriptor == undefined && protoPropertyDescriptor != undefined) {
                Object.defineProperty(target, name, {
                    get() { return get(protoPropertyDescriptor.get.call(target)); },
                    set(val) {
                        let _val = set(val);
                        if (_val != undefined)
                            protoPropertyDescriptor.set.call(target, _val);
                    },
                    configurable: true
                });
                return;

            //own accessor exists
            } else if (ownPropertyDescriptor.value == undefined) {
                Object.defineProperty(target, name, {
                    get() { return get(ownPropertyDescriptor.get.call(target)); },
                    set(val) {
                        let _val = set(val);
                        if (_val != undefined)
                            ownPropertyDescriptor.set.call(target, _val);
                    },
                    configurable: true
                });

            //accessor doesn't exists
            } else {
                var indexer = Symbol(name);
                target[indexer] = target[name];
                Object.defineProperty(target, name, {
                    get() { return get(target[indexer]); },
                    set(val) {
                        let _val = set(val);
                        if (_val != undefined)
                            target[indexer] = set(_val);
                    },
                    configurable: true
                });
            }
        }
    }
}