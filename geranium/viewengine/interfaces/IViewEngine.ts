namespace geranium.viewengine.interfaces {
    export interface IViewEngine {
        execute(context: contracts.ExecuteContext): Promise<viewDOM.abstract.ViewDOM>;
    }
}