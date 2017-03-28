namespace geranium.binding.JQueryBindings {
    export class JQueryCollectionBinding extends JQueryBindings.base.JQueryByAttributeBinding {
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

            let bindings = runtime.appSettings.bidnings.filter(x => x.name != this.constructor.name);            

            for (var i = 0; i < collection.length; i++) {                
                Object.assign(model, collection[i]);
                model.view = function () {
                    return tpl;
                };
                let _view = await viewengine.abstract.ViewEngine.ViewEngineView(model, '');
                let viewDom = new viewDOM.JQueryViewDOM(_view);
                let ctx = new viewbinding.contracts.BindContext(viewDom, bindings);
                await runtime.appSettings.viewbinder.bind(ctx);
                debugger;
                DOMCollection = DOMCollection.add(viewDom.getViewDOM());
            }

            DOMObject.replaceWith(DOMCollection);
            DOMObject = DOMCollection;
        }
    }
}