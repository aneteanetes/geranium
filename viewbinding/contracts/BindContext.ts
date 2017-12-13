import { Binding } from "../../binding/abstract/Binding";
import GeraniumApp from "../../runtime/concrete/App";
import { IBinding } from "../../binding/interfaces/ibinding";
import { ViewDOM } from "../../viewDOM/abstract/ViewDOM";

export class BindContext {
    viewDOM: ViewDOM;
    bindingFlags: IBinding<any>[];

    constructor(viewDOM: ViewDOM, bindingFlags?: IBinding<any>[]) {
        this.viewDOM = viewDOM;
        if (!bindingFlags) {
            bindingFlags = GeraniumApp.resolveAll(IBinding);
        }
        this.bindingFlags = bindingFlags;
    }
}