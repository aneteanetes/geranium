import { IViewRenderer } from "../../interfaces/IViewRenderer";
import { ArrayHelper } from "../../../declare/array";
import { Class } from "../../../reflection/Class";
import { IViewEngine } from "../../interfaces/IViewEngine";
import { toHtmlArray } from "../../../extensions/HtmlElementExtensions";
import { IViewable } from "../../../view/interfaces/IViewable";
import { Model } from "../../../models/Model";
import GeraniumApp from "../../../runtime/concrete/App";

export class PropertyRenderer extends IViewRenderer {
    propertyRegex: RegExp = /\[.*?\]/g;
    fields: string[] = [];

    render<T extends Model>(elements: HTMLElement[], model: T): HTMLElement[] {
        elements.forEach(DOMObject => {
            this.fields.push(...(DOMObject.innerHTML.match(/\[.*?\]/g) || []));
        });
        if (this.fields.length == 0) {
            return elements;
        }

        this.fields = ArrayHelper.removeSame(this.fields);

        const selectedElements: Array<HTMLElement> = [];
        this.fields.forEach(field => {
            elements.forEach(DOMObject => {
                selectedElements.push(... this.queryXPath(DOMObject, field));
            });
        });

        elements.forEach(async element => (await this.binding(element, model)));

        return elements;
    }

    async binding(DOMObject: HTMLElement, model: Model): Promise<void> {
        const fields = DOMObject.innerText.match(this.propertyRegex);
        fields.forEach(async field => {
            const property = model[field.substring(1, field.length - 1)];
            if (property instanceof Array) {
                await this.renderArray(property, DOMObject, field);
            } else if (property) {
                await this.internalRender(property, DOMObject, field);
            }
        })
    }

    private async renderArray(property: Array<any>, DOMObject: HTMLElement, field: string) {
        let fieldsExpanded = "";
        for (let index = 0; index < property.length; index++) {
            fieldsExpanded += "[" + index + "]";
        }
        this.replaceTextNode(DOMObject, field, [document.createTextNode(fieldsExpanded) as any]);
        property.forEach(async (prop, index) => { await this.internalRender(prop, DOMObject, "[" + index + "]"); });
    }

    private async internalRender(property: any, DOMObject: HTMLElement, field: string) {
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
        if (textNode)
            target.forEach(targetNode => {
                if (textNode.textContent.trim() == text) {
                    root.replaceChild(targetNode, textNode);
                } else {
                    const propsStrings = textNode.textContent.match(this.propertyRegex);
                    if (propsStrings.length > 1) {
                        textNode.textContent = textNode.textContent.replace(text, "");
                        if (textNode.nextSibling) {
                            debugger;
                            textNode.parentNode.insertBefore(targetNode, textNode.nextSibling);
                        } else {
                            textNode.parentNode.insertBefore(targetNode, textNode);
                        }
                    } else {
                        textNode.textContent = textNode.textContent.replace(text, targetNode.innerHTML || targetNode.textContent);
                    }
                }
            });
    }

    private queryXPath(node: Node, field: string): HTMLElement[] {
        const elements: Array<HTMLElement> = [];
        const xpath = document.evaluate("//*[text()[contains(.,'" + field + "')]]", node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (let index = 0; index < xpath.snapshotLength; index++) {
            elements.push(xpath.snapshotItem(index) as HTMLElement);
        };

        return elements;
    }
}

class ViewModel extends IViewable { }