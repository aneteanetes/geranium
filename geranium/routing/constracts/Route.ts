module geranium.routing.contracts {
	export class Route {
		url: string;
		cotr: { new (): any };
	}
}