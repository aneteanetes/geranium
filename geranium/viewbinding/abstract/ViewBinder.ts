module geranium.viewbinding.abstract {
    export abstract class ViewBinder implements interfaces.IViewBinder {
        private viewDOM: geranium.viewDOM.abstract.ViewDOM;
        bind(context: viewbinding.contracts.BindContext): viewDOM.abstract.ViewDOM {
            debugger;
            this.viewDOM = context.viewDOM;
            this.bindByFlags(context.bindingFlags);
            return this.viewDOM;
        }

        private bindByFlags(flags: contracts.ViewBindingFlags[]) {

            if (flags.indexOf(contracts.ViewBindingFlags.Fields) > -1)
                this.bindFields(this.viewDOM);

            if (flags.indexOf(contracts.ViewBindingFlags.Properties) > -1)
                this.bindProperties(this.viewDOM);

            if (flags.indexOf(contracts.ViewBindingFlags.Methods) > -1)
                this.bindMethods(this.viewDOM);
        }
        protected abstract bindFields(ViewDOM: viewDOM.abstract.ViewDOM);
        protected abstract bindProperties(ViewDOM: viewDOM.abstract.ViewDOM);
        protected abstract bindMethods(ViewDOM: viewDOM.abstract.ViewDOM);
    }
}