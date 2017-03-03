module geranium.view.abstract {
    export abstract class View extends templating.contracts.Template {
        constructor() {
            super();
            this.html = this.declare();
        }
        protected abstract declare(): string;
        async execute(insideTarget: JQuery) {
            var templating = runtime.AppSettings.Current.templating;
            if (this.data == null)
                throw new exceptions.Exception('view-template data is not assigned!');
            var rendred = await templating.parse(this);
            insideTarget.html(rendred);
        }
    }
}