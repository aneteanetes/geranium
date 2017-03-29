namespace geranium.runtime.reflection.cloning {
    export class ClonerAssign<T> implements interfaces.ICloner{
        clone<T>(sample: T): T {
            var proto = Object.getPrototypeOf(sample);
            //soft clone
            var _new = Object.assign({}, sample, proto, Object.getPrototypeOf(proto));

            //deep clone
            var _props = props(proto).filter(x => notCoreFunc(x));
            _props.forEach(key => {
                if (typeof proto[key] === 'function') {
                    (_new as any)[key] = (...args: any[]) => {
                        (proto[key] as any).apply(_new, args);
                    };
                }
            });

            return _new;
        }
    }

    function notCoreFunc(key: string) {
        return ["constructor",
            "clone",
            "__defineGetter__",
            "__defineSetter__",
            "hasOwnProperty",
            "__lookupGetter__",
            "__lookupSetter__",
            "propertyIsEnumerable",
            "__proto__",
            "toString",
            "toLocaleString",
            "valueOf",
            "isPrototypeOf"].indexOf(key) == -1;
    }

    function props(obj: any): string[] {
        var p = [];
        for (; obj != null; obj = Object.getPrototypeOf(obj)) {
            var op = Object.getOwnPropertyNames(obj);
            for (var i = 0; i < op.length; i++)
                if (p.indexOf(op[i]) == -1)
                    p.push(op[i]);
        }
        return p;
    }
}