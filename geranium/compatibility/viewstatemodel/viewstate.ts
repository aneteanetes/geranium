namespace geranium.viewstate {
	/**
	 * syntax sugar: ViewState extends ViewModel
	 */
	@routing.routeignore		
	export abstract class ViewState extends viewmodels.abstract.ViewModel {
		get statefull() { return true; }
	}
}