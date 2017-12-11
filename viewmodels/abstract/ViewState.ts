import { State } from "../../states/State";
import { IViewable } from "../../view/interfaces/IViewable";
import { routeignore } from "../../routing/concrete/decorators";
import { IViewEngine } from "../../viewengine/interfaces/iviewengine";
import { View } from "../../view/abstract/view";
import GeraniumApp from "../../runtime/concrete/App";

@routeignore
export abstract class ViewState extends State implements IViewable {

	constructor() {
		super(false);
		if (this.statefull)
			this.fillState();
	}

	protected get statefull() { return false; }

	public async show(selector: string) {
		if (!this["#ViewState"]) {
			var myState = await State.get(this.constructor as any);
			myState["#ViewState"] = true;
			myState["show"](selector);
		}
		else {
			delete this["#ViewState"];
			GeraniumApp.resolve(IViewEngine).execute({
				iViewed: this,
				selector: selector
			});
		}
	}

	abstract view(): { new(selector: string): View } | string;
}