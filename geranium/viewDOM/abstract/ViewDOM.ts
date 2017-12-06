import { IViewDOM } from "../interfaces/IViewDOM";
import { View } from "../../view/abstract/view";

export abstract class ViewDOM implements IViewDOM {
    private _view: View;

    constructor(view: View) {
        this._view = view;
    }

    get view(): View {
        return this._view;
    }

    abstract getViewDOM<T>(): T;
}