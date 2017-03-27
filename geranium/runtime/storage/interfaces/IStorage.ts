namespace geranium.runtime.storage.interfaces {
    export interface IStorage {
        add(model: any): boolean;
        remove<T>(type: { new (...args: any[]): T }): boolean;
        get<T>(type: { new (...args: any[]): T }): T;
    }
}