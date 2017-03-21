namespace geranium.backend {
    export class WebSocketRequest extends abstract.StatefullRequest {
        constructor(endpoint: string, error: { (err: exceptions.Exception) }) {
            super(new backend.websocket.WebSocketCommunicator(endpoint));
            this.catchPromise = error;
        }
        catchPromise(err: any) { }
    }
}