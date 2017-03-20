module geranium.routing.abstract {
    export abstract class Router {
        abstract Current<T extends viewmodels.abstract.ViewModel>(): T;

        get routes(): contracts.Route[] {
            return routing.routes();
        }       

        routeByUrl(url: string) {
            return this.match(url);
        }

        abstract route(current: contracts.RouteMatch);
        abstract routearea(): string;
        abstract match(url: string, params?: string[]): contracts.RouteMatch;
    }

    if (window) {
        window.addEventListener('load', () => {
            var router = runtime.appSettings.router;
            var route = router.routeByUrl(window.location.pathname);
            router.route(route);
        });
    }
}