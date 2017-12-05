import { Request } from "./Request";
import { Exception } from "../../exceptions/Exception";
import { ICommunicator } from "../interfaces/ICommunicator";
import { CommunicationException } from "../../exceptions/backend/CommunicationException";

export abstract class EventRequest extends Request {
    /**
     * send request to server
     * @param data
     * @param stateless your request not raise state-sync event
     */
    async send<TResponse>(data: any, stateless: boolean = false): Promise<TResponse> {
        try {
            const communicator = this["`container"].resolve(ICommunicator);

            await communicator.send<any>(data);

            const response = communicator.recive<TResponse>();

            if (!stateless) {
                this.raise();
            }

            return response;

        } catch (ex) {
            this.catch(new CommunicationException(ex));
        }
    }

    raise() {
        super.raise(super.send);
    }
}