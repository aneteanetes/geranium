import { Exception } from "../Exception";

export class InterfaceUsingException extends Exception {
    constructor(msg: string) {
        msg += "InterfaceUsingException: you can not use interface-like class!";
        super(msg);
    }
}