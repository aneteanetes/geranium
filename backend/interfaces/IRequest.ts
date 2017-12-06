import { InterfaceUsingException } from "../../exceptions/coherence/InterfaceUsingException";

export class IRequest {
    send<TRequest, TResponse>(data: TRequest): Promise<TResponse> { throw new InterfaceUsingException("IRequest.send"); }
}