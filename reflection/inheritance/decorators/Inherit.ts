import GeraniumApp from "../../../runtime/concrete/App";
import { IInheritanceImpartor } from "../interfaces/IInheritanceImpartor";

export function Inherit(baseClassConstructor: (new (...args: any[]) => {})) {
	return (constructor: any) => {
		GeraniumApp.resolve(IInheritanceImpartor).inherit(constructor, baseClassConstructor);
	}
}