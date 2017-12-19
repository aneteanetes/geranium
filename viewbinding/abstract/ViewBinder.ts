import { BindContext } from "../contracts/BindContext";
import { IViewBinder } from "../interfaces/IViewBinder";
import { IBinding } from "../../binding/interfaces/IBinding";
import { Property } from "../../reflection/Property";
import { Model } from "../../models/Model";
import { IValidatingReporter } from "../../validating/reporter/interfaces/IValidatatingReporter";
import { ViewModel } from "../../viewmodels/abstract/ViewModel";
import { ArrayHelper } from "../../declare/array";
import { ViewDOM } from "../../viewDOM/abstract/ViewDOM";
import GeraniumApp from "../../runtime/concrete/App";

export abstract class ViewBinder extends IViewBinder {
    async bind(context: BindContext): Promise<HTMLElement[]> {
        const bindedDOM = await this.exec(context.viewDOM, context.bindingFlags);
        this.valid(bindedDOM, context.viewDOM.data);
        return bindedDOM;
    }

    private valid(DOM: HTMLElement[], data: any) {
        var vm = (data as ViewModel);
        if (vm.validators) {
            var validatedProperties = ArrayHelper.groupBy(vm.validators, 'validatedPropertyName');
            validatedProperties.forEach(validators => {

                var validProp = validators[0].validatedPropertyName;
                Property.redefine(data, validProp,
                    (val) => { return val; },
                    function (val) {

                        let validationFault: boolean = false;
                        (this as Model).validators.filter(x => x.validatedPropertyName === validProp).forEach(validator => {
                            var validation = validator.validate(val, this.clone());
                            if (!validation.success) {
                                validationFault = true;
                                GeraniumApp.resolve(IValidatingReporter).report(DOM, validation);
                            }
                        });

                        return validationFault ? undefined : val;
                    });
            });
        }
    }

    private async exec(ViewDOM: ViewDOM, bindings: IBinding<any>[]): Promise<HTMLElement[]> {
        let dom = await ViewDOM.DOM();
        for (var i = 0; i < bindings.length; i++) {
            await this.binding(dom, ViewDOM.data, bindings[i]);
        }
        return dom;
    }

    protected abstract binding(DOM: HTMLElement[], data: any, binding: IBinding<any>): Promise<void>;
}