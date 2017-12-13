import { Binding } from "../../binding/abstract/Binding";
import GeraniumApp from "../../runtime/concrete/App";
import { IBinding } from "../../binding/interfaces/ibinding";
import { View } from "../../view/abstract/view";

export class BindContext {
    view: View;
    bindingFlags: IBinding<any>[];

    constructor(view: View, bindingFlags?: IBinding<any>[]) {
        this.view = view;
        if (!bindingFlags) {
            bindingFlags = GeraniumApp.resolveAll(IBinding);
        }
        this.bindingFlags = bindingFlags;
    }
}