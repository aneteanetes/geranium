import { InterfaceUsingException } from "../../exceptions/coherence/InterfaceUsingException";

export class ICommunicator {
    send<TRequest>(data: TRequest): Promise<void> { throw new InterfaceUsingException("ICommunicator.send"); }
    recive<TResponse>(): Promise<TResponse> { throw new InterfaceUsingException("ICommunicator.recive"); }
}