import { BaseByAttributeBinding } from "./base/BaseByAttributeBinding";
import { IBinding } from "../interfaces/ibinding";
import { BaseViewDOM } from "../../viewDOM/concrete/BaseViewDOM";
import { IViewEngine } from "../../viewengine/interfaces/iviewengine";
import { BindContext } from "../../viewbinding/contracts/BindContext";
import { IViewBinder } from "../../viewbinding/interfaces/IViewBinder";

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

        var tpl: string = DOMObject.outerHTML
            .replaceAll('\\[\\[', '{{')
            .replaceAll('\\]\\]', '}}');

        let bindings = this["`container"].resolveAll(IBinding).filter(x => x.constructor.name != this.constructor.name);

        for (var i = 0; i < collection.length; i++) {
            Object.assign(model, collection[i]);
            model.view = function () {
                return tpl;
            };
            let _view = await IViewEngine.ViewEngineView(model, '');
            let viewDom = new BaseViewDOM(_view);
            let ctx = new BindContext(viewDom, bindings);
            await this["`container"].resolve(IViewBinder).bind(ctx);

            DOMCollection.appendChild(viewDom.getViewDOM());
        }

        DOMObject.parentNode.replaceChild(DOMCollection, DOMObject);
        DOMObject = DOMCollection;
    }
}