module geranium.routing.abstract {
    export abstract class Router {

        static _routes: contracts.Route[] = [];
        get routes(): contracts.Route[] {
            return Router._routes.slice();
        }

        static routed(title?: any) {
            return (constructor: any) => {
                var instance = new constructor();

                let chain = Router.chainOfCtorNames(instance, null);
                var routeUrl = chain
                    .removeSame()
                    .reverse()
                    .join("/");

                var route = new contracts.Route();
                route.url = '/' + routeUrl.toLowerCase();
                route.ctor = constructor;
                route.title = title;

                Router._routes.push(route);
            };
        }

        static routeroot(title?: string) {
            return (constructor: any) => {
                var root = new contracts.Route();
                root.url = "/";
                root.ctor = constructor;
                root.title = title;
                Router._routes.push(root);
            }
        }

        static _ignoredRoutes: string[] = [];
        static routeignore(constructor: any) {
            var instance = new constructor();
            Router._ignoredRoutes.push(instance.constructor.name);
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
            var route = this.match(url);
            this.route(route);
        }
        routeByCtor(ctor: any) {
            var routes = runtime.AppSettings.Current.router.routes.filter(x => x.ctor == ctor);
            if (routes.length > 0) {
                var route = routes[0];
                var routeIndex = runtime.AppSettings.Current.router.routes.indexOf(route);
                //if (!route.pushed) {
                //    route.pushed = true;
                    if (route.url == '/')
                        history.replaceState(routeIndex, route.title, route.url);
                    else
                        history.pushState(routeIndex, route.title, route.url);
                    document.title = route.title;
                //} else {
                //    document.title = route.title;
                //    history.go(routeIndex);
                //}
            }
        }

        abstract route(current: contracts.RouteMatch);
        abstract routearea(): string;
        protected abstract match(url: string, params?: string[]): contracts.RouteMatch;
    }

    if (window) {
        window.onload = () => {
            runtime.AppSettings.Current.router.routeByUrl(window.location.pathname);
        }
        window.onpopstate = x => {
            var route = runtime.AppSettings.Current.router.routes[x.state];
            document.title = route.title;
            runtime.AppSettings.Current.router.route(route as contracts.RouteMatch);
        }
    }
}