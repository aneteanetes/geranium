namespace geranium.routing.contracts {
	export class Route {
		url: string;
        ctor: { new (...args: any[]): viewmodels.abstract.ViewModel };
        selector: string;
        restore: boolean;
	}
}