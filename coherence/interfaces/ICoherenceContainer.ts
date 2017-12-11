import { Constructor } from "../../structures/Constructor";
import { IInjected } from "./IInjected";

export interface ICoherenceContainer extends IInjected {
    /** Register component in this (child ignored) container */
    register<T extends IInjected>(type: Constructor<T> | Function, value: T): void;
    /** Resolve first component from this (child ignored) container */
    resolve<T extends IInjected>(type: Constructor<T> | Function): T;
    /** Resolve all components from this (child ignored) container */
    resolveAll<T extends IInjected>(type: Constructor<T> | Function): T[];
    /** Release first component from this (child ignored) container */
    release<T extends IInjected>(type: Constructor<T> | Function);
    /** Inject into component this container */
    instantiate<T extends IInjected>(type: Constructor<T> | Function | any, params?: any[]): T;
    /** Return all existed components from this (child ignored) container */
    all(): any[];
}