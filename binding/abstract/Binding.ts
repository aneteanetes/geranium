import { IBinding } from "../interfaces/IBinding";
import { ViewModel } from "../../viewmodels/abstract/ViewModel";

export abstract class Binding extends IBinding {
    async bind(DOM: HTMLElement[], model: ViewModel): Promise<void> {
        var DOMObjects = await this.detection(DOM);
        DOMObjects.forEach(async v => {
            await this.binding(v, model);
            await this.clear(v);
        });
    }

    abstract detection(DOMObject: HTMLElement[]): Promise<HTMLElement[]>;
    abstract binding(DOMObject: HTMLElement, model: any): Promise<void>;
    abstract clear(DOMObject: HTMLElement): Promise<void>;
}