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
            this._requestEvents.forEach(x => {
                x(super.send);
            });
        }

        private _requestEvents: ((super_send: (<TResponse>(data: any) => PromiseLike<TResponse>)) => void)[];
        set bind(callback: (super_send: (<TResponse>(data: any) => PromiseLike<TResponse>)) => void) {
            this._requestEvents.push(callback);
        }
        set unbind(callback: (super_send: (<TResponse>(data: any) => PromiseLike<TResponse>)) => void) {
            this._requestEvents.remove(callback);
        }
    }
}