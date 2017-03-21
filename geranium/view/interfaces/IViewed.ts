namespace geranium.view.interfaces {
    export interface IViewed {
        view(): { new (selector: string): view.abstract.View };
    }
}