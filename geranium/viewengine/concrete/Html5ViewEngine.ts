module geranium.viewengine {
    export class Html5ViewEngine implements interfaces.IViewEngine {
        extractMethods(view: view.abstract.View): contracts.Method[] {
            return null;
        }
        extractProperties(view: view.abstract.View): contracts.Property[] {
            return null;
        }
        extractFields(view: view.abstract.View): contracts.Field[] {
            var fields: contracts.Field[] = new Array<contracts.Field>();
            $(view.html).findAndfilter('[data-field]').each((i, e) => {
                
            });

            return null;
        }
        publish() {
            //var DOM = view.getViewDOM<JQuery>();
            //$(view.selector).jhtml(DOM);

            //return new Promise((resolve, reject) => {
            //    try {
            //        resolve(true);
            //    } catch (ex) {
            //        runtime.AppSettings.Current.logger.log(ex);
            //        reject(false);
            //    }
            //});
        }
        execute(view: view.abstract.View): Promise<boolean> { return null; }
    }
}