namespace geranium.viewengine.abstract {
    export abstract class ViewEngine implements interfaces.IViewEngine {
        execute(context: contracts.ExecuteContext): Promise<viewDOM.abstract.ViewDOM> {
            var viewDOM = this.viewDOM(context.view);
            var bindingContext = new viewbinding.contracts.BindContext(viewDOM, context.bindingFlags);

            var viewbinder = runtime.appSettings.viewbinder;
            viewDOM = viewbinder.bind(bindingContext);            

            return this.publish(viewDOM);
        }
        protected abstract publish(viewDOM: viewDOM.abstract.ViewDOM): Promise<viewDOM.abstract.ViewDOM>;
        protected abstract viewDOM(view: view.abstract.View): geranium.viewDOM.abstract.ViewDOM;
    }
}