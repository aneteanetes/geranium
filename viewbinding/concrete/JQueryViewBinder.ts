namespace geranium.viewbinding {
    export class JQueryViewBinder extends abstract.ViewBinder {
        protected binding(ViewDOM: viewDOM.abstract.ViewDOM, binding: { new <T>(...args: any[]): binding.abstract.Binding<T> }): Promise<void> {
            var _binding = new binding<JQuery>();
            return _binding.bind(ViewDOM.getViewDOM<JQuery>(), ViewDOM.view.data);
        }
    }
}