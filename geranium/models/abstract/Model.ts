namespace geranium.models.abstract {
    @routing.routeignore
    @runtime.reflection.cloning.decorators.ICloneable
    export abstract class Model extends behaviors.events.Event<Model> {        
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
            if (this.synchronizer) {
				let request = runtime.appSettings.request;				
                let data = await request.send<any>(this.synchronizer);
                this.obtain(data);
            }
        }
        /**
         * object used as synchronizator
         */
        get synchronizer(): {} { return undefined; }

        validators: validating.validator.interfaces.IValidator[] = [];
    }
}