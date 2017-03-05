module geranium.backend.abstract {
    export abstract class EventRequest extends Request {
        send<TResponse>(data: any): PromiseLike<TResponse> {
            return new Promise((resolve, reject) => {
                try {
                    resolve(this.communicator.send<any>(data));
                }
                catch (ex) {
                    reject(new exceptions.Exception('Communication error!'));
                }
            })
                .then<TResponse>(x => {
                    return this.communicator.recive<TResponse>();
                })
                .then(x => { this.trigger(); return x; })
                .catch(this.catchPromise);
        }
        trigger() {
            super.trigger(super.send);
        }
    }
}