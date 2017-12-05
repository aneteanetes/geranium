import { StatefullRequest } from "../../abstract/StatefullRequest";
import { Exception } from "../../../exceptions/Exception";
import { AjaxCommunicator } from "./AjaxCommunicator";

export class AjaxRequest extends StatefullRequest {
    constructor(error: { (err: Exception) }) {
        super();
        this.catchPromise = error;
    }
    catchPromise(err: any) { }
}