module geranium.viewengine.contracts {
    export class ExecuteContext {
        view: view.abstract.View;
        bindingFlags: { new <T>(...args: any[]): binding.abstract.Binding<T> }[];

        constructor(view: view.abstract.View, bindingFlags?: { new <T>(...args: any[]): binding.abstract.Binding<T> }[]) {
            this.view = view;
            if (!bindingFlags)
                bindingFlags = runtime.AppSettings.Current.bidnings;
            debugger;
            this.bindingFlags = bindingFlags;
        }
    }
}