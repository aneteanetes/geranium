namespace geranium.backend.abstract {
    export abstract class Request extends behaviors.events.Event<(<TResponse>(data: any) => PromiseLike<TResponse>)> {
        protected communicator: interfaces.ICommunicator;

        constructor(communicator: interfaces.ICommunicator) {
            super();
            this.communicator = communicator;
        }

        send<TResponse>(data: any): PromiseLike<TResponse> {

            //possible lost context
            var communicator: interfaces.ICommunicator;
            var catchPromise: (err: any) => void;
            if (this == null) {
                communicator = runtime.appSettings.communicator;
                catchPromise = (err) => {
                    runtime.appSettings.logger.log(err);
                }
            }
            else {
                communicator = this.communicator;
                catchPromise = this.catchPromise;
            }

            return new Promise((resolve, reject) => {
                try {
                    resolve(communicator.send<any>(data));
                }
                catch (ex) {
                    reject(new exceptions.Exception('Communication error!'));
                }
            })
                .then<TResponse>(x => communicator.recive<TResponse>())
                .catch(catchPromise);
        }

        protected abstract catchPromise(err: any);
    }
}