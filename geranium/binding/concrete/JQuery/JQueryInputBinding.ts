module geranium.binding.JQueryBindings {
    export class JQueryInputBinding extends base.JQueryBinding {
        get attribute(): string { return 'input'; }
        binding(DOMObject: JQuery, model: any) {
            let value = DOMObject.attr('name');
            var defined =                runtime.reflection.Property.define(model, value,
                (val) => val,
                (val) => {
                    DOMObject.html(val);
                    return val;
                });
            DOMObject.change(x => {
                model[defined.indexer] = DOMObject.val();
            });
        }
        clear() { }
    }
}