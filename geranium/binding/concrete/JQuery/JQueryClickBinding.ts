module geranium.binding.JQueryBindings {
    export class JQueryClickBinding extends base.JQueryByAttributeBinding {
        attribute(): string { return 'onclick'; }
        logic(DOMObject: JQuery, model: any) {
            let value = DOMObject.attr(this.attribute());

            if (model[value] != null)
                if (typeof model[value] == 'function')
                    DOMObject.click(x => { model[value](); });
        }
    }
}