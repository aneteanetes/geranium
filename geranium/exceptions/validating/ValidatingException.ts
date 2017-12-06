import { Exception } from "../Exception";

export class ValidatingException extends Exception {
    constructor(msg: string) {
        super("ValidatingException: exception while model validating\n" + msg);
    }
}