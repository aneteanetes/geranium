module geranium.backend.abstract {
    export abstract class StatefullRequest extends Request {
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
                .then(x => { this.refresh(); return x; })
                .catch(this.catchPromise);
        }

        refresh() {
            
            var states = runtime.AppSettings.Current.states.all();
            if (states == null || states.length == 0)
                return;

            states.filter(x => x.refreshable)
                .forEach(state => {
                    super.send(state.params)
                        .then(x => state.obtain = x);
                });
        }
    }
}