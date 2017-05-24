namespace geranium.viewstate.decoratos {
	export function VS(constructor: any) {
		appSettings.inheritanceimpartor.inherit(constructor.prototype, new DecoratedViewState());
	}

	class DecoratedViewState extends ViewState {
		view(): string | (new (selector: string) => View) {
			throw new Error('Decorated ViewState must implement [view(): string | (new (selector: string)] method!');
		}

	}
}