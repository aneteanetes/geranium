import Binding = geranium.binding.JQueryBindings.base.JQueryByAttributeBinding;

class CollectionBinding extends Binding {
    get attribute(): string { return 'collection-binding'; }
    async binding(DOMObject: JQuery, model: any) {
        var collection = model[DOMObject.attr(this.attribute)] as Array<any>;
        var DOMCollection = $();

        for (var i = 0; i < collection.length; i++) {
            var template = new geranium.templating.contracts.Template();
            template.html = DOMObject.outerHtml().replaceAll('\\[\\[', '{{').replaceAll('\\]\\]', '}}');
            template.data = collection[i];
            var templating = appSettings.Current.templating;
            var parsed = await templating.parse(template);
            DOMCollection= DOMCollection.add($(parsed));
        }
        DOMObject.replaceWith(DOMCollection)
        $('.collapsible').collapsible();
    }
}