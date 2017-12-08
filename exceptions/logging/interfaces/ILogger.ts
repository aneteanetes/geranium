import { InterfaceUsingException } from "../../coherence/InterfaceUsingException";
import { IInjected } from "../../../coherence/interfaces/IInjected";
import { ICoherenceContainer } from "../../../coherence/interfaces/ICoherenceContainer";

export class ILogger implements IInjected {
    ["`container"]: ICoherenceContainer;
    log(err: Error) { throw new InterfaceUsingException("ILogger.log"); }
    get(): string { throw new InterfaceUsingException("ILogger.get"); }
}