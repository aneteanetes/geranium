module geranium.view.abstract {
    export abstract class View extends templating.contracts.Template {

        private _selector: string;
        private _rendered: boolean;

        constructor(selector: string) {
            super();
            this.html = this.declare();
            this._selector = selector;
        }

        get selector(): string {
            return this._selector;
        }

        protected abstract declare(): string;

        async render(): Promise<View> {
            var templating = runtime.AppSettings.Current.templating;
            if (this.data == null)
                throw new exceptions.Exception('view data is not assigned!');
            if (this._rendered)
                throw new exceptions.Exception('view already rendered!');

            this._rendered = true;
            this.html = await templating.parse(this);
            return new Promise<View>(resolve => resolve(this));
        }
    }
}