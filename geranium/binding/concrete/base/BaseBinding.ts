import { findAndFilter } from "../../../extensions/HtmlElementExtensions";
import { Binding } from "../../abstract/binding";

export abstract class BaseBinding extends Binding<HTMLElement> {
    abstract get attribute(): string;
    detection(DOM: HTMLElement): HTMLElement[] {
        return findAndFilter(DOM, this.attribute);
    }
}