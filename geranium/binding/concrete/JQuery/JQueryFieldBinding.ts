namespace geranium.binding.JQueryBindings {
    export class JQueryFieldBinding extends base.JQueryByAttributeBinding {
        get attribute(): string { return 'data-field'; }
        binding(DOMObject: JQuery, model: any) {
            let value = DOMObject.attr(this.attribute);
            runtime.reflection.Property.redefine(model, value,
                (val) => val,
                (val) => {
                    return val;
                });
            var event = "#event:set[" + value + "]";
            model[event].bind = () => {
                DOMObject.html(model[value]);
            };
        }
    }
}