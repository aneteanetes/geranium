module geranium.routing.abstract {
	export abstract class Router {
		constructor() {
			var root = new contracts.Route();
			root.url = "/";
			this._routes.push(root);
		}

		_routes: contracts.Route[] = [];
		get routes(): contracts.Route[] {
			return this._routes.slice();
		}

		static routed(constructor: any) {
			var instance = new constructor();

			var routeUrl = Router.chainOfCtorNames(instance, null)
				.removeSame()
				.reverse()
				.join("/");

			var route = new contracts.Route();
			route.url = routeUrl;
			route.cotr = constructor;

			runtime.AppSettings.Current.router._routes.push(route);
		}
		protected static chainOfCtorNames(obj: any, names: string[]): string[] {
			if (names == null)
				names = [];

			if (obj == null)
				return null;

			var route = obj.constructor.name;
			if (route == "Object")
				return null;
			names.push(obj.constructor.name);

			obj = Object.getPrototypeOf(obj);
			names.concat(Router.chainOfCtorNames(obj, names));

			return names;
		}

		abstract route(current: contracts.Route);
	}

	if (window) {
		window.onload = x => {

		};
		window.onpopstate = x => {

		}
	}
}