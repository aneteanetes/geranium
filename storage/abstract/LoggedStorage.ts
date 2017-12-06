import { IStorage } from "../interfaces/IStorage";
import { Exception } from "../../exceptions/Exception";
import { ILogger } from "../../exceptions/logging/interfaces/ILogger";

export abstract class LoggedStorage extends IStorage {
    abstract add(model: any): boolean;
    abstract remove<T>(type: { new(...args: any[]): T, name: string }): boolean;
    abstract get<T>(type: { new(...args: any[]): T, name: string }): T;
    abstract all<T>(): T[];

    log(ex: Exception) {
        this["`container"].resolve(ILogger).log(ex);
    }
}