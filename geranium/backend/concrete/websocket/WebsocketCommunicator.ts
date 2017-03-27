namespace geranium.backend.websocket {
    export class WebSocketCommunicator implements interfaces.ICommunicator {

        protected socket: WebSocket;

        constructor(endpoint: string) {
            if (typeof WebSocket !== undefined)
                this.socket = new WebSocket(endpoint);
            else
                this.socket = new MozWebSocket(endpoint);
            this.socket.onmessage = (x) => {
                this.data = x.data;
            };
        }

        send<TRequest>(data: TRequest) {
            return this.socketOpened()
                .then(() => { this.socket.send(data) })
                .catch(this.catchSocketError);
        }
        recive<TResponse>(): PromiseLike<TResponse> {
            return this.socketRecived()
                .then(x => {
                    var _return = this.data;
                    this.data = null;
                    return _return;
                })
                .catch(this.catchSocketError);
        }
        catchSocketError(ex: Error) {
            console.log(ex);
        }
        private data: any;
        socketRecived() {
            return new Promise(function (resolve) {
                setTimeout(resolve, 30);
            }).then(() => {
                if (this.data == null)
                    this.socketRecived();
            });
        }
        socketOpened() {
            return new Promise(function (resolve) {
                setTimeout(resolve, 30);
            }).then(() => {
                if (this.socket.readyState != this.socket.OPEN)
                    this.socketOpened();
            });
        }
    }
}