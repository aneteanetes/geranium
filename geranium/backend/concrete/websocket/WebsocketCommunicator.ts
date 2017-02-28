module geranium.backend.websocket {
    export class WebSocketCommunicator implements interfaces.ICommunicator {

        protected socket: WebSocket;

        constructor(endpoint: string) {
            if (typeof WebSocket !== undefined)
                this.socket = new WebSocket(endpoint);
            else
                this.socket = new MozWebSocket(endpoint);
            this.socket.onmessage = x => {
                return x.data;
            };
        }

        send<TRequest>(data: TRequest) {
            this.socket.send(data);
        }
        recive<TResponse>(): PromiseLike<TResponse> {
            return new Promise((resolve, reject) => {
                try {
                    resolve(this.socket.onmessage);
                } catch (ex) {
                    reject(ex);
                }
            }).catch(this.catchSocketError);
        }
        catchSocketError(ex: Error) {
            console.log(ex);
        }
    }
}