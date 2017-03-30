namespace geranium.routing {
    export class BasicRouter extends abstract.Router {
        Current<T>(): T {
            return this._current;
        }
        _current: any;

        routearea() {
            return '.app';
        }
        route(current: contracts.RouteMatch) {
            if (current == null)
                return;

            let selector = current.restore ? current.selector : this.routearea();

            var routed = new current.ctor(current.params) as any;
            var executing: string = current.executable ? current.executable : 'toString';

            if (!current.restore) {
                var _history = new history.contracts.HistoryItem();
                _history.url = current.url;
                _history.title = document.title;
                _history.state = {
                    ctor: current.ctor.name,
                    selector: selector
                };
                runtime.appSettings.history.extend(_history);
            }

            routed["#routed"] = {
                params: current.params,
                restore: current.restore
            };

            routed[executing](selector);
        }
    }
}