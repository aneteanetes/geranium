module geranium.routing {
    export class BasicRouter extends abstract.Router {
        Current<T extends viewmodels.abstract.ViewModel>(): T {
            return this._current;
        }
        _current: any;

        routearea() {
            return '.app';
        }
        route(current: contracts.RouteMatch) {
            if (current == null)
                return;

            var vm = new current.ctor(current.params) as any;
            if (!current.restore)
                vm.display(this.routearea(), current.params);
            else
                vm.display(current.selector, current.params, current.restore);
            this._current = vm;
        }
        match(url: string, params?: string[]): contracts.RouteMatch {
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

            var match = new contracts.RouteMatch();
            Object.assign(match, ctorCollection[0]);
            match.params = params;

            return match;
        }
    }
}