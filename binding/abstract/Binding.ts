import { IBinding } from "../interfaces/ibinding";

export abstract class Binding<T> extends IBinding<T> {
    async bind(DOM: T, model: any) {
        var DOMObjects = this.detection(DOM);
        DOMObjects.forEach(v => {
            this.binding(v, model);
            this.clear(v);
        });
    }

    abstract detection(DOMObject: T): T[];
    abstract binding(DOMObject: T, model: any);
    abstract clear(DOMObject: T);
}