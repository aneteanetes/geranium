namespace geranium.runtime.reflection.cloning {
    export class ExtendCloner<T> implements interfaces.ICloner {
        clone<T>(sample: T): T {
            var proto = Object.getPrototypeOf(sample);
            return $.extend(true, {}, proto, Object.getPrototypeOf(proto));
        }
    }
}