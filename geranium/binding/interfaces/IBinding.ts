module geranium.binding.interfaces {
    export interface IBinding<T> {
        find(DOM: T, attribute: string): T[];
        clear(DOMObject: T);
        logic(DOMObject: T, model: any);
    }
}