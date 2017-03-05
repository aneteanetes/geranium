module geranium.backend.abstract {
    export abstract class StatefullRequest extends backend.abstract.EventRequest {
        constructor(communicator: interfaces.ICommunicator) {
            super(communicator);
            this.bind = (super_send) => {
                
                var states = runtime.AppSettings.Current.states.all();
                if (states == null || states.length == 0)
                    return;

                states.filter(x => x.refreshable)
                    .forEach(state => {
                        super_send(state.params)
                            .then(x => {  state.obtain(x); });
                    });
            };
        }
    }
}