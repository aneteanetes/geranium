namespace geranium.viewbinding.contracts {
    export class BindContext {
        viewDOM: geranium.viewDOM.abstract.ViewDOM;
        bindingFlags: { new <T>(...args: any[]): binding.abstract.Binding<T> }[];

        constructor(viewDOM: geranium.viewDOM.abstract.ViewDOM, bindingFlags?: { new <T>(...args: any[]): binding.abstract.Binding<T> }[]) {
            this.viewDOM = viewDOM;
            if (!bindingFlags)
                bindingFlags = runtime.appSettings.bidnings;
            this.bindingFlags = bindingFlags;
        }
    }
}