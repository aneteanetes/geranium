namespace geranium.runtime.reflection.cloning {
    export class ClonerAssign<T> implements interfaces.ICloner{
        clone<T>(sample: T): T {


            //soft clone
            var _new = Object.assign({}, sample, Object.getPrototypeOf(sample));

            //deep clone
            for (let key in sample) {
                if (typeof sample[key] === 'function' && key != 'clone') {
                    (_new as any)[key] = (...args: any[]) => {
                        (sample[key] as any).apply(_new, args);
                    };
                }
            }

            return _new;
        }
    }
}