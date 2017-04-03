namespace geranium.viewengine.abstract {
    export abstract class ViewEngine implements interfaces.IViewEngine {
        async execute(context: contracts.ViewExecutingContext): Promise<viewDOM.abstract.ViewDOM> {
            var view = await ViewEngine.ViewEngineView(context.iViewed, context.selector);
            var viewDOM = this.viewDOM(view);

            var execCtx = new viewengine.contracts.ExecuteContext(context);
            var bindingContext = new viewbinding.contracts.BindContext(viewDOM, execCtx.bindingFlags);

            var viewbinder = runtime.appSettings.viewbinder;
            await viewbinder.bind(bindingContext);            

            return this.publish(viewDOM);
        }
        protected abstract publish(viewDOM: viewDOM.abstract.ViewDOM): Promise<viewDOM.abstract.ViewDOM>;
        protected abstract viewDOM(view: view.abstract.View): geranium.viewDOM.abstract.ViewDOM;
        
        /**
         * return complete rendered view
         * @param selector
         */
        static ViewEngineView(iviewed: view.interfaces.IViewed, selector: string): Promise<view.abstract.View> {
            var view: view.abstract.View;

            var viewctr = iviewed.view();
            if (typeof viewctr === "string") {
                let vmctr = EmptyView;
                view = new (vmctr as any)(selector, viewctr);
            }
            else
                view = new (viewctr as any)(selector);            
            view.data = iviewed;
            return view.render();
        }
    }

    class EmptyView extends view.abstract.View {
        declare() { return undefined; }
    }
}