import { ViewBinder } from "../abstract/ViewBinder";
import { IBinding } from "../../binding/interfaces/ibinding";
import { Binding } from "../../binding/abstract/Binding";
import { ViewDOM } from "../../viewDOM/abstract/ViewDOM";

export class BaseViewBinder extends ViewBinder {
    protected async binding(view: ViewDOM, binding: IBinding<any>): Promise<void> {
        return binding.bind(view.DOM(), view.data);
    }
}