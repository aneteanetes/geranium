namespace geranium.routing {
	export var settings: {
		parameterFullUrl: boolean;
	} = {
			parameterFullUrl: false
		};

	var _routes: contracts.Route[] = [];
	export function routes(): contracts.Route[] {
		return _routes.slice();
	}
	var _ignoredRoutes: string[] = [];

	export function urlFromCtor(ctor: any): string;
	export function urlFromCtor(ctor: any, params: string[]): string;
	export function urlFromCtor(ctor: any, params?: string[]): string {
		var instance = new ctor();
		let chain = chainOfCtorNames(instance, null);
		var routeUrl = chain
			.removeSame()
			.reverse();

		if (params && settings.parameterFullUrl)
			routeUrl.push.apply(routeUrl, params);

		return '/' + routeUrl.join("/").toLowerCase();
	}


	/**
	 * route object by hierarhy
	 * @param constructor
	 */
	export function routed(constructor: any)
	/**
	 * route object by routeContext
	 * @param context
	 */
	export function routed(context: contracts.RouteContext)
	/**
	 * route object to exacly route
	 * @param cleanroute
	 */
	export function routed(cleanroute: string)
	/**
	 * route object with parent, if u can't inherit
	 * @param parent
	 * @param absorb
	 */
	export function routed(parent: any, absorb: boolean)
	export function routed(param?: any, absorb?: boolean) {
		//clean route overload
		if (typeof param !== 'string'
			//context overload
			&& !(param instanceof contracts.RouteContext)
			//parent overload
			&& !absorb)
			//clean decorate
			_routed(param, urlFromCtor(param));
		
		//decorate with params
		else return (constructor: any) => {
			if (typeof param === 'string')
				_routed(constructor, param);

			if (absorb)
				_routed(constructor, urlFromCtor(param) + urlFromCtor(constructor));

			if (param instanceof contracts.RouteContext) {				
				var url = urlFromCtor(constructor);

				if (param.parent)
					url = urlFromCtor(param.parent) + url;

				if (param.prepath)
					url = param.prepath + url;

				_routed(constructor, url, param.executable);
			}
		}
	}

	export function routeignore(constructor: any) {
		var instance = new constructor();
		_ignoredRoutes.push(instance.constructor.name);
	}
	export function routeroot(constructor: any) {
		_routed(constructor, '/');
	}

	function _routed(ctor: any, url: string, executable?: string) {
		var route = new contracts.Route();
		route.url = url,
			route.ctor = ctor;
		route.executable = executable;
		ctor.prototype["@routed"] = route;
		_routes.push(route);
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