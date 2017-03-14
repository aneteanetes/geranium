module geranium.viewmodels.abstract {
    @routing.abstract.Router.routeignore
    export abstract class ViewModel extends models.abstract.Model implements view.interfaces.IViewed {
        async display(selector: string) {
            var viewctr = this.view();
            var view = new viewctr(selector);
            view.data = this;
            await view.render();
            
            if (history.is(this.constructor) && arguments.length == 1) {
                var _history = new history.contracts.HistoryItem();
                _history.url = routing.abstract.Router.urlFromCtor(this.constructor);
                _history.title = document.title;
                _history.state = {
                    ctor: this.constructor.name,
                    selector: selector
                };
                runtime.AppSettings.Current.history.extend(_history);
            }

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