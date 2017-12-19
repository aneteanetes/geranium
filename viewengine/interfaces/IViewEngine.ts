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
    execute(context: ViewExecutingContext): Promise<HTMLElement> { throw new InterfaceUsingException("IViewEngine.execute"); }

    /**
     * return complete rendered view
     * @param selector
     */
    static async ViewEngineView(iviewed: IViewable, selector: string): Promise<ViewDOM> {
        var view: View | ViewDOM;

        var viewctr = iviewed.view();
        const isString = typeof viewctr === "string";
        if (isString || !!viewctr["declare"]) {
            const args: Array<any> = [selector];
            if (isString) {
                args.push(viewctr);
            }
            let instView = GeraniumApp.instantiate<View>(EmptyView, args);
            instView.data = iviewed;
            await instView.render();
            view = instView;
        } else {
            view = GeraniumApp.instantiate(viewctr);
        }
        view.data = iviewed;
        return view;
    }
}

class EmptyView extends View {
    declare() { return undefined; }
}