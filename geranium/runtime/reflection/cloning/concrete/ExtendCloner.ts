namespace geranium.runtime.reflection.cloning {
    export class ExtendCloner<T> implements interfaces.ICloner {
        clone<T>(sample: T): T {
            return $.extend(true, {}, sample);
        }
    }
}