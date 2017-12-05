import { StatefullRequest } from "../../abstract/StatefullRequest";
import { Exception } from "../../../exceptions/Exception";

export class WebSocketRequest extends StatefullRequest {
    constructor(endpoint: string, error: { (err: Exception) }) {
        super();
        this.catchPromise = error;
    }
    catchPromise(err: any) { }
}