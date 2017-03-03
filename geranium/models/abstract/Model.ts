module geranium.models.abstract {
    export abstract class Model extends behaviors.events.Event<any> {

        get refreshable() {
            return (typeof this.autoupdate() !== 'boolean');
        }
        get params(): {} {
            return this.autoupdate();
        }
        set obtain(data: any) {
            Object.assign(this, JSON.parse(data));
        }

        protected abstract autoupdate(): boolean | {};
    }
}