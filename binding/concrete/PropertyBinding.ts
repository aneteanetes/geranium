import { Binding } from "../abstract/Binding";
import { Class } from "../../reflection/Class";
import { findAndFilter } from "../../extensions/HtmlElementExtensions";
import { PropertyInfo } from "../../reflection/Property";
import { ArrayHelper } from "../../declare/array";
import { IViewEngine } from "../../viewengine/interfaces/IViewEngine";
import GeraniumApp from "../../runtime/concrete/App";
import { IViewable } from "../../view/interfaces/IViewable";
import { promised } from "../../structures/Promised";
import { StringHelper } from "../../declare/string";

export class PropertyBinding extends Binding<HTMLElement> {
    fields: string[];

    detection(DOMObject: HTMLElement): Promise<HTMLElement[]> {
        this.fields = DOMObject.innerHTML.match(/\[.*?\]/g);
        this.fields = ArrayHelper.removeSame(this.fields);

        return promised(this.fields
            .map(field => this.queryXPath(DOMObject, field))
            .reduce((prev, next) => prev.concat(next)));
    }

    async binding(DOMObject: HTMLElement, model: any): Promise<void> {
        var regex = /\[.*?\]/g;
        const fields = DOMObject.innerText.match(regex);
        fields.forEach(async field => {
            const property = model[field.substring(1, field.length - 2)];
            if (Class.isAssignableFrom(ViewModel, property)) {
                await this.publish(DOMObject, property);
            } else if (property != null) {
                DOMObject.innerText = DOMObject.innerText.replace(field, property || '');
            }
        })
    }

    async clear(DOMObject: HTMLElement): Promise<void> { }

    private async publish(DOMObject: HTMLElement, property: ViewModel): Promise<void> {
        const dom = await GeraniumApp.resolve(IViewEngine).execute({
            iViewed: property,
            selector: ''
        });

        const shieldedField = StringHelper.replaceAll(
            StringHelper.replaceAll(DOMObject.innerHTML, "[", "\\["),
            "]", "\\]");

        const regex = new RegExp(shieldedField, "g");

        const count = DOMObject.innerHTML.match(regex).length;
        DOMObject.innerText.replace(regex, "");
        DOMObject.appendChild(dom);
    }

    private queryXPath(node: Node, field: string): HTMLElement[] {
        const elements: Array<HTMLElement> = [];

        const xpath = document.evaluate(`//*[contains(text(), "${field}")]`, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (let index = 0; index < xpath.snapshotLength; index++) {
            elements.push(xpath.snapshotItem(index) as HTMLElement);
        };

        return elements;
    }
}

class ViewModel extends IViewable { }