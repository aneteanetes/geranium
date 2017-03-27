namespace geranium.behaviors.events {
    @routing.routeignore
    export abstract class Event<T> {

        raise(args: T) {
            this._requestEvents.forEach(x => {
                x(args);
            });
        }

        private _requestEvents: ((args: T) => void)[] = new Array<((args: T) => void)>();

        set bind(callback: ((args: T) => void)) {
            this._requestEvents.push(callback);
        }
        set unbind(callback: ((args: T) => void)) {
            this._requestEvents.remove(callback);
        }
    }
}