module geranium.runtime.reflection {
    export class Property {
        /**
            * Returns indexer of real value
        */
        static define(target, name: string, get: (val: any) => any, set: (val: any) => any, state?: ResultOfDefiningProperty): ResultOfDefiningProperty {

            var property: any = name;
            var indexer = Symbol(name);

            var descriptor = Object.getOwnPropertyDescriptor(target, name);
            var __protodescriptor = Object.getOwnPropertyDescriptor(target.__proto__, name);

            if (descriptor != undefined && descriptor.value == undefined || __protodescriptor) {
                if (!state) {
                    state = Property.restorePropertyChain(descriptor ? target : target.__proto__, name);
                }
                property = state.indexer;
                indexer = Symbol(name + '___' + state.chain.toString());
                if (__protodescriptor && !property) {
                    property = name;
                    target[indexer] = target[name];
                } else
                    target[indexer] = target[state.indexer];
                state.chain++;
            } else
                target[indexer] = target[name];            

            //if (!__protodescriptor)
                Object.defineProperty(target, property, {
                    get() { return get(target[indexer]); },
                    set(val) {
                        var setVal = set(val);
                        if (setVal != undefined)
                            target[indexer] = val;
                    }
                });
            //else
            //    Object.defineProperty(target, property, {
            //        get() { return get(target.__proto__[indexer]); },
            //        set(val) {
            //            var setVal = set(val);
            //            if (setVal != undefined)
            //                target.__proto__[indexer] = val;
            //        }
            //    });

            if (!state)
                state = new ResultOfDefiningProperty();
            state.indexer = indexer;
            return state;
        }
        /**
         * Returns last indexer of property chain, usable only after Property.define()
         * @param target
         * @param propertyName
         */
        private static restorePropertyChain(target, propertyName, state?: ResultOfDefiningProperty): ResultOfDefiningProperty {
            if (!state) {
                state = new ResultOfDefiningProperty();
                state.chain = 0;
            }

            var postfix = "___" + state.chain.toString();

            var symbol = Object.getOwnPropertySymbols(target)
                .filter(x => x.toString() == 'Symbol(' + propertyName + postfix + ')')[0];

            if (symbol == null) {
                return state;
            }
            else {
                state.indexer = symbol;
                state.chain++;
                return Property.restorePropertyChain(target, propertyName, state);
            }
        }
    }

    export class ResultOfDefiningProperty {
        indexer: any;
        chain: number = 0;
    }
}