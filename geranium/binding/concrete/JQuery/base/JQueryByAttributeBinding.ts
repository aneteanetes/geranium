module geranium.binding.JQueryBindings.base {
    export abstract class JQueryByAttributeBinding extends base.JQueryBinding {
        clear(DOMObject: JQuery) {
            DOMObject.removeAttr(this.attribute());
        }
    }
}