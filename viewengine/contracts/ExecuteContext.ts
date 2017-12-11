import { IViewable } from "../../view/interfaces/IViewable";
import { ViewExecutingContext } from "./viewexecutingcontext";
import { IBinding } from "../../binding/interfaces/ibinding";
import { Constructor } from "../../structures/Constructor";
import GeraniumApp from "../../runtime/concrete/App";

export class ExecuteContext {
    view: IViewable;
    selector: string;
    bindingFlags: IBinding<any>[];

    constructor(viewCtx: ViewExecutingContext, bindingFlags?: IBinding<any>[]) {
        this.view = viewCtx.iViewed;
        this.selector = viewCtx.selector;
        if (!bindingFlags) {
            bindingFlags = GeraniumApp.resolveAll(IBinding);
        }
        this.bindingFlags = bindingFlags;
    }
}