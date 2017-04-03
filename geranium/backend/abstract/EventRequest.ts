namespace geranium.backend.abstract {
	export abstract class EventRequest extends Request {
		/**
		 * send request to server
		 * @param data
		 * @param stateless your request not raise state-sync event
		 */
		send<TResponse>(data: any, stateless: boolean = false): PromiseLike<TResponse> {
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
				.then(x => {
					if (!stateless)
						this.raise();
					return x;
				})
                .catch(this.catchPromise);
        }
        raise() {
            super.raise(super.send);
        }
    }
}