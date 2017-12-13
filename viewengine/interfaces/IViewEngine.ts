import { IInjected } from "../../coherence/interfaces/IInjected";
import { ViewDOM } from "../../viewdom/abstract/ViewDOM";
import { ICoherenceContainer } from "../../coherence/interfaces/ICoherenceContainer";
import { ViewExecutingContext } from "../contracts/ViewExecutingContext";
import { InterfaceUsingException } from "../../exceptions/coherence/InterfaceUsingException";
import { IViewable } from "../../view/interfaces/IViewable";
import { View } from "../../view/abstract/View";
import GeraniumApp from "../../runtime/concrete/App";

export class IViewEngine implements IInjected {
    ["`container"]: ICoherenceContainer;
    execute(context: ViewExecutingContext): Promise<void> { throw new InterfaceUsingException("IViewEngine.execute"); }

    /**
     * return complete rendered view
     * @param selector
     */
    static ViewEngineView(iviewed: IViewable, selector: string): Promise<View> {
        var view: View;

        var viewctr = iviewed.view();
        if (typeof viewctr === "string") {
            view = GeraniumApp.instantiate(EmptyView, [selector, viewctr]);
        } else if (!!viewctr["%selector"]) {
            view = GeraniumApp.instantiate(viewctr, [selector]);
        } else {
            view = GeraniumApp.instantiate(viewctr);
        }
        view.data = iviewed;
        return view.render();

    }
}

enum ViewMode {
    HtmlTemplate,
    View,
    DOM
}

class EmptyView extends View {
    declare() { return undefined; }
}