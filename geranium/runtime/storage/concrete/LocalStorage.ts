module geranium.runtime {
    export class LocalStorage implements storage.interfaces.IStorage {
        add(model: any): boolean {
            try {
                localStorage.setItem(model.constructor.name, model.toString());
                return true;
            } catch (ex) {
                return false;
            }
        }
        remove<T>(type: { new (...args: any[]): T, name: string }): boolean {
            try {
                localStorage.removeItem(type.name);
                return true;
            } catch (ex) {
                return false;
            }
        }
        get<T>(type: { new (...args: any[]): T, name: string }): T { return localStorage.getItem(type.name); }

    }
}