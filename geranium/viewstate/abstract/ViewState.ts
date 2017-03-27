namespace geranium.viewstate {
    export abstract class ViewState extends states.State implements view.interfaces.IViewed {
        constructor(selector: string) {
            super();
            debugger;
            runtime.appSettings.viewengine.execute({
                iViewed: this,
                selector: selector
            });
        }

        abstract view(): { new (selector: string): view.abstract.View } | string;
    }
}