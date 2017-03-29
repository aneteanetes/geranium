namespace geranium.viewmodels.abstract {
    @routing.routeignore
    export abstract class ViewModel extends models.abstract.Model implements view.interfaces.IViewed {
        private publishedViewDom: viewDOM.abstract.ViewDOM;
        protected get markup(): viewDOM.abstract.ViewDOM { return this.publishedViewDom; }

        async display(selector: string) {
            if (history.is(this.constructor) && arguments.length == 1)
                runtime.appSettings.router.route({
                    params: arguments[1],
                    url: routing.urlFromCtor(this.constructor, arguments[1]),
                    ctor: this.constructor as any,
                    selector: selector,
                    restore: arguments.length < 3,
                    executable: 'display'
                });

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