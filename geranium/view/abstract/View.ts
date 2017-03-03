module geranium.view.abstract {
    export abstract class View extends templating.contracts.Template {
        constructor(html: string) {
            super();
            this.html = html;
        }
        execute(): PromiseLike<string> {
            var templating = runtime.AppSettings.Current.templating;
            if (this.data == null)
                throw new exceptions.Exception('Model is not assigned!');
            return templating.parse(this);
        }
    }
}