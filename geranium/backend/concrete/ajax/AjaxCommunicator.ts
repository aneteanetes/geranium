import { ICommunicator } from "../../interfaces/ICommunicator";

export class AjaxCommunicator extends ICommunicator {
    private innerPromise: JQueryPromise<any>;

    send<TRequest extends JQueryAjaxSettings>(data: TRequest): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.innerPromise = $.ajax(data);
        })
    }

    async recive<TResponse>(): Promise<TResponse> {
        //TODO : return await Promise vs return Promise;
        //link : realization, not concept
        return this.innerPromise;
    }
}