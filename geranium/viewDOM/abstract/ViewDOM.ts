module geranium.viewDOM.abstract {
    export abstract class ViewDOM extends view.abstract.View implements viewDOM.interfaces.IViewDOM {
        abstract getViewDOM<T>(): T;
    }
}