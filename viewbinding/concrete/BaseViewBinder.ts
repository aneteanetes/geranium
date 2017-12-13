import { ViewBinder } from "../abstract/ViewBinder";
import { IBinding } from "../../binding/interfaces/ibinding";
import { Binding } from "../../binding/abstract/Binding";
import { View } from "../../view/abstract/view";

export class BaseViewBinder extends ViewBinder {
    protected async binding(view: View, binding: IBinding<any>): Promise<void> {
        return binding.bind(view.DOM(), view.data);
    }
}