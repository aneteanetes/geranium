import { IInjected } from "../../coherence/interfaces/IInjected";
import { ViewDOM } from "../../viewdom/abstract/viewdom";
import { ICoherenceContainer } from "../../coherence/interfaces/ICoherenceContainer";
import { ViewExecutingContext } from "../contracts/viewexecutingcontext";
import { InterfaceUsingException } from "../../exceptions/coherence/InterfaceUsingException";
import { IViewable } from "../../view/interfaces/IViewable";
import { View } from "../../view/abstract/view";

export class IViewEngine implements IInjected {
    ["`container"]: ICoherenceContainer;
    execute(context: ViewExecutingContext): Promise<ViewDOM> { throw new InterfaceUsingException("IViewEngine.execute"); }

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