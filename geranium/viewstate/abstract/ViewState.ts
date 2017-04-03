namespace geranium.viewstate {
	@routing.routeignore
	export abstract class ViewState extends states.State implements view.interfaces.IViewed {
		public async show(selector: string) {

			if (history.is(this.constructor) && !this['#routed']) {
				var _routed = this["@routed"] as routing.contracts.RouteMatch;
				_routed.selector = selector;
				var _history = new history.contracts.HistoryItem();
				_history.url = _routed.url;
				_history.title = document.title;
				_history.state = {
					ctor: this.constructor.name,
					selector: selector
				};
				runtime.appSettings.history.extend(_history);
			}
			else
				delete this['#routed'];

			if (!this["#ViewState"]) {
				var myState = await State.get(this.constructor as any);
				myState["#ViewState"] = true;
				myState["show"](selector);
			}
			else {
				delete this["#ViewState"];
				runtime.appSettings.viewengine.execute({
					iViewed: this,
					selector: selector
				});
			}
		}

		async toString(selector: string) {
			return this.show(selector);
		}

		abstract view(): { new (selector: string): view.abstract.View } | string;
	}
}