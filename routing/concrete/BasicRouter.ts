import { Router } from "../abstract/Router";
import { RouteMatch } from "../contracts/RouteMatch";
import { HistoryItem } from "../../history/contracts/HistoryItem";
import { IHistory } from "../../history/interfaces/IHistory";

export class BasicRouter extends Router {
    _current: any;
    Current<T>(): T {
        return this._current;
    }

    routearea() {
        return '.app';
    }

    route(current: RouteMatch) {
        if (current == null)
            return;

        let selector = current.restore ? current.selector : this.routearea();

        var routed = new current.ctor(current.params) as any;
        var executing: string = current.executable ? current.executable : 'toString';

        if (!current.restore) {
            var _history = new HistoryItem();
            _history.url = current.url;
            _history.title = document.title;
            _history.state = {
                ctor: current.ctor.name,
                selector: selector
            };
            this["`container"].resolve(IHistory).extend(_history);
        }

        routed["#routed"] = {
            params: current.params,
            restore: current.restore
        };

        routed[executing](selector);
    }
}