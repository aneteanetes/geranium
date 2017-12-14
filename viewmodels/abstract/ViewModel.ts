import { routeignore } from "../../routing/concrete/decorators";
import { ViewState } from "./ViewState";
import { ViewDOM } from "../../viewDOM/abstract/viewdom";
import { IViewEngine } from "../../viewengine/interfaces/IViewEngine";
import { RouteMatch } from "../../routing/contracts/RouteMatch";
import { is } from "../../history/decorators/history";
import { HistoryItem } from "../../history/contracts/HistoryItem";
import { IHistory } from "../../history/interfaces/IHistory";
import GeraniumApp from "../../runtime/concrete/App";
import { ViewExecutingContext } from "../../viewengine/contracts/ViewExecutingContext";

@routeignore
export abstract class ViewModel extends ViewState {

	async show(selector: string) {
		this.setDocumentTitle();

		if (is(this.constructor) && !this['#routed']) {
			var _routed = this["@routed"] as RouteMatch;
			_routed.selector = selector;
			var _history = new HistoryItem();
			_history.url = _routed.url;
			_history.title = document.title;
			_history.state = {
				ctor: this.constructor.name,
				selector: selector
			};
			GeraniumApp.resolve(IHistory).extend(_history);
		}
		delete this['#routed'];

		if (this.statefull) {
			super.show(selector);
		} else {
			await GeraniumApp.resolve(IViewEngine).execute({
				iViewed: this,
				selector: selector
			});
		}
	}

	private setDocumentTitle() {
		var title = this.documentTitle();
		if (title != null)
			document.title = title;
	}

	documentTitle(): string { return null; }

	async toString(selector: string) {
		return this.show(selector);
	}
}