import { InterfaceUsingException } from "../../exceptions/coherence/InterfaceUsingException";
import { IInjected } from "../../coherence/interfaces/IInjected";
import { ICoherenceContainer } from "../../coherence/interfaces/ICoherenceContainer";

export class IRequest implements IInjected {
    ["`container"]: ICoherenceContainer;
    send<TRequest, TResponse>(data: TRequest): Promise<TResponse> { throw new InterfaceUsingException("IRequest.send"); }
}