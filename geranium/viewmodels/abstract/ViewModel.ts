module geranium.viewmodels.abstract {
    export abstract class ViewModel extends models.abstract.Model implements view.interfaces.IViewed {
        constructor(selector: string) {
            super();
            this.execute(selector);
        }

        private async execute(selector: string) {
            var viewctr = this.view();
            var view = new viewctr(selector);
            view.data = this;
            await view.render();
            debugger;
            var vengine = runtime.AppSettings.Current.viewengine;
            var context = new viewengine.contracts.ExecuteContext(view);
            vengine.execute(context);
        }

        abstract view(): { new (selector: string): view.abstract.View };
    }
}