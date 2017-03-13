module geranium.viewmodels.abstract {
    @routing.abstract.Router.routeignore
    export abstract class ViewModel extends models.abstract.Model implements view.interfaces.IViewed {
        async display(selector: string) {
            var viewctr = this.view();
            var view = new viewctr(selector);
            view.data = this;
            await view.render();

            var vengine = runtime.AppSettings.Current.viewengine;
            var context = new viewengine.contracts.ExecuteContext(view);
            var viewDOM = await vengine.execute(context);

            runtime.AppSettings.Current.router.routeByCtor(this.constructor);
        }
        abstract view(): { new (selector: string): view.abstract.View };
    }
}