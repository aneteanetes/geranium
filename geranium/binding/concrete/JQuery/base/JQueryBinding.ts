module geranium.binding.JQueryBindings.base {
    export abstract class JQueryBinding extends abstract.Binding<JQuery> {
        find(DOM: JQuery, attribute: string): JQuery[] {
            return DOM.findAndfilter(attribute)
                .toArray()
                .map(x => $(x));
        }
    }
}