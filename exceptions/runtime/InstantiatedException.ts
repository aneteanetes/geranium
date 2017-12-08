import { Exception } from "../Exception";

export class InstantiatedException extends Exception {
    constructor(msg: string) {
        super("InstantiatedException: instance already instantiated, you can change instance options only at application start\n" + msg);
    }
}