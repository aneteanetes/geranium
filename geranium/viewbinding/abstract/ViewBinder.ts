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

                    var validProp = validators[0].validatedPropertyName;
                    runtime.reflection.Property.redefine(ViewDOM.view.data, validProp,
                        (val) => { return val; },
                        function (val) {

                            let validationFault: boolean = false;
                            (this as models.abstract.Model).validators.filter(x => x.validatedPropertyName === validProp).forEach(validator => {
                                var validation = validator.validate(val, this.clone());
                                if (!validation.success) {
                                    validationFault = true;
                                    runtime.appSettings.validreport.report(ViewDOM, validation);
                                }
                            });

                            return validationFault ? undefined : val;
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