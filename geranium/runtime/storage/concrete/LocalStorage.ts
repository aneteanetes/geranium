module geranium.runtime {
    export class LocalStorage extends abstract.LoggedStorage {
        add(model: any): boolean {
            try {
                localStorage.setItem(model.constructor.name, model.toString());
                return true;
            } catch (ex) {
                this.log(ex);
                return false;
            }
        }
        remove<T>(type: { new (...args: any[]): T, name: string }): boolean {
            try {
                localStorage.removeItem(type.name);
                return true;
            } catch (ex) {
                this.log(ex);
                return false;
            }
        }
        get<T>(type: { new (...args: any[]): T, name: string }): T {
            var strValue = localStorage.getItem(type.name);
            return JSON.parse(strValue);
        }
    }
}