import { BaseByAttributeBinding } from "./base/BaseByAttributeBinding";
import { IBinding } from "../interfaces/ibinding";

export class JQueryCollectionBinding extends BaseByAttributeBinding {
    get attribute(): string { return 'data-multiple'; }

    async binding(DOMObject: JQuery, model: any) {
        var collection = model[DOMObject.attr(this.attribute)] as Array<any>;
        DOMObject.removeAttr(this.attribute);
        var DOMCollection = $();

        if (collection == undefined || collection.length == 0) {
            DOMObject.remove();
            return;
        }

        var tpl: string = DOMObject.outerHtml()
            .replaceAll('\\[\\[', '{{')
            .replaceAll('\\]\\]', '}}');

        let bindings = this["`container"].resolveAll(IBinding).filter(x => x.constructor.name != this.constructor.name);

        for (var i = 0; i < collection.length; i++) {
            Object.assign(model, collection[i]);
            model.view = function () {
                return tpl;
            };
            let _view = await this["`container"].resolve(IViewEngine) viewengine.abstract.ViewEngine.ViewEngineView(model, '');
            let viewDom = new viewDOM.JQueryViewDOM(_view);
            let ctx = new viewbinding.contracts.BindContext(viewDom, bindings);
            await runtime.appSettings.viewbinder.bind(ctx);

            DOMCollection = DOMCollection.add(viewDom.getViewDOM());
        }

        DOMObject.replaceWith(DOMCollection);
        DOMObject = DOMCollection;
    }
}