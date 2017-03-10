module geranium.backend.ajax {
    export class AjaxCommunicator implements interfaces.ICommunicator {
        private innerPromise: JQueryPromise<any>;
        send<TRequest extends JQueryAjaxSettings>(data: TRequest) {
            this.innerPromise = $.ajax(data);
        }
        async recive<TResponse>(): Promise<TResponse> {
            return await this.innerPromise;
        }
    }
}