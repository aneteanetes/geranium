module geranium.binding.JQueryBindings {
    export class JQueryFieldBinding extends base.JQueryByAttributeBinding {
        attribute(): string { return 'data-field'; }
        logic(DOMObject: JQuery, model: any) {
            let value = DOMObject.attr(this.attribute());
            var valSymbol = Symbol(value);

            model[valSymbol] = model[value];
            Object.defineProperty(model, value, {
                get: () => { return model[valSymbol]; },
                set: (val) => { DOMObject.html(val); model[valSymbol] = val; }
            });
        }
    }
}