namespace geranium.viewmodels.decorators {
	export function VM(constructor: any) {
		appSettings.inheritanceimpartor.inherit(constructor.prototype, new DecoratedViewModel());
	}

	class DecoratedViewModel extends ViewModel {
		view(): string | (new (selector: string) => View) {
			throw new Error('Decorated ViewModel must implement [view(): string | (new (selector: string)] method!');
		}
	}
}