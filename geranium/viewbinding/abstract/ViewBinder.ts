module geranium.viewbinding.abstract {
    export abstract class ViewBinder implements interfaces.IViewBinder {
        private viewDOM: geranium.viewDOM.abstract.ViewDOM;
        bind(context: viewbinding.contracts.BindContext): viewDOM.abstract.ViewDOM {            
            this.viewDOM = context.viewDOM;
            this.valid(this.viewDOM);
            this.exec(this.viewDOM, context.bindingFlags);
            return this.viewDOM;
        }

        private valid(ViewDOM: viewDOM.abstract.ViewDOM) {
            var vm = (ViewDOM.view.data as viewmodels.abstract.ViewModel);
            var validatedProperties = vm.validators.groupBy('validatedPropertyName');
            validatedProperties.forEach(validators => {
                var previosSymbol = null;
                validators.forEach(validator => {
                    previosSymbol = runtime.reflection.Property.define(ViewDOM.view.data,validator.validatedPropertyName,
                        (val) => { return val; },
                        (val) => {
                            debugger;
                            var validation = validator.validate(val);
                            if (!validation.success) {
                                runtime.AppSettings.Current.validreport.report(ViewDOM, validation);
                                return;
                            }
                            return val;
                        }, previosSymbol);
                });
            });
        }

        private exec(ViewDOM: viewDOM.abstract.ViewDOM, bindings: { new <T>(...args: any[]): binding.abstract.Binding<T> }[]) {
            bindings.forEach(x => {
                this.binding(ViewDOM, x);
            });
        }

        protected abstract binding(ViewDOM: viewDOM.abstract.ViewDOM, binding: { new <T>(...args: any[]): binding.abstract.Binding<T> });
    }
}