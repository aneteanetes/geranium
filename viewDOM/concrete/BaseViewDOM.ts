import { ViewDOM } from "../abstract/viewdom";

export class BaseViewDOM extends ViewDOM {
    private _html: HTMLElement;

    getViewDOM() {
        if (this._html == null) {
            let div = document.createElement("div");
            div.innerHTML = this.view.html;
            this._html = div;
        }
        return this._html as any;
    }
}