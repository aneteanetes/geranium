import { BaseStorage } from "../abstract/BaseStorage";
import { IEntity } from "../interfaces/IEntity";

export class LocalStorage extends BaseStorage {
    protected write(data: IEntity[], storageName: string) {
        localStorage.setItem(storageName, JSON.stringify(data));
    }

    protected read(storageName: string): IEntity[] {
        return JSON.parse(localStorage.getItem(storageName));
    }
}