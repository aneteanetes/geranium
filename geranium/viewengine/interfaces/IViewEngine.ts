module geranium.viewengine.interfaces {
    export interface IViewEngine {
        execute(context: contracts.ViewEngineExecuteContext): Promise<boolean>;
    }
}