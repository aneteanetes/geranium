import { ViewBinder } from "../abstract/ViewBinder";
import { IBinding } from "../../binding/interfaces/IBinding";
import { Binding } from "../../binding/abstract/Binding";
import { ViewDOM } from "../../viewDOM/abstract/ViewDOM";
import { ViewModel } from "../../viewmodels/abstract/ViewModel";

export class BaseViewBinder extends ViewBinder {
    protected async binding(DOM: HTMLElement[], data: ViewModel, binding: IBinding): Promise<void> {
        return binding.bind(DOM, data);
    }
}