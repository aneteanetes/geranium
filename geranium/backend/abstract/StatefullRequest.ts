namespace geranium.backend.abstract {
    export abstract class StatefullRequest extends backend.abstract.EventRequest {
        constructor(communicator: interfaces.ICommunicator) {
            super(communicator);
            this.bind = (super_send) => {

                var states = runtime.appSettings.states.all();
                if (states == null || states.length == 0)
                    return;

                states.filter(x => { if (x.synchronizer) return true; else return false; })
                    .forEach(state => {
                        super_send(state.synchronizer)
                            .then(x => { state.obtain(x); });
                    });
            };
        }
    }
}