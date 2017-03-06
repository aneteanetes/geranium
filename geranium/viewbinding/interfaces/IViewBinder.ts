module geranium.viewbinding.interfaces {
    export interface IViewBinder {
        bind(context: viewbinding.contracts.BindContext): viewDOM.abstract.ViewDOM;
    }
}