import GeraniumApp from "../../runtime/concrete/App";
import { IInheritanceImpartor } from "../../reflection/inheritance/interfaces/IInheritanceImpartor";
import { ViewModel } from "../abstract/ViewModel";
import { View } from "../../view/abstract/view";

export function VM(constructor: any) {
	GeraniumApp.resolve(IInheritanceImpartor).inherit(constructor.prototype, new DecoratedViewModel());
}

class DecoratedViewModel extends ViewModel {
	view(): string | (new (selector: string) => View) {
		throw new Error('Decorated ViewModel must implement [view(): string | (new (selector: string)] method!');
	}
}