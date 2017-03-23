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

            var view = await this.completeview(selector);
            var vengine = runtime.appSettings.viewengine;
            var context = new viewengine.contracts.ExecuteContext(view);
            this.publishedViewDom = await vengine.execute(context);
        }

        documentTitle(): string { return null; }
        abstract view(): { new (selector: string): view.abstract.View } | string;

        /**
         * return complete rendered view
         * @param selector
         */
        private completeview(selector: string): Promise<view.abstract.View> {
            var view: view.abstract.View;

            var viewctr = this.view();
            if (typeof viewctr === "string") {
                let vmctr = ViewModelView;
                view = new (vmctr as any)(selector, viewctr);
            }
            else
                view = new (viewctr as any)(selector);
            view.data = this;
            return view.render();
        }
    }

    class ViewModelView extends view.abstract.View {
        declare() { return undefined; }
    }
}