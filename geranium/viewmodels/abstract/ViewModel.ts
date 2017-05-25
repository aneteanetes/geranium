namespace geranium.viewmodels.abstract {
	@routing.routeignore
	export abstract class ViewModel extends ViewState {

		private publishedViewDom: viewDOM.abstract.ViewDOM;
		protected get markup(): viewDOM.abstract.ViewDOM { return this.publishedViewDom; }

		async show(selector: string) {

			this.setDocumentTitle();

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
			delete this['#routed'];

			if (this.statefull)
				super.show(selector);
			else
				this.publishedViewDom = await runtime.appSettings.viewengine.execute({
					iViewed: this,
					selector: selector
				});
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
}