import { InterfaceUsingException } from "../../exceptions/coherence/InterfaceUsingException";
import { IInjected } from "../../coherence/interfaces/IInjected";
import { ICoherenceContainer } from "../../coherence/interfaces/ICoherenceContainer";
import { ViewModel } from "../../viewmodels/abstract/ViewModel";

export class IBinding implements IInjected {
    ["`container"]: ICoherenceContainer;
    bind(objectDOM: HTMLElement[], model: ViewModel): Promise<void> { throw new InterfaceUsingException("IBinding.bind"); }
}