module geranium.backend {
    export abstract class Request {
        protected communicator: interfaces.ICommunicator;

        constructor(communicator: interfaces.ICommunicator) {
            this.communicator = communicator;
        }

        send<TResponse>(data: any): PromiseLike<TResponse> {
            return new Promise((resolve, reject) => {
                try {
                    resolve(this.communicator.send<any>(data));
                }
                catch (ex) { reject(new exceptions.Exception('Communication error!')); }
            })
                .then<TResponse>(x => this.communicator.recive<TResponse>())
                .catch(this.catchPromise);
        }

        protected abstract catchPromise(err: any);
        protected abstract resolvePromise();
    }
}