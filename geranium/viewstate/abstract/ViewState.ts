namespace geranium.viewstate {
    export abstract class ViewState extends states.State implements view.interfaces.IViewed {
        public async show(selector: string) {
            var state = await State.get<states.State>(this.constructor as any);

            this.sync().then(() => {
                runtime.appSettings.viewengine.execute({
                    iViewed: this,
                    selector: selector
                });
            });
        }

        abstract view(): { new (selector: string): view.abstract.View } | string;
    }
}