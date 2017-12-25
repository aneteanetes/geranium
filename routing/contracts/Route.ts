import { Constructor } from "../../structures/Constructor";

export class Route {
    url: string;
    /**
     * constructor of this object
     */
    ctor: Constructor<any>;
    /**
     * executable function of this routes, if empty: toString()
     */
    executable: string;
    /**
     * selector for executable function
     */
    selector: string;
    restore: boolean;
}