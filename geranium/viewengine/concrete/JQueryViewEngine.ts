module geranium.viewengine {
    export class JQueryViewEngine extends abstract.ViewEngine {
        protected publish(viewDOM: viewDOM.abstract.ViewDOM): Promise<boolean> {
            
            return new Promise((resolve, reject) => {
                try {
                    var selector = viewDOM.view.selector;
                    $(selector).jhtml(viewDOM.getViewDOM<JQuery>());
                    resolve(true);
                } catch (ex) {
                    runtime.AppSettings.Current.logger.log(ex);
                    reject(false);
                }
            });
        }
        protected viewDOM(view: view.abstract.View): geranium.viewDOM.abstract.ViewDOM {
            return new viewDOM.JQueryViewDOM(view);
        }
    }
}