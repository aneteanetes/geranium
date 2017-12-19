import { IBinding } from "../interfaces/IBinding";

export abstract class Binding<T> extends IBinding<T> {
    async bind(DOM: T, model: any): Promise<void> {
        var DOMObjects = await this.detection(DOM);
        DOMObjects.forEach(async v => {
            await this.binding(v, model);
            await this.clear(v);
        });
    }

    abstract detection(DOMObject: T): Promise<T[]>;
    abstract binding(DOMObject: T, model: any): Promise<void>;
    abstract clear(DOMObject: T): Promise<void>;
}