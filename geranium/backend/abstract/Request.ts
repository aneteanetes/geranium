module geranium.backend.abstract {
    export abstract class Request {
        protected communicator: interfaces.ICommunicator;

        constructor(communicator: interfaces.ICommunicator) {
            this.communicator = communicator;
        }

        send<TResponse>(data: any): PromiseLike<TResponse> {
            return new Promise((resolve, reject) => {
                try {
                    debugger;
                    resolve(this.communicator.send<any>(data));
                }
                catch (ex) {
                    debugger;
                    reject(new exceptions.Exception('Communication error!'));
                }
            })
                .then<TResponse>(x => this.communicator.recive<TResponse>())
                .catch(this.catchPromise);
        }

        protected abstract catchPromise(err: any);
    }
}