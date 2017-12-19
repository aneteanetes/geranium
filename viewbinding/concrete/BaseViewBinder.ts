import { ViewBinder } from "../abstract/ViewBinder";
import { IBinding } from "../../binding/interfaces/IBinding";
import { Binding } from "../../binding/abstract/Binding";
import { ViewDOM } from "../../viewDOM/abstract/ViewDOM";

export class BaseViewBinder extends ViewBinder {
    protected async binding(DOM: HTMLElement[], data: any, binding: IBinding<any>): Promise<void> {
        return binding.bind(DOM, data);
    }
}