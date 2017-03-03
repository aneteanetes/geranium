module geranium.behaviors.events.abstract {
    export abstract class Event<T>{

        abstract execute(data: T);

        protected trigger() {
            this._requestEvents.forEach(x => {
                this.execute(x);
            });
        }

        private _requestEvents: T[];
        set bind(callback: T) {
            this._requestEvents.push(callback);
        }
        set unbind(callback: T) {
            //this._requestEvents.remove(callback);
        }
    }
}