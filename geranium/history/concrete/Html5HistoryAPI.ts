module geranium.history {
    export class Html5HistoryAPI implements interfaces.IHistory {
        extend(hitem: contracts.HistoryItem) {
            if (window.history.state == null)
                window.history.replaceState(hitem.state, hitem.title, hitem.url);
            else
                window.history.pushState(hitem.state, hitem.title, hitem.url);
        }
        restore(state: any) {
            var router = runtime.appSettings.router;
            var route = router.routes.filter(x => {
                var instance = new x.ctor();
                return instance.constructor.name == state.ctor;
            })[0];
            route.selector = state.selector;
            route.restore = true;

            router.route(route as routing.contracts.RouteMatch);
        }
    }

    if (window) {
        window.addEventListener('popstate', (eventState) => {
            runtime.appSettings.history.restore(eventState.state);
        });
    }
}