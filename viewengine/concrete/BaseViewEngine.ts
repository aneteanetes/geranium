import { ViewEngine } from "../abstract/ViewEngine";
import { ViewDOM } from "../../viewDOM/abstract/viewdom";
import { ILogger } from "../../exceptions/logging/interfaces/ILogger";
import { View } from "../../view/abstract/view";
import { BaseViewDOM } from "../../viewDOM/concrete/BaseViewDOM";

export class BaseViewEngine extends ViewEngine {
    protected publish(viewDOM: ViewDOM): Promise<ViewDOM> {
        return new Promise((resolve, reject) => {
            try {
                const selector = viewDOM.view.selector;
                const view = viewDOM.getViewDOM<HTMLElement>();
                let element = document.querySelector(selector);
                element.parentElement.replaceChild(view, element);
                resolve(viewDOM);
            } catch (ex) {
                this["`container"].resolve(ILogger).log(ex);
                reject(null);
            }
        });
    }
    protected viewDOM(view: View): ViewDOM {
        return new BaseViewDOM(view);
    }
}