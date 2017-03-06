module geranium.viewbinding {
    export class JQueryViewBinder extends abstract.ViewBinder {
        private static DATAFIELD = '[data-field]';

        protected bindFields(ViewDOM: viewDOM.abstract.ViewDOM) {
            debugger;
            var DOM = ViewDOM.getViewDOM<JQuery>();
            DOM.findAndfilter(JQueryViewBinder.DATAFIELD).each((i, e) => {
                let $e = $(e);
                var field = $e.data('field');
                $e.removeAttr(JQueryViewBinder.DATAFIELD.replace('[', '').replace(']', ''));
                ViewDOM.view.data["_" + field] = ViewDOM.view.data[field];
                Object.defineProperty(ViewDOM.view.data, field, {
                    get: () => { return ViewDOM.view.data["_" + field]; },
                    set: (val) => { $e.html(val); ViewDOM.view.data["_" + field] = val; }
                });
            });
        }
        protected bindProperties(ViewDOM: viewDOM.abstract.ViewDOM) {

        }
        protected bindMethods(ViewDOM: viewDOM.abstract.ViewDOM) {

        }
    }
}