module geranium.binding.JQueryBindings.base {
    export abstract class JQueryByAttributeBinding extends abstract.Binding<JQuery> {
        clear(DOMObject: JQuery) {
            DOMObject.removeAttr(this.attribute());
        }
        find(DOM: JQuery, attribute: string): JQuery[] {
            return DOM.findAndfilter('[' + attribute + ']')
                .toArray()
                .map(x => $(x));
        }
    }
}