import GeraniumApp from "../../runtime/concrete/App";
import { IRouter } from "../../routing/interfaces/IRouter";

export function is(constructor: any): boolean {
    var router = GeraniumApp.container.resolve(IRouter);
    return router.routes.filter(x => {
        var instance = new x.ctor();
        return instance.constructor.name == constructor.name;
    }).length > 0;
}