module geranium.viewstate.abstract {
    export abstract class ViewState implements interfaces.IViewState {
        bind(View: string) { }

        constructor() {
        }

        protected abstract view(): view.abstract.View;
        protected abstract state(): states.State;
    }
} 