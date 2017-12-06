import { Exception } from "../Exception";

export class CommunicationException extends Exception {
    constructor(msg: string) {
        super("CommunicationException:" + msg);
    }
}