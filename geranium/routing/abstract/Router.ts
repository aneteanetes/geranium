module geranium.routing.abstract {
    export abstract class Router {
        static clearUrl: boolean = false;
        abstract Current<T extends viewmodels.abstract.ViewModel>(): T;

        private static _routes: contracts.Route[] = [];
        get routes(): contracts.Route[] {
            return Router._routes.slice();
        }

        static routed(constructor: any) {

            var route = new contracts.Route();
            route.url = Router.urlFromCtor(constructor);
            route.ctor = constructor;

            Router._routes.push(route);
        }

        static routeroot(constructor: any) {
            var root = new contracts.Route();
            root.url = "/";
            root.ctor = constructor;
            Router._routes.push(root);
        }

        private static _ignoredRoutes: string[] = [];
        static routeignore(constructor: any) {
            var instance = new constructor();
            Router._ignoredRoutes.push(instance.constructor.name);
        }        

        static urlFromCtor(ctor: any): string;
        static urlFromCtor(ctor: any, params: string[]): string;
        static urlFromCtor(ctor: any, params?: string[]): string {
            var instance = new ctor();
            let chain = Router.chainOfCtorNames(instance, null);
            var routeUrl = chain
                .removeSame()
                .reverse();

            if (params && !Router.clearUrl)
                routeUrl.push.apply(routeUrl, params);
            
            return '/' + routeUrl.join("/").toLowerCase();
        }        
        
        static chainOfCtorNames(obj: any, names: string[]): string[] {
            if (names == null)
                names = [];

            if (obj == null)
                return null;

            var route = obj.constructor.name;
            if (route == "Object")
                return null;
            if (Router._ignoredRoutes.indexOf(route) == -1)
                names.push(route);

            obj = Object.getPrototypeOf(obj);
            names.concat(Router.chainOfCtorNames(obj, names));

            return names;
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
            var router = runtime.AppSettings.Current.router;
            var route = router.routeByUrl(window.location.pathname);
            router.route(route);
        });
    }
}