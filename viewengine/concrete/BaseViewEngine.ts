import { ViewEngine } from "../abstract/ViewEngine";
import { ViewDOM } from "../../viewDOM/abstract/viewdom";
import { ILogger } from "../../exceptions/logging/interfaces/ILogger";
import { View } from "../../view/abstract/view";
import { BaseViewDOM } from "../../viewDOM/concrete/BaseViewDOM";

export class BaseViewEngine extends ViewEngine {
    protected async publish(viewDOM: ViewDOM): Promise<ViewDOM> {
        return new Promise<ViewDOM>(async (resolve, reject) => {
            try {
                const selector = viewDOM.view.selector;
                const view = viewDOM.getViewDOM<HTMLElement>();
                const domLoaded = document.readyState === 'complete';
                let element = document.querySelector(selector);
                debugger;
                if (!element && !domLoaded) {
                    await this.domLoaded(selector, view);
                } else if (domLoaded && !element) {
                    throw new Error("Selector does not exists: " + selector);
                } else {
                    element.parentElement.replaceChild(view, element);
                }

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

    private async domLoaded(selector: string, view: HTMLElement): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            document.addEventListener("DOMContentLoaded", () => {
                let element = document.querySelector(selector);
                element.parentElement.replaceChild(view, element);
                resolve(true);
            });
        });
    }
}