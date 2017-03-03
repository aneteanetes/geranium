module geranium.view.abstract {
    export abstract class View extends templating.contracts.Template {
        private target: JQuery;
        constructor(taget:JQuery) {
            super();
            this.html = this.declare();
            this.target = taget;
        }
        protected abstract declare(): string;

        async execute() {
            var templating = runtime.AppSettings.Current.templating;
            if (this.data == null)
                throw new exceptions.Exception('view-template data is not assigned!');
            var rendred = await templating.parse(this);
            this.target.html(rendred);
        }
    }
}