namespace geranium.runtime.reflection.cloning.interfaces {
    export interface ICloner {
        clone<T>(sample: T): T;
    }
}