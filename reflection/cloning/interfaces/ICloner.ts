import { InterfaceUsingException } from "../../../exceptions/coherence/InterfaceUsingException";
import { IInjected } from "../../../coherence/interfaces/IInjected";
import { ICoherenceContainer } from "../../../coherence/interfaces/ICoherenceContainer";

export class ICloner implements IInjected {
    ["`container"]: ICoherenceContainer;
    clone<T>(sample: T): T { throw new InterfaceUsingException("ICloner.clone"); }
}