module geranium.view.interfaces {
    export interface IViewPublisher {
        publish(data: models.abstract.Model);
        view(): { new (target: JQuery): view.abstract.View };
    }
}