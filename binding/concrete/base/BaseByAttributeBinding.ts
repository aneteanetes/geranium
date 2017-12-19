import { BaseBinding } from "./BaseBinding";
import { findAndFilter } from "../../../extensions/HtmlElementExtensions";
import { promised } from "../../../structures/Promised";

export abstract class BaseByAttributeBinding extends BaseBinding {
    async clear(DOMObject: HTMLElement): Promise<void> {
        DOMObject.removeAttribute(this.attribute);
    }
    detection(DOM: HTMLElement): Promise<HTMLElement[]> {
        return promised(findAndFilter(DOM, '[' + this.attribute + ']'));
    }
}