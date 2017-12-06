import { Exception } from "../Exception";

export class ContainerNotInitializedException extends Exception {
    constructor(msg: string) {
        super("ContainerNotInitializedException: container was not initialized, use the global GeraniumApp object to initialize\n" + msg);
    }
}