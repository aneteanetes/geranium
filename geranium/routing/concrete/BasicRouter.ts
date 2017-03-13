module geranium.routing {
    export class BasicRouter extends abstract.Router {
        routearea() {
            return '.app';
        }
        route(current: contracts.RouteMatch) {
            if (current == null)
                return;

            var vm = new current.ctor(current.params);
            vm.display(this.routearea());
        }
        match(url: string, params?: string[]): contracts.RouteMatch {
            var ctorCollection = this.routes.filter(x => x.url == url);

            if (url == '/' && ctorCollection.length == 0)
                return null;

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
            debugger;

            return match;
        }

        resoreUrl(url: string, params?: string[]) {
            if (!params)
                params = [];
            return url + params.join('/');
        }

        makeid(): string {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }
    }
}