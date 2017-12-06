import { IRouter } from "../interfaces/IRouter";
import { Route } from "../contracts/Route";
import { RouteMatch } from "../contracts/RouteMatch";
import GeraniumApp from "../../runtime/concrete/App";
import { routes } from "../concrete/decorators";

export abstract class Router extends IRouter {
    abstract Current<T>(): T;

    get routes(): Route[] {
        return routes();
    }

    routeByUrl(url: string) {
        return this.match(url);
    }

    protected match(url: string, params?: string[]): RouteMatch {
        if (this.routes.length == 0)
            return null;

        var ctorCollection = this.routes.filter(x => x.url == url);

        if (url == '/' && ctorCollection.length == 0) {
            var shortestRoute = this.routes.reduce((a, b) => a.url.length < b.url.length ? a : b);
            return shortestRoute as any;
        }

        if (ctorCollection.length == 0) {

            var segments = url.split('/').remove('');
            var cutSegments = segments.filter((v, i) => {
                return i != segments.length - 1;
            });

            var route = this.match('/' + cutSegments.join('/'));

            if (!route.params)
                route.params = [];
            route.params.push(segments[segments.length - 1]);

            return route;
        }

        var match = new RouteMatch();
        Object.assign(match, ctorCollection[0]);
        match.params = params;

        return match;
    }

    abstract route(current: RouteMatch);
    abstract routearea(): string;
}

if (window) {
    window.addEventListener('load', () => {
        var router = GeraniumApp.container.resolve(IRouter);
        var route = router.routeByUrl(window.location.pathname);
        router.route(route);
    });
}