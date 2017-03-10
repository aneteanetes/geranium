module geranium.models.abstract {
    export abstract class Model extends behaviors.events.Event<any> {

        get refreshable() {
            return (typeof this.autoupdate() !== 'boolean');
        }
        get params(): {} {
            return this.autoupdate();
        }
        obtain(data: any) {
            if (typeof data == 'string')
                data = JSON.parse(data);
            Object.assign(this, data);
            this.raise(this);
        }

        validators: validating.validator.interfaces.IValidator[] = [];
        protected abstract autoupdate(): boolean | {};
    }
}