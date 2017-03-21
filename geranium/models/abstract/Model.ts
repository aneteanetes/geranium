namespace geranium.models.abstract {
    @routing.routeignore
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
        /**
         * synchronize model with server state
         */
        async sync(): Promise<void> {
            if (this.refreshable) {
                let request = runtime.appSettings.request;
                let data = await request.send<any>(this.autoupdate());
                this.obtain(data);
            }
        }

        validators: validating.validator.interfaces.IValidator[] = [];
        protected abstract autoupdate(): boolean | {};
    }
}