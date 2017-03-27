namespace geranium.routing {
    export var settings: {
        clearUrl: boolean;
    } = {
            clearUrl: false
        };

    var _routes: contracts.Route[] = [];
    export function routes(): contracts.Route[] {
        return _routes.slice();
    }
    var _ignoredRoutes: string[] = [];
    
    export function urlFromCtor(ctor: any): string;
    export function urlFromCtor(ctor: any, params: string[]): string;
    export function urlFromCtor(ctor: any, params ?: string[]): string {
        var instance = new ctor();
        let chain = chainOfCtorNames(instance, null);
        var routeUrl = chain
            .removeSame()
            .reverse();

        if (params && settings.clearUrl)
            routeUrl.push.apply(routeUrl, params);

        return '/' + routeUrl.join("/").toLowerCase();
    }
    
    export function routed(constructor: any) {

        var route = new contracts.Route();
        route.url = urlFromCtor(constructor);
        route.ctor = constructor;

        _routes.push(route);
    }
    export function routeignore(constructor: any) {
        var instance = new constructor();
        _ignoredRoutes.push(instance.constructor.name);
    }
    export function routeroot(constructor: any) {
        var root = new contracts.Route();
        root.url = "/";
        root.ctor = constructor;
        _routes.push(root);
    }
    
    function chainOfCtorNames(obj: any, names: string[]): string[] {
        if (names == null)
            names = [];

        if (obj == null)
            return null;

        var route = obj.constructor.name;
        if (route == "Object")
            return null;
        if (_ignoredRoutes.indexOf(route) == -1)
            names.push(route);

        obj = Object.getPrototypeOf(obj);
        names.concat(chainOfCtorNames(obj, names));

        return names;
    }
}