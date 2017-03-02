module geranium.runtime.storage.interfaces {
    export interface IGenericStorage<T> extends IStorage {
        all(): T[];
    }
}