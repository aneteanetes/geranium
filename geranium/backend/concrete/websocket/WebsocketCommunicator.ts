import { ICommunicator } from "../../interfaces/ICommunicator";
import { MozWebSocket } from "./MozWebSocket";

export class WebSocketCommunicator extends ICommunicator {

    protected socket: WebSocket;
    private data: any;
    private static timeConstant = 30; // TODO: time constant?

    constructor(endpoint: string) {
        super();
        this.setSocket(endpoint);
        this.socket.onmessage = (event) => {
            this.data = event.data;
        };
    }

    send<TRequest>(data: TRequest) {
        return this.socketOpened()
            .then(() => { this.socket.send(data) })
            .catch(this.catchSocketError);
    }

    recive<TResponse>(): Promise<TResponse> {
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

    private socketRecived() {
        return new Promise(function (resolve) {
            setTimeout(resolve, WebSocketCommunicator.timeConstant);
        }).then(() => {
            if (this.data == null) {
                this.socketRecived();
            }
        });
    }

    private socketOpened() {
        return new Promise(function (resolve) {
            setTimeout(resolve, WebSocketCommunicator.timeConstant);
        }).then(() => {
            if (this.socket.readyState != this.socket.OPEN) {
                this.socketOpened();
            }
        });
    }

    private setSocket(endpoint: string) {
        if (typeof WebSocket !== undefined) {
            this.socket = new WebSocket(endpoint);
        }
        else {
            this.socket = new MozWebSocket(endpoint);
        }
    }
}