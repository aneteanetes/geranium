module geranium.binding.interfaces {
    export interface IBinding<TDOM> {
        bind(objectDOM: TDOM, model: any);
    }
}