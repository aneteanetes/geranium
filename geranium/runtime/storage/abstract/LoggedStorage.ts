module geranium.runtime.abstract {
    export abstract class LocalStorage implements storage.interfaces.IStorage {
        abstract add(model: any): boolean;
        abstract remove<T>(type: { new (...args: any[]): T, name: string }): boolean;
        abstract get<T>(type: { new (...args: any[]): T, name: string }): T;

        log(ex: exceptions.Exception) {
            AppSettings.Current.logger.log(ex);
        }
    }
}