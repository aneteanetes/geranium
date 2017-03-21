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

            for (var i = 0; i < collection.length; i++) {
                var template = new geranium.templating.contracts.Template();
                template.html = DOMObject.outerHtml()
                    .replaceAll('\\[\\[', '{{')
                    .replaceAll('\\]\\]', '}}');
                template.data = collection[i];
                var templating = appSettings.templating;
                var parsed = await templating.parse(template);
                DOMCollection = DOMCollection.add($(parsed));
            }
            DOMObject.replaceWith(DOMCollection);
            DOMObject = DOMCollection;
        }
    }
}