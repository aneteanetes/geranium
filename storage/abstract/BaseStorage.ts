import { LoggedStorage } from "./LoggedStorage";
import { Constructor } from "../../structures/Constructor";
import { IStorage } from "../interfaces/IStorage";
import { IEntity } from "../interfaces/IEntity";

export abstract class BaseStorage extends IStorage {
    private data: Array<any>;
    protected storageName: string;

    constructor(name: string) {
        super();
        this.storageName = name;
    }

    add<T extends IEntity>(model: T): boolean {
        this.collection.push(model);
        return true;
    }

    remove<T extends IEntity>(id: number): boolean {
        var model = this.searchFor(id);
        if (model != null) {
            this.write(this.collection.remove(model), this.storageName);
        }
        return true;
    }

    get<T extends IEntity>(id: number): T {
        return this.searchFor(id);
    }

    all<T extends IEntity>(): T[] {
        return this.read(this.storageName) as T[];
    }

    private get collection(): IEntity[] {
        if (!this.read(this.storageName)) {
            this.write(new Array<IEntity>(), this.storageName);
        }
        return this.read(this.storageName);
    }

    private searchFor<T>(id: number): any {
        var enumerable = this.collection
            .filter(x => x.id == id);

        if (enumerable.length > 0) {
            return enumerable[0];

        }
        return null;
    }

    protected abstract write(data: Array<IEntity>, storageName: string);
    protected abstract read(storageName: string): Array<IEntity>;
}