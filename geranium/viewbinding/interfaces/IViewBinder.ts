namespace geranium.viewbinding.interfaces {
    export interface IViewBinder {
        bind(context: viewbinding.contracts.BindContext): Promise<viewDOM.abstract.ViewDOM>;
    }
}