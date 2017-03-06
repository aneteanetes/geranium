module geranium.viewengine.interfaces {
    export interface IViewEngine {
        execute(context: contracts.ExecuteContext): Promise<boolean>;
    }
}