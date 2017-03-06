module geranium.binding.abstract {
    export abstract class Binding<T> implements interfaces.IBinding<T> {
        bind(DOM: T, model: any) {
            
            let attribute = this.attribute();
            var DOMObjects = this.find(DOM, attribute);
            DOMObjects.forEach(v => {
                this.logic(v, model);
                this.clear(v);
            });
        }

        abstract attribute(): string;
        abstract find(DOM: T, attribute: string): T[];
        abstract clear(DOMObject: T);
        abstract logic(DOMObject: T, model: any);
    }
}