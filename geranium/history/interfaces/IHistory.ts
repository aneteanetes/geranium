module geranium.history.interfaces {
    export interface IHistory {
        extend<TViewModelState>(hitem: contracts.HistoryItem<TViewModelState>);
        replace<TViewModelState>(hitem: contracts.HistoryItem<TViewModelState>);
        restore<TState>(state: TState)
    }
}