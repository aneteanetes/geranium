import { Constructor } from "../../structures/Constructor";

export interface ICoherenceContainer {
    register<T>(type: Constructor<T>, value: T): void;
    resolve<T>(type: Constructor<T>): T;
    resolveAll<T>(type: Constructor<T>): T[];
}