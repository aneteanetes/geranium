namespace geranium.viewbinding.abstract {
    export abstract class ViewBinder implements interfaces.IViewBinder {
        private viewDOM: geranium.viewDOM.abstract.ViewDOM;
        async bind(context: viewbinding.contracts.BindContext): Promise<viewDOM.abstract.ViewDOM> {
            this.viewDOM = context.viewDOM;
            await this.exec(this.viewDOM, context.bindingFlags);
            this.valid(this.viewDOM);
            return this.viewDOM;
        }

        private valid(ViewDOM: viewDOM.abstract.ViewDOM) {
            var vm = (ViewDOM.view.data as viewmodels.abstract.ViewModel);
            if (vm.validators) {
                var validatedProperties = vm.validators.groupBy('validatedPropertyName');
                validatedProperties.forEach(validators => {
                    var previosSymbol = null;
                    validators.forEach(validator => {
                        runtime.reflection.Property.redefine(ViewDOM.view.data, validator.validatedPropertyName,
                            (val) => { return val; },
                            (val) => {
                                var validation = validator.validate(val);
                                if (!validation.success) {
                                    runtime.appSettings.validreport.report(ViewDOM, validation);
                                    return;
                                }
                                return val;
                            });
                    });
                });
            }
        }

        private async exec(ViewDOM: viewDOM.abstract.ViewDOM, bindings: { new <T>(...args: any[]): binding.abstract.Binding<T> }[]) {
            for (var i = 0; i < bindings.length; i++) {
                await this.binding(ViewDOM, bindings[i]);
            }
        }

        protected abstract binding(ViewDOM: viewDOM.abstract.ViewDOM, binding: { new <T>(...args: any[]): binding.abstract.Binding<T> }): Promise<void>;
    }
}