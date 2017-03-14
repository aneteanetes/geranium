module geranium.history.contracts {
    export class HistoryItem<TState> {
        title: string;
        url: string;
        state: TState;
    }
}