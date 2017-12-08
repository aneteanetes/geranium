﻿import { BaseBinding } from "./base/BaseBinding";
import { Property } from "../../reflection/Property";

export class BaseInputBinding extends BaseBinding {
    get attribute(): string { return 'input'; }
    binding(DOMObject: HTMLElement, model: any) {
        let value = DOMObject.getAttribute('name');
        Property.redefine(model, value,
            (val) => val,
            (val) => {
                DOMObject.innerHTML = val;
                return val;
            });
        var event = "#event:set[" + value + "]";
        if (model[event]) {
            model[event].bind = () => {
                DOMObject.nodeValue = model[value];
            };
        }
        DOMObject.addEventListener("change", e => {
            model[value] = DOMObject.nodeValue;
        });
    }
    clear() { }
}