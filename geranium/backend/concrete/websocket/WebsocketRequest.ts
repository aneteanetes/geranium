module geranium.backend {
    export class WebSocketRequest extends abstract.Request {
        constructor(endpoint: string, error: { (err: exceptions.Exception) }) {
            super(new backend.websocket.WebSocketCommunicator(endpoint));
            this.catchPromise = error;
        }
        catchPromise(err: any) { }
    }
}