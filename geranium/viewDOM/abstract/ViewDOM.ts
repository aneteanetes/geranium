module geranium.viewDOM.abstract {
    export abstract class ViewDOM implements viewDOM.interfaces.IViewDOM {
        private _view: view.abstract.View;
        get view(): view.abstract.View {
            return this._view;
        }
        constructor(view: view.abstract.View) {
            this._view = view;
        }
        abstract getViewDOM<T>(): T;
    }
}