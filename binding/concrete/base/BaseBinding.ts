import { findAndFilter } from "../../../extensions/HtmlElementExtensions";
import { Binding } from "../../abstract/Binding";
import { promised } from "../../../structures/Promised";

export abstract class BaseBinding extends Binding {
    abstract get attribute(): string;
    detection(DOM: HTMLElement[]): Promise<HTMLElement[]> {
        return promised(findAndFilter(DOM, this.attribute));
    }
}