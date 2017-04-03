namespace geranium.viewengine.interfaces {
    export interface IViewEngine {
        execute(context: contracts.ViewExecutingContext): Promise<viewDOM.abstract.ViewDOM>;
    }
}