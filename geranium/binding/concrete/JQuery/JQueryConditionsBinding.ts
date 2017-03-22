namespace geranium.binding.native {
    export class JQueryConditionsBinding extends binding.abstract.Binding<JQuery> {
        detection(DOMObject: JQuery): JQuery[] {
            var elements: JQuery[] = [];

//            DOMObject.ea


            return elements;
        }

        binding(DOMObject: JQuery, model: any) { }
        clear(DOMObject: JQuery) {

        }
    }
}