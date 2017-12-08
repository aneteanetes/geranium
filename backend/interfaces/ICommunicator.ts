import { InterfaceUsingException } from "../../exceptions/coherence/InterfaceUsingException";
import { IInjected } from "../../coherence/interfaces/IInjected";
import { ICoherenceContainer } from "../../coherence/interfaces/ICoherenceContainer";

export class ICommunicator implements IInjected {
    ["`container"]: ICoherenceContainer;
    send<TRequest>(data: TRequest): Promise<void> { throw new InterfaceUsingException("ICommunicator.send"); }
    recive<TResponse>(): Promise<TResponse> { throw new InterfaceUsingException("ICommunicator.recive"); }
}