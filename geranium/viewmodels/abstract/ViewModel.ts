module geranium.viewmodels.abstract {
    export abstract class ViewModel extends models.abstract.Model implements view.interfaces.IViewed {
        async display(selector: string) {
            var viewctr = this.view();
            var view = new viewctr(selector);
            debugger;
            view.data = this;
            await view.render();

            var vengine = runtime.AppSettings.Current.viewengine;
            var context = new viewengine.contracts.ExecuteContext(view);
            vengine.execute(context);
        }
        abstract view(): { new (selector: string): view.abstract.View };
    }
}