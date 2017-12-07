import { IViewEngine } from "../interfaces/iviewengine";
import { ViewExecutingContext } from "../contracts/viewexecutingcontext";
import { ViewDOM } from "../../viewdom/abstract/viewdom";
import { ExecuteContext } from "../contracts/executecontext";
import { View } from "../../view/abstract/view";
import { IViewable } from "../../view/interfaces/IViewable";
import { ICoherenceContainer } from "../../coherence/interfaces/ICoherenceContainer";
import { BindContext } from "../../viewbinding/contracts/BindContext";
import { IViewBinder } from "../../viewbinding/interfaces/IViewBinder";

export abstract class ViewEngine implements IViewEngine {
    ["`container"]: ICoherenceContainer;

    async execute(context: ViewExecutingContext): Promise<ViewDOM> {
        var view = await IViewEngine.ViewEngineView(context.iViewed, context.selector);
        var viewDOM = this.viewDOM(view);

        var execCtx = new ExecuteContext(context);
        var bindingContext = new BindContext(viewDOM, execCtx.bindingFlags);

        var viewbinder = this["`container"].resolve(IViewBinder);
        await viewbinder.bind(bindingContext);

        return this.publish(viewDOM);
    }
    protected abstract publish(viewDOM: ViewDOM): Promise<ViewDOM>;
    protected abstract viewDOM(view: View): ViewDOM;
}