import { Route } from "../contracts/Route";
import { RouteContext } from "../contracts/RouteContext";
import { ArrayHelper } from "../../declare/array";
import GeraniumApp from "../../runtime/concrete/App";

var _ignoredRoutes: string[] = [];
var _routes: Route[] = [];

export var settings: { parameterFullUrl: boolean; } = { parameterFullUrl: false };

export function routes(): Route[] {
	return _routes.slice();
}

export function urlFromCtor(ctor: any): string;
export function urlFromCtor(ctor: any, params: string[]): string;
export function urlFromCtor(ctor: any, params?: string[]): string {
	var instance = GeraniumApp.instantiate(ctor);
	let chain = chainOfCtorNames(instance, null);
	var routeUrl = ArrayHelper.removeSame(chain)
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
export function routed(context: RouteContext)
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
		&& !(param instanceof RouteContext)
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

		if (param instanceof RouteContext) {
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
	//var instance = GeraniumApp.container.instantiate(constructor);
	_ignoredRoutes.push(constructor.name);
}
export function routeroot(constructor: any) {
	_routed(constructor, './');
}

function _routed(ctor: any, url: string, executable?: string) {
	var route = new Route();
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