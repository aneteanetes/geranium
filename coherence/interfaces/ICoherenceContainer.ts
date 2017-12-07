import { Constructor } from "../../structures/Constructor";

export interface ICoherenceContainer {
    register<T>(type: Constructor<T> | Function, value: T): void;
    resolve<T>(type: Constructor<T> | Function): T;
    resolveAll<T>(type: Constructor<T> | Function): T[];
    release<T>(type: Constructor<T> | Function);
    all(): any[];
}