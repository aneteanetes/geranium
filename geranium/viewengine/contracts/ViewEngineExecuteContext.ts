module geranium.viewengine.contracts {
    export class ViewEngineExecuteContext {
        view: view.abstract.View;
        bindingFlags: viewbinding.contracts.ViewBindingFlags[]

        constructor(view: view.abstract.View, bindingFlags: viewbinding.contracts.ViewBindingFlags[]) {
            this.view = view;
            this.bindingFlags = bindingFlags;
        }
    }
}