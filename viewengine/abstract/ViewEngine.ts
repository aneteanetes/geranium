import { IViewEngine } from "../interfaces/iviewengine";
import { ViewExecutingContext } from "../contracts/viewexecutingcontext";
import { ViewDOM } from "../../viewdom/abstract/viewdom";
import { ExecuteContext } from "../contracts/executecontext";
import { View } from "../../view/abstract/view";
import { IViewable } from "../../view/interfaces/IViewable";
import { ICoherenceContainer } from "../../coherence/interfaces/ICoherenceContainer";

export abstract class ViewEngine implements IViewEngine {
    ["`container"]: ICoherenceContainer;

    async execute(context: ViewExecutingContext): Promise<ViewDOM> {
        var view = await ViewEngine.ViewEngineView(context.iViewed, context.selector);
        var viewDOM = this.viewDOM(view);

        var execCtx = new ExecuteContext(context);
        var bindingContext = new BindContext(viewDOM, execCtx.bindingFlags);

        var viewbinder = runtime.appSettings.viewbinder;
        await viewbinder.bind(bindingContext);

        return this.publish(viewDOM);
    }
    protected abstract publish(viewDOM: ViewDOM): Promise<ViewDOM>;
    protected abstract viewDOM(view: View): ViewDOM;

    /**
     * return complete rendered view
     * @param selector
     */
    static ViewEngineView(iviewed: IViewable, selector: string): Promise<View> {
        var view: View;

        var viewctr = iviewed.view();
        if (typeof viewctr === "string") {
            let vmctr = EmptyView;
            view = new (vmctr as any)(selector, viewctr);
        }
        else
            view = new (viewctr as any)(selector);
        view.data = iviewed;
        return view.render();
    }
}

class EmptyView extends View {
    declare() { return undefined; }
}