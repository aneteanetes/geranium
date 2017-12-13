import { BindContext } from "../contracts/BindContext";
import { IViewBinder } from "../interfaces/IViewBinder";
import { IBinding } from "../../binding/interfaces/ibinding";
import { Property } from "../../reflection/Property";
import { Model } from "../../models/Model";
import { IValidatingReporter } from "../../validating/reporter/interfaces/IValidatatingReporter";
import { ViewModel } from "../../viewmodels/abstract/ViewModel";
import GeraniumApp from "../../runtime/concrete/App";
import { ArrayHelper } from "../../declare/array";
import { View } from "../../view/abstract/view";

export abstract class ViewBinder extends IViewBinder {
    private view: View;
    async bind(context: BindContext): Promise<View> {
        this.view = context.view;
        await this.exec(this.view, context.bindingFlags);
        this.valid(this.view);
        return this.view;
    }

    private valid(view: View) {
        var vm = (view.data as ViewModel);
        if (vm.validators) {
            var validatedProperties = ArrayHelper.groupBy(vm.validators, 'validatedPropertyName');
            validatedProperties.forEach(validators => {

                var validProp = validators[0].validatedPropertyName;
                Property.redefine(view.data, validProp,
                    (val) => { return val; },
                    function (val) {

                        let validationFault: boolean = false;
                        (this as Model).validators.filter(x => x.validatedPropertyName === validProp).forEach(validator => {
                            var validation = validator.validate(val, this.clone());
                            if (!validation.success) {
                                validationFault = true;
                                GeraniumApp.resolve(IValidatingReporter).report(view, validation);
                            }
                        });

                        return validationFault ? undefined : val;
                    });
            });
        }
    }

    private async exec(ViewDOM: View, bindings: IBinding<any>[]) {
        for (var i = 0; i < bindings.length; i++) {
            await this.binding(ViewDOM, bindings[i]);
        }
    }

    protected abstract binding(ViewDOM: View, binding: IBinding<any>): Promise<void>;
}