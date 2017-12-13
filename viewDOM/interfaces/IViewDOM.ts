import { InterfaceUsingException } from "../../exceptions/coherence/InterfaceUsingException";
import { IInjected } from "../../coherence/interfaces/IInjected";
import { ICoherenceContainer } from "../../coherence/interfaces/ICoherenceContainer";

export class IViewDOM implements IInjected {
    ["`container"]: ICoherenceContainer;
    DOM(): Promise<HTMLElement> { throw new InterfaceUsingException("IViewDOM.getViewDOM"); }
}