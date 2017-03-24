namespace geranium.binding.JQueryBindings {
    export class JQueryFieldBinding extends base.JQueryByAttributeBinding {
        get attribute(): string { return 'data-field'; }
        binding(DOMObject: JQuery, model: models.abstract.Model) {
            let value = DOMObject.attr(this.attribute);
            runtime.reflection.Property.redefine(model, value,
                (val) => val,
                (val) => {
                    return val;
                });
            var event = "#event:set[" + value + "]";
            if (model[event]) {
                model[event].bind = () => {
                    DOMObject.html(model[value]);
                };
                model.bind = () => {
                    model[event].raise();
                };
            }
        }
    }
}