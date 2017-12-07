import { Constructor } from "../../structures/Constructor";
import { BaseStorage } from "../abstract/BaseStorage";
import { IEntity } from "../interfaces/IEntity";

export class MemoryStorage extends BaseStorage {
    protected write(data: IEntity[], storageName: string) {
        window[storageName] = data;
    }

    protected read(storageName: string): IEntity[] {
        return window[storageName];
    }
}