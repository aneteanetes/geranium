module geranium.view.abstract {
    export abstract class ViewPublisher implements interfaces.IViewPublisher {
        protected viewtarget: JQuery = null;
        constructor(target: JQuery) {
            this.viewtarget = target;
        }

        publish(model: models.abstract.Model) {
            model.bind = (state: states.State) => {
                var viewctr = this.view();
                var view = new viewctr(this.viewtarget);
                view.data = state;
                view.execute();
            }
        }
        abstract view(): { new (target: JQuery): view.abstract.View };
    }
}