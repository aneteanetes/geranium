import { routeignore } from "../../routing/concrete/decorators";
import { ViewModel } from "../../viewmodels/abstract/ViewModel";

/**
 * syntax sugar: ViewState extends ViewModel
 */
@routeignore
export abstract class ViewState extends ViewModel {
	get statefull() { return true; }
}