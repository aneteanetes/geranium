namespace geranium.binding.JQueryBindings {
    export class JQueryInputBinding extends base.JQueryBinding {
        get attribute(): string { return 'input'; }
        binding(DOMObject: JQuery, model: any) {
            let value = DOMObject.attr('name');
            runtime.reflection.Property.redefine(model, value,
                (val) => val,
                (val) => {
                    DOMObject.html(val);
                    return val;
                });
            var event = "#event:set[" + value + "]";
            if (model[event]) {
                model[event].bind = () => {
                    DOMObject.val(model[value]);
                };
            }
            DOMObject.change(x => {
                model[value] = DOMObject.val();
            });
        }
        clear() { }
    }
}