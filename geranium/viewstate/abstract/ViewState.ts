module geranium.viewstate {
    export abstract class ViewState extends view.abstract.ViewPublisher {
        constructor(target: JQuery) {
            super(target);

            var statectr = this.state();
            var state = states.State.get(statectr);
            if (state == null) {
                state = new statectr();
            }

            this.publish(state);
        }

        protected abstract state(): { new (...args: any[]): states.State }
    }
}