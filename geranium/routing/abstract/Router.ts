module geranium.routing.abstract {
    export abstract class Router {

        static _routes: contracts.Route[] = [];
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
            history.history(root.ctor);
        }

        static _ignoredRoutes: string[] = [];
        static routeignore(constructor: any) {
            var instance = new constructor();
            Router._ignoredRoutes.push(instance.constructor.name);
        }

        static urlFromCtor(ctor: any) {
            var instance = new ctor();
            let chain = Router.chainOfCtorNames(instance, null);
            var routeUrl = chain
                .removeSame()
                .reverse()
                .join("/");
            return '/' + routeUrl.toLowerCase();
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

        abstract route(current: contracts.RouteMatch);
        abstract routearea(): string;
        protected abstract match(url: string, params?: string[]): contracts.RouteMatch;
    }

    if (window) {
        window.addEventListener('load', () => {
            runtime.AppSettings.Current.router.routeByUrl(window.location.pathname);
        });
    }
}