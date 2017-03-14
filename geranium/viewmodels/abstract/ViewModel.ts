module geranium.viewmodels.abstract {
    @routing.abstract.Router.routeignore
    export abstract class ViewModel extends models.abstract.Model implements view.interfaces.IViewed {
        async display(selector: string) {
            var viewctr = this.view();
            var view = new viewctr(selector);
            view.data = this;
            await view.render();

            var title = this.documentTitle();
            if (title != null)
                document.title = title;

            var vengine = runtime.AppSettings.Current.viewengine;
            var context = new viewengine.contracts.ExecuteContext(view);
            var viewDOM = await vengine.execute(context);            
        }
        documentTitle(): string { return null; }
        abstract view(): { new (selector: string): view.abstract.View };
    }
}