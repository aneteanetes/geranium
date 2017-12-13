import { ViewEngine } from "../abstract/ViewEngine";
import { ViewDOM } from "../../viewDOM/abstract/viewdom";
import { ILogger } from "../../exceptions/logging/interfaces/ILogger";
import { ViewPublishContext } from "../contracts/ViewPublishContext";

export class BaseViewEngine extends ViewEngine {
    protected async publish(view: ViewPublishContext): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const selector = view.selector;
                const domLoaded = document.readyState === 'complete';

                let element = document.querySelector(selector);
                if (!element && !domLoaded) {
                    await this.domLoaded(selector, view.dom);
                } else if (domLoaded && !element) {
                    throw new Error("Selector does not exists: " + selector);
                } else {
                    element.parentElement.replaceChild(view.dom, element);
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