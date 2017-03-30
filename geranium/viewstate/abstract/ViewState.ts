namespace geranium.viewstate {
    @routing.routeignore
    export abstract class ViewState extends states.State implements view.interfaces.IViewed {
        public async show(selector: string) {


            if (history.is(this.constructor) && !this['#routed']) {
                var _routed = this["@routed"] as routing.contracts.RouteMatch;
                _routed.selector = selector;
                runtime.appSettings.router.route(_routed);
            }
            else
                delete this['#routed'];

            var state = await State.get<states.State>(this.constructor as any);

            this.sync().then(() => {
                runtime.appSettings.viewengine.execute({
                    iViewed: this,
                    selector: selector
                });
            });
        }

        async toString(selector: string) {
            return this.show(selector);
        }

        abstract view(): { new (selector: string): view.abstract.View } | string;
    }
}