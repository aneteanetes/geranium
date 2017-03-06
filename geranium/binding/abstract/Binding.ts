module geranium.binding.abstract {
    export abstract class Binding<T> implements interfaces.IBinding<T> {
        bind(DOM: T, model: any) {
            let attribute = this.attribute();
            var DOMObjects = this.find(DOM, attribute);
            DOMObjects.forEach(v => {
                this.clear(v);
                this.logic(v, model);
            });
        }

        abstract attribute(): string;
        abstract find(DOM: T, attribute: string): T[];
        abstract clear(DOMObject: T);
        abstract logic(DOMObject: T, model: any);
    }
}