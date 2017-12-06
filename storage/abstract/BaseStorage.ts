import { LoggedStorage } from "./LoggedStorage";
import { Constructor } from "../../structures/Constructor";

export class BaseStorage extends LoggedStorage {
    protected storageName: string;

    constructor(name: string) {
        super();
        this.storageName = name;
    }

    add(model: any): boolean {
        try {
            this.collection.push(model);
            return true;
        } catch (ex) {
            this.log(ex);
            return false;
        }
    }

    remove<T>(type: Constructor<T>): boolean {
        try {
            var model = this.searchFor(type);
            if (model != null)
                window[this.storageName] = this.collection.remove(model);
            return true;
        } catch (ex) {
            this.log(ex);
            return false;
        }
    }

    get<T>(type: Constructor<T>): T {
        return this.searchFor(type);
    }

    all<T>(): T[] {
        throw new Error("Method not implemented.");
    }

    private get collection(): any[] {
        if (window[this.variable] == null) {
            window[this.variable] = new Array();
        }
        return window[this.variable] as any[];
    }

    private searchFor<T>(ctor: { new(...args: any[]): T }): any {
        var enumerable = this.collection
            .filter(x => x instanceof ctor);
        if (enumerable.length > 0)
            return enumerable[0];
        return null;
    }
}