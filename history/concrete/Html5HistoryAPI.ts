import { IHistory } from "../interfaces/IHistory";
import { HistoryItem } from "../contracts/HistoryItem";
import { IRouter } from "../../routing/interfaces/IRouter";
import GeraniumApp from "../../runtime/concrete/App";

export class Html5HistoryAPI extends IHistory {

    extend(hitem: HistoryItem) {
        if (window.history.state == null) {
            window.history.replaceState(hitem.state, hitem.title, hitem.url);
        }
        else {
            window.history.pushState(hitem.state, hitem.title, hitem.url);
        }
    }

    restore(state: any) {
        var router = this["`container"].resolve(IRouter);
        var route = router.routes.filter(x => {
            var instance = new x.ctor();
            return instance.constructor.name == state.ctor;
        })[0];
        route.selector = state.selector;
        route.restore = true;

        router.route(route);
    }
}

if (window) {
    window.addEventListener('popstate', (eventState) => {
        GeraniumApp.resolve(IHistory).restore(eventState.state);
    });
}