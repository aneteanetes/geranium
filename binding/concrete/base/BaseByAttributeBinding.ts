import { BaseBinding } from "./BaseBinding";
import { findAndFilter } from "../../../extensions/HtmlElementExtensions";

export abstract class BaseByAttributeBinding extends BaseBinding {
    clear(DOMObject: HTMLElement) {
        DOMObject.removeAttribute(this.attribute);
    }
    detection(DOM: HTMLElement): HTMLElement[] {
        return findAndFilter(DOM, '[' + this.attribute + ']');
    }
}