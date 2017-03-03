module geranium.viewstate {
    export abstract class ViewState {
        constructor(target: JQuery) {            
            var statectr = this.state();
            var state = states.State.get(statectr);
            if (state == null) {
                state = new statectr();
            }

            state.bind = (state: states.State) => {
                debugger;
                var viewctr = this.view();
                var view = new viewctr(target);
                view.data = state;
                view.execute();
            }
        }

        protected abstract view(): { new (target: JQuery): view.abstract.View };
        protected abstract state(): { new (...args: any[]): states.State }
    }
}