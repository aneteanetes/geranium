import { ViewBinder } from "../abstract/ViewBinder";
import { ViewDOM } from "../../viewDOM/abstract/viewdom";
import { IBinding } from "../../binding/interfaces/ibinding";
import { Binding } from "../../binding/abstract/Binding";

export class BaseViewBinder extends ViewBinder {
    protected binding(ViewDOM: ViewDOM, binding: IBinding<any>): Promise<void> {
        return binding.bind(ViewDOM.getViewDOM<HTMLElement>(), ViewDOM.view.data);
    }
}