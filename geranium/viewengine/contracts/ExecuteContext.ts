namespace geranium.viewengine.contracts {
    export class ExecuteContext {
        view: view.interfaces.IViewed;
        selector: string;
        bindingFlags: { new <T>(...args: any[]): binding.abstract.Binding<T> }[];

        constructor(viewCtx: ViewExecutingContext, bindingFlags?: { new <T>(...args: any[]): binding.abstract.Binding<T> }[]) {
            this.view = viewCtx.iViewed;
            this.selector = viewCtx.selector;
            if (!bindingFlags)
                bindingFlags = runtime.appSettings.bidnings;
            this.bindingFlags = bindingFlags;
        }
    }
}