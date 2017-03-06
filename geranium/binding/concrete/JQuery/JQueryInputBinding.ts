module geranium.binding.JQueryBindings {
    export class JQueryInputBinding extends base.JQueryBinding {
        attribute(): string { return 'input'; }
        logic(DOMObject: JQuery, model: any) {
            let value = DOMObject.attr('name');
            var valSymbol = Symbol(value);

            model[valSymbol] = model[value];
            Object.defineProperty(model, value, {
                get: () => { return model[valSymbol]; },
                set: (val) => { DOMObject.val(val); model[valSymbol] = val; }
            });
            DOMObject.change(x => {
                model[valSymbol] = DOMObject.val();
            });
        }
        clear() { }
    }
}