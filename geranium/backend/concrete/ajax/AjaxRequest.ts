namespace geranium.backend {
    export class AjaxRequest extends abstract.StatefullRequest {
        constructor(error: { (err: exceptions.Exception) }) {
            super(new backend.ajax.AjaxCommunicator());
            this.catchPromise = error;
        }
        catchPromise(err: any) { }
    }
}