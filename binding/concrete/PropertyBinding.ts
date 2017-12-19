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
    propertyRegex: RegExp = /\[.*?\]/g;
    fields: string[] = [];

    async detection(DOMObjects: HTMLElement[]): Promise<HTMLElement[]> {
        DOMObjects.forEach(DOMObject => {
            this.fields.push(...DOMObject.innerHTML.match(/\[.*?\]/g));
        });
        if (this.fields.length == 0) {
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
        const fields = DOMObject.innerText.match(this.propertyRegex);
        fields.forEach(async field => {
            const property = model[field.substring(1, field.length - 1)];
            if (property instanceof Array) {
                await this.renderArray(property, DOMObject, field);
            }
            await this.render(property, DOMObject, field)
        })
    }

    async clear(DOMObject: HTMLElement): Promise<void> { }

    private async renderArray(property: Array<any>, DOMObject: HTMLElement, field: string) {
        let fieldsExpanded = "";
        for (let index = 0; index < property.length; index++) {
            fieldsExpanded += `[${index}]`;
        }
        this.replaceTextNode(DOMObject, field, [document.createTextNode(fieldsExpanded) as any]);
        property.forEach(async (prop, index) => { await this.render(prop, DOMObject, `[${index}]`); });
    }

    private async render(property: any, DOMObject: HTMLElement, field: string) {
        if (Class.isAssignableFrom(ViewModel, property.constructor)) {
            await this.publish(DOMObject, property, field);
        } else {
            await this.replaceTextNode(DOMObject, field, [document.createTextNode(property) as any]);
        }
    }

    private async publish(DOMObject: HTMLElement, property: ViewModel, field: string): Promise<void> {
        const dom = await GeraniumApp.resolve(IViewEngine).execute({
            iViewed: property,
            selector: ''
        });
        this.replaceTextNode(DOMObject, field, dom);
    }

    private replaceTextNode(root: HTMLElement, text: string, target: HTMLElement[]) {
        const allNodes = toHtmlArray(root.childNodes);
        const textNode = allNodes.find(x => {
            return x.nodeType == 3 && (x.textContent.trim() == text || x.textContent.includes(text));
        }) as Node;
        target.forEach(targetNode => {
            if (textNode.textContent.trim() == text) {
                root.replaceChild(targetNode, textNode);
            } else {
                const propsStrings = textNode.textContent.match(this.propertyRegex);
                if (propsStrings.length > 1) {
                    textNode.textContent = textNode.textContent.replace(text, "");
                    textNode.parentNode.insertBefore(targetNode, textNode);
                } else {
                    textNode.textContent = textNode.textContent.replace(text, targetNode.innerHTML || targetNode.textContent);
                }
            }
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