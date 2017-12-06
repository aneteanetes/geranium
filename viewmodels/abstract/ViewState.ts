namespace geranium.viewmodels.abstract {
	@routing.routeignore
	export abstract class ViewState extends states.State implements view.interfaces.IViewed {

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
				runtime.appSettings.viewengine.execute({
					iViewed: this,
					selector: selector
				});
			}
		}

		abstract view(): { new (selector: string): view.abstract.View } | string;
	}
}