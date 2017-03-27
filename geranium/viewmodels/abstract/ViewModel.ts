namespace geranium.viewmodels.abstract {
    @routing.routeignore
    export abstract class ViewModel extends models.abstract.Model implements view.interfaces.IViewed {
        private publishedViewDom: viewDOM.abstract.ViewDOM;
        protected get markup(): viewDOM.abstract.ViewDOM { return this.publishedViewDom; }

        async display(selector: string) {

            if (history.is(this.constructor) && arguments.length < 3) {
                var _history = new history.contracts.HistoryItem();
                _history.url = routing.urlFromCtor(this.constructor, arguments[1]);
                _history.title = document.title;
                _history.state = {
                    ctor: this.constructor.name,
                    selector: selector
                };
                runtime.appSettings.history.extend(_history);
            }

            var title = this.documentTitle();
            if (title != null)
                document.title = title;
            
            this.publishedViewDom = await runtime.appSettings.viewengine.execute({
                iViewed: this,
                selector: selector
            });
        }

        documentTitle(): string { return null; }
        abstract view(): { new (selector: string): view.abstract.View } | string;
    }
}