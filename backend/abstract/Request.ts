import { ICommunicator } from "../interfaces/ICommunicator";
import { Event } from "../../behaviors/events/abstract/Event";
import { Exception } from "../../exceptions/Exception";
import { IInjected } from "../../coherence/abstract/IInjected";
import { ICoherenceContainer } from "../../coherence/interfaces/ICoherenceContainer";
import { IRequest } from "../interfaces/IRequest";
import { ILogger } from "../../exceptions/logging/interfaces/ILogger";
import { CommunicationException } from "../../exceptions/backend/CommunicationException";

export abstract class Request extends Event<(<TResponse>(data: any) => PromiseLike<TResponse>)> implements IRequest, IInjected {
    ["`container"]: ICoherenceContainer;

    async send<TResponse>(data: any): Promise<TResponse> {
        const communicator = this["`container"].resolve(ICommunicator);
        try {
            await communicator.send(data);
            return communicator.recive<TResponse>();
        } catch (ex) {
            this.catch(new CommunicationException(ex));
        }
    }

    protected catch(err: any) {
        if (this.catchPromise) {
            this.catchPromise(err);
        }

        const logger = this["`container"].resolve(ILogger);
        if (logger) {
            logger.log(err);
        }
    }

    protected abstract catchPromise(err: any);
}