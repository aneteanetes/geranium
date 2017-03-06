module geranium.viewbinding {
    export class JQueryViewBinder extends abstract.ViewBinder {
        private static DATAFIELD = '[data-field]';

        protected bindFields(ViewDOM: viewDOM.abstract.ViewDOM) {
            var DOM = ViewDOM.getViewDOM<JQuery>();
            DOM.findAndfilter(JQueryViewBinder.DATAFIELD).each((i, e) => {
                let $e = $(e);
                var field = $e.data('field');
                $e.removeAttr(JQueryViewBinder.DATAFIELD.replace('[', '').replace(']', ''));

                var fieldSymbol = Symbol(field);

                ViewDOM.view.data[fieldSymbol] = ViewDOM.view.data[field];
                Object.defineProperty(ViewDOM.view.data, field, {
                    get: () => { return ViewDOM.view.data[fieldSymbol]; },
                    set: (val) => { $e.html(val); ViewDOM.view.data[fieldSymbol] = val; }
                });
            });
        }
        protected bindProperties(ViewDOM: viewDOM.abstract.ViewDOM) {
           
        }
        protected bindMethods(ViewDOM: viewDOM.abstract.ViewDOM) {

        }
    }
}