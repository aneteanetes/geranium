import { Constructor } from "../../structures/Constructor";

export class RouteContext {
    prepath?: string;
    parent?: Constructor<any>;
    executable?: string;
}