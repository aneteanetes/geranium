import { BaseByAttributeBinding } from "./base/BaseByAttributeBinding";
import { IBinding } from "../interfaces/ibinding";
import { BaseViewDOM } from "../../viewDOM/concrete/BaseViewDOM";

export class BaseCollectionBinding extends BaseByAttributeBinding {
    get attribute(): string { return 'data-multiple'; }

    async binding(DOMObject: HTMLElement, model: any) {
        var collection = model[DOMObject.getAttribute(this.attribute)] as Array<any>;
        DOMObject.removeAttribute(this.attribute);
        var DOMCollection = $();

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
            let _view = await this["`container"].resolve(viewengine) viewengine.abstract.ViewEngine.ViewEngineView(model, '');
            let viewDom = new BaseViewDOM(_view);
            let ctx = new BindContext(viewDom, bindings);
            await runtime.appSettings.viewbinder.bind(ctx);

            DOMCollection = DOMCollection.add(viewDom.getViewDOM());
        }

        DOMObject.(DOMCollection);
        DOMObject = DOMCollection;
    }
}