import { Binding } from "../../binding/abstract/Binding";
import GeraniumApp from "../../runtime/concrete/App";
import { IBinding } from "../../binding/interfaces/IBinding";
import { ViewDOM } from "../../viewDOM/abstract/ViewDOM";
import { Model } from "../../models/Model";

export class BindContext {
    model: Model;
    dom: HTMLElement[];
    bindingFlags: IBinding[];

    constructor(dom: HTMLElement[], data: Model, bindingFlags?: IBinding[]) {
        this.dom = dom;
        this.model = data;
        if (!bindingFlags) {
            bindingFlags = GeraniumApp.resolveAll(IBinding);
        }
        this.bindingFlags = bindingFlags;
    }
}