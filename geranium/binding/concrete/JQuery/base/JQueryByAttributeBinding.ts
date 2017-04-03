namespace geranium.binding.JQueryBindings.base {
    export abstract class JQueryByAttributeBinding extends JQueryBinding {
        clear(DOMObject: JQuery) {
            DOMObject.removeAttr(this.attribute);
        }
        detection(DOM: JQuery): JQuery[] {
            return DOM.findAndfilter('[' + this.attribute + ']')
                .toArray()
                .map(x => $(x));
        }
    }
}