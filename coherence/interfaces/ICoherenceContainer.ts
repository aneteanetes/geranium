import { Constructor } from "../../structures/Constructor";
import { IInjected } from "./IInjected";

export interface ICoherenceContainer extends IInjected {
    register<T extends IInjected>(type: Constructor<T> | Function, value: T): void;
    resolve<T extends IInjected>(type: Constructor<T> | Function): T;
    resolveAll<T extends IInjected>(type: Constructor<T> | Function): T[];
    release<T extends IInjected>(type: Constructor<T> | Function);
    instantiate<T extends IInjected>(type: Constructor<T> | Function | any, params?: any[]): T;
    all(): any[];
}