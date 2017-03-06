module geranium.viewbinding.abstract {
    export abstract class ViewBinder implements interfaces.IViewBinder {
        private viewDOM: geranium.viewDOM.abstract.ViewDOM;
        bind(context: viewbinding.contracts.BindContext): viewDOM.abstract.ViewDOM {
            debugger;
            this.viewDOM = context.viewDOM;
            this.exec(this.viewDOM, context.bindingFlags);
            return this.viewDOM;
        }

        private exec(ViewDOM: viewDOM.abstract.ViewDOM, bindings: { new <T>(...args: any[]): binding.abstract.Binding<T> }[]) {
            bindings.forEach(x => {
                this.binding(ViewDOM, x);
            });
        }

        protected abstract binding(ViewDOM: viewDOM.abstract.ViewDOM, binding: { new <T>(...args: any[]): binding.abstract.Binding<T> });
    }
}