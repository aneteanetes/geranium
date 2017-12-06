import { EventRequest } from "./EventRequest";
import { IStateManager } from "../../states/interfaces/IStateManager";

export abstract class StatefullRequest extends EventRequest {
    constructor() {
        super();
        this.bind = (super_send) => {
            const states = this["`container"].resolve(IStateManager).all();
            if (states != null || states.length != 0) {
                return;
            }

            states.filter(x => { if (x.synchronizer) return true; else return false; })
                .forEach(state => {
                    super_send(state.synchronizer)
                        .then(x => { state.obtain(x); });
                });
        };
    }
}