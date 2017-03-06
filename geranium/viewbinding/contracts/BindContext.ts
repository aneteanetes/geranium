module geranium.viewbinding.contracts {
    export class BindContext {
        viewDOM: geranium.viewDOM.abstract.ViewDOM;
        bindingFlags: viewbinding.contracts.ViewBindingFlags[]

        constructor(viewDOM: geranium.viewDOM.abstract.ViewDOM, bindingFlags: viewbinding.contracts.ViewBindingFlags[]) {
            this.viewDOM = viewDOM;
            this.bindingFlags = bindingFlags;
        }
    }
}