import { BaseByAttributeBinding } from "./base/BaseByAttributeBinding";
import { IBinding } from "../interfaces/ibinding";
import { IViewEngine } from "../../viewengine/interfaces/IViewEngine";
import { BindContext } from "../../viewbinding/contracts/BindContext";
import { IViewBinder } from "../../viewbinding/interfaces/IViewBinder";
import { StringHelper } from "../../declare/string";

export class BaseCollectionBinding extends BaseByAttributeBinding {
    get attribute(): string { return 'data-multiple'; }

    async binding(DOMObject: HTMLElement, model: any) {
        var collection = model[DOMObject.getAttribute(this.attribute)] as Array<any>;
        DOMObject.removeAttribute(this.attribute);
        const DOMCollection: HTMLElement = new HTMLElement();

        if (collection == undefined || collection.length == 0) {
            DOMObject.remove();
            return;
        }

        var tpl: string = StringHelper.replaceAll(
            StringHelper.replaceAll(DOMObject.outerHTML, '\\[\\[', '{{'),
            '\\]\\]', '}}');

        let bindings = this["`container"].resolveAll(IBinding).filter(x => x.constructor.name != this.constructor.name);

        for (var i = 0; i < collection.length; i++) {
            Object.assign(model, collection[i]);
            model.view = function () {
                return tpl;
            };
            let _view = await IViewEngine.ViewEngineView(model, '');
            let ctx = new BindContext(_view, bindings);
            await this["`container"].resolve(IViewBinder).bind(ctx);

            DOMCollection.appendChild(await _view.DOM());
        }

        DOMObject.parentNode.replaceChild(DOMCollection, DOMObject);
        DOMObject = DOMCollection;
    }
}