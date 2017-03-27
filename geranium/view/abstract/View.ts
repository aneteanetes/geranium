namespace geranium.view.abstract {
    export abstract class View extends templating.contracts.Template {

        private _selector: string;
        private _rendered: boolean;

        constructor(selector: string) {
            super();
            this.protectRender(arguments[1]);
            this._selector = selector;
        }

        get selector(): string {
            return this._selector;
        }

        protected abstract declare(): string;
        protectRender(html: string) {
            this.html = this.declare();
            if (!this.html)
                this.html = html;
            if (!this.html)
                throw new exceptions.Exception('view template is empty!');
        }

        async render(): Promise<View> {
            var templating = runtime.appSettings.templating;
            if (this.data == null)
                throw new exceptions.Exception('view data is not assigned!');
            if (this._rendered)
                throw new exceptions.Exception('view already rendered!');
            
            this.html = await templating.parse(this);
            this._rendered = true;
            return new Promise<View>(resolve => resolve(this));
        }
    }
}