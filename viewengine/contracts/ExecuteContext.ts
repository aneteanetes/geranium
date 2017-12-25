import { IViewable } from "../../view/interfaces/IViewable";
import { ViewExecutingContext } from "./ViewExecutingContext";
import { IBinding } from "../../binding/interfaces/IBinding";
import { Constructor } from "../../structures/Constructor";
import GeraniumApp from "../../runtime/concrete/App";

export class ExecuteContext {
    view: IViewable;
    selector: string;
    bindingFlags: IBinding[];

    constructor(viewCtx: ViewExecutingContext, bindingFlags?: IBinding[]) {
        this.view = viewCtx.iViewed;
        this.selector = viewCtx.selector;
        if (!bindingFlags) {
            bindingFlags = GeraniumApp.resolveAll(IBinding);
        }
        this.bindingFlags = bindingFlags;
    }
}