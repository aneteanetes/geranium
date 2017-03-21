namespace geranium.binding.JQueryBindings.base {
    export abstract class JQueryBinding extends abstract.Binding<JQuery> {
        abstract get attribute(): string;
        detection(DOM: JQuery): JQuery[] {
            return DOM.findAndfilter(this.attribute)
                .toArray()
                .map(x => $(x));
        }
    }
}