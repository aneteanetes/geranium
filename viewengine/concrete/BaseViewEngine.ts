import { ViewEngine } from "../abstract/ViewEngine";
import { ViewDOM } from "../../viewDOM/abstract/viewdom";
import { ILogger } from "../../exceptions/logging/interfaces/ILogger";
import { View } from "../../view/abstract/view";

export class BaseViewEngine extends ViewEngine {
    protected async publish(view: View): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const selector = view.selector;
                const DOM = await view.DOM();
                const domLoaded = document.readyState === 'complete';
                let element = document.querySelector(selector);
                if (!element && !domLoaded) {
                    await this.domLoaded(selector, DOM);
                } else if (domLoaded && !element) {
                    throw new Error("Selector does not exists: " + selector);
                } else {
                    element.parentElement.replaceChild(DOM, element);
                }

                resolve();
            } catch (ex) {
                this["`container"].resolve(ILogger).log(ex);
                reject(ex);
            }
        });
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