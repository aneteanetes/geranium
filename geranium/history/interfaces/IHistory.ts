namespace geranium.history.interfaces {
    export interface IHistory {
        extend(hitem: contracts.HistoryItem);
        restore(state: any);
    }
}