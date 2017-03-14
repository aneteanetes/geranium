module geranium.history {
    export class Html5HistoryAPI implements interfaces.IHistory {
        extend(hitem: contracts.HistoryItem) {
            if (window.history.state == null)
                window.history.replaceState(hitem.state, hitem.title, hitem.url);
            else
                window.history.pushState(hitem.state, hitem.title, hitem.url);
        }
        restore(state: any) {
            var router = runtime.AppSettings.Current.router;
            var viewmodelstate = router.routes.filter(x => {
                var instance = new x.ctor();
                return instance.constructor.name == state.ctor;
            })[0].ctor;
            var instance = new viewmodelstate() as any;
            instance.display(state.selector, 'restore');
        }
    }

    if (window) {
        window.addEventListener('popstate', (eventState) => {
            runtime.AppSettings.Current.history.restore(eventState.state);
        });
    }
}