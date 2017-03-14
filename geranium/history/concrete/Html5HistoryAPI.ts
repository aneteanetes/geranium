module geranium.history {
    export class Html5HistoryAPI implements interfaces.IHistory {
        ctors: viewmodels.contracts.ViewModelHistoryState[] = [];
        extend(hitem: contracts.HistoryItem<viewmodels.contracts.ViewModelHistoryState>) {
            debugger;
            let idx = this.ctors.push(hitem.state) - 1;
            window.history.pushState(idx, hitem.title, hitem.url);
        }
        replace(hitem: contracts.HistoryItem<viewmodels.contracts.ViewModelHistoryState>) {
            debugger;
            let idx = this.ctors.push(hitem.state) - 1;
            window.history.replaceState(idx, hitem.title, hitem.url);
        }
        restore(state: number) {
            debugger;
            var viewmodelstate = this.ctors[state];
            var instance = new viewmodelstate.ctor();
            instance.display(viewmodelstate.selector, 'restore');
        }
    }

    if (window) {
        window.addEventListener('popstate', (eventState) => {
            debugger;
            runtime.AppSettings.Current.history.restore(eventState.state);
        });
    }
}