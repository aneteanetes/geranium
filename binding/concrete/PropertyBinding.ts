import { Binding } from "../abstract/Binding";
import { Class } from "../../reflection/Class";
import { findAndFilter, toHtmlArray } from "../../extensions/HtmlElementExtensions";
import { PropertyInfo } from "../../reflection/Property";
import { ArrayHelper } from "../../declare/array";
import { IViewEngine } from "../../viewengine/interfaces/IViewEngine";
import GeraniumApp from "../../runtime/concrete/App";
import { IViewable } from "../../view/interfaces/IViewable";
import { promised } from "../../structures/Promised";
import { StringHelper } from "../../declare/string";

export class PropertyBinding extends Binding<HTMLElement> {
    fields: string[] = [];

    async detection(DOMObjects: HTMLElement[]): Promise<HTMLElement[]> {
        DOMObjects.forEach(DOMObject => {
            this.fields.push(...DOMObject.innerHTML.match(/\[.*?\]/g));
        });
        if (!this.fields) {
            return new Array<HTMLElement>();
        }
        this.fields = ArrayHelper.removeSame(this.fields);

        const elements: Array<HTMLElement> = [];
        this.fields.forEach(field => {
            DOMObjects.forEach(DOMObject => {
                elements.push(... this.queryXPath(DOMObject, field));
            })
        })

        return elements;
    }

    async binding(DOMObject: HTMLElement, model: any): Promise<void> {
        var regex = /\[.*?\]/g;
        const fields = DOMObject.innerText.match(regex);
        fields.forEach(async field => {
            const property = model[field.substring(1, field.length - 1)];
            if (Class.isAssignableFrom(ViewModel, property.constructor)) {
                await this.publish(DOMObject, property, field);
            } else {
                this.replaceTextNode(DOMObject, field, [document.createTextNode(property) as any]);
            }
        })
    }

    async clear(DOMObject: HTMLElement): Promise<void> { }

    private async publish(DOMObject: HTMLElement, property: ViewModel, field: string): Promise<void> {
        const dom = await GeraniumApp.resolve(IViewEngine).execute({
            iViewed: property,
            selector: ''
        });
        this.replaceTextNode(DOMObject, field, dom);
    }

    private replaceTextNode(root: HTMLElement, text: string, target: HTMLElement[]) {
        const allNodes = toHtmlArray(root.childNodes);
        const textNodes = allNodes.filter(x => {
            return x.nodeType == 3 && (x.textContent.trim() == text || x.textContent.includes(text));
        }) as Node[];
        textNodes.forEach(node => {
            target.forEach(targetNode => {
                if (node.textContent.trim() == text) {
                    root.replaceChild(targetNode, node);
                } else {
                    node.textContent = node.textContent.replace(text, targetNode.innerHTML || targetNode.textContent);
                }
            });
        });
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