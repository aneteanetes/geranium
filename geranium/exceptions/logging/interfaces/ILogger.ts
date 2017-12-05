import { InterfaceUsingException } from "../../coherence/InterfaceUsingException";

export class ILogger {
    log(err: Error) { throw new InterfaceUsingException("ILogger.log"); }
    get(): string { throw new InterfaceUsingException("ILogger.get"); }
}