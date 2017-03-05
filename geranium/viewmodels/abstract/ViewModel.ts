module geranium.viewmodels.abstract {
    export abstract class ViewModel extends models.abstract.Model {
        constructor(target: JQuery) {
            super();

            var viewengine = runtime.AppSettings.Current.viewengine;
            var viewctor = this.view();
            var view = new viewctor(target);

            //this.bindMethods(viewengine.extractMethods(view));
            //this.bindProperties(viewengine.extractProperties(view));
            //this.bindFields(viewengine.extractFields(view));

            this.viewInstance = view;
            this.viewInstance.data = this;

            this.publish();
        }

        protected viewInstance: view.abstract.View;
        abstract view(): { new (target: JQuery): view.abstract.View };
        publish() {
            //this.viewInstance.execute();
        }

        bindMethods(methods: viewengine.contracts.Method[]) {

        }

        bindProperties(properties: viewengine.contracts.Property[]) {

        }

        bindFields(field: viewengine.contracts.Field[]) {

        }
    }
}