import { BaseByAttributeBinding } from "./base/BaseByAttributeBinding";
import { Property } from "../../reflection/Property";
import { Model } from "../../models/Model";

export class BaseFieldBinding extends BaseByAttributeBinding {
    get attribute(): string { return 'data-field'; }
    async binding(DOMObject: HTMLElement, model: Model): Promise<void> {
        let value = DOMObject.getAttribute(this.attribute);
        Property.redefine(model, value,
            (val) => val,
            (val) => {
                return val;
            });
        var event = "#event:set[" + value + "]";
        if (model[event]) {
            model[event].bind = () => {
                DOMObject.innerHTML = model[value];
            };
        }
    }
}