import { InterfaceUsingException } from "../../exceptions/coherence/InterfaceUsingException";
import { IInjected } from "../../coherence/interfaces/IInjected";
import { ICoherenceContainer } from "../../coherence/interfaces/ICoherenceContainer";
export class IBinding<TDOM> implements IInjected {
    ["`container"]: ICoherenceContainer;
    bind(objectDOM: TDOM, model: any): void { throw new InterfaceUsingException("IBinding.bind"); }
}