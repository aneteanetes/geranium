module geranium.viewmodels.abstract {
    @routing.abstract.Router.routeignore
    export abstract class ViewModel extends models.abstract.Model implements view.interfaces.IViewed {
        static lastViewModel: contracts.ViewModelHistoryState;

        async display(selector: string) {
            var viewctr = this.view();
            var view = new viewctr(selector);
            view.data = this;
            await view.render();
            
            var lastVM = ViewModel.lastViewModel;
            if (lastVM && arguments.length == 1) {
                var _history = new history.contracts.HistoryItem<contracts.ViewModelHistoryState>();
                _history.url = routing.abstract.Router.urlFromCtor(this.constructor);
                _history.title = document.title;
                _history.state = lastVM;
                runtime.AppSettings.Current.history.extend(_history);
            }

            if (history.is(this.constructor))
                ViewModel.lastViewModel = new contracts.ViewModelHistoryState({
                    ctor: this.constructor,
                    selector: selector
                });

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