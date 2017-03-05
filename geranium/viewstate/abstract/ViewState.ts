module geranium.viewstate {
    export abstract class ViewState implements view.interfaces.IViewed {
        constructor(selector: string) {
            this.execute(selector);
        }

        private async execute(selector: string) {
            var statectr = this.state();
            var state = states.State.get(statectr);
            if (state == null) {
                state = new statectr();
            }

            var viewctr = this.view();
            var view = new viewctr(selector);
            view.data = state;
            await view.render();

            var viewengine = runtime.AppSettings.Current.viewengine;
            var bindingFlags = [viewbinding.contracts.ViewBindingFlags.Fields];
            var processed = viewengine.execute(new geranium.viewengine.contracts.ViewEngineExecuteContext(view, bindingFlags));
        }

        protected abstract state(): { new (...args: any[]): states.State }
        abstract view(): { new (selector: string): view.abstract.View };
    }
}