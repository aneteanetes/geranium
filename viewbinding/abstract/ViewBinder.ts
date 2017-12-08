import { BindContext } from "../contracts/BindContext";
import { ViewDOM } from "../../viewDOM/abstract/viewdom";
import { IViewBinder } from "../interfaces/IViewBinder";
import { IBinding } from "../../binding/interfaces/ibinding";
import { Property } from "../../reflection/Property";
import { Model } from "../../models/Model";
import { IValidatingReporter } from "../../validating/reporter/interfaces/ivalidatatingreporter";
import { ViewModel } from "../../viewmodels/abstract/ViewModel";
import GeraniumApp from "../../runtime/concrete/App";
import { ArrayHelper } from "../../declare/array";

export abstract class ViewBinder extends IViewBinder {
    private viewDOM: ViewDOM;
    async bind(context: BindContext): Promise<ViewDOM> {
        this.viewDOM = context.viewDOM;
        await this.exec(this.viewDOM, context.bindingFlags);
        this.valid(this.viewDOM);
        return this.viewDOM;
    }

    private valid(ViewDOM: ViewDOM) {
        var vm = (ViewDOM.view.data as ViewModel);
        if (vm.validators) {
            var validatedProperties = ArrayHelper.groupBy(vm.validators, 'validatedPropertyName');
            validatedProperties.forEach(validators => {

                var validProp = validators[0].validatedPropertyName;
                Property.redefine(ViewDOM.view.data, validProp,
                    (val) => { return val; },
                    function (val) {

                        let validationFault: boolean = false;
                        (this as Model).validators.filter(x => x.validatedPropertyName === validProp).forEach(validator => {
                            var validation = validator.validate(val, this.clone());
                            if (!validation.success) {
                                validationFault = true;
                                GeraniumApp.container.resolve(IValidatingReporter).report(ViewDOM, validation);
                            }
                        });

                        return validationFault ? undefined : val;
                    });
            });
        }
    }

    private async exec(ViewDOM: ViewDOM, bindings: IBinding<any>[]) {
        for (var i = 0; i < bindings.length; i++) {
            await this.binding(ViewDOM, bindings[i]);
        }
    }

    protected abstract binding(ViewDOM: ViewDOM, binding: IBinding<any>): Promise<void>;
}