import { IInjected } from "../../coherence/interfaces/IInjected";
import { Route } from "../contracts/Route";
import { InterfaceUsingException } from "../../exceptions/coherence/InterfaceUsingException";
import { ICoherenceContainer } from "../../coherence/interfaces/ICoherenceContainer";
import { RouteMatch } from "../contracts/RouteMatch";

export class IRouter implements IInjected {
    ["`container"]: ICoherenceContainer;
    get routes(): Route[] { throw new InterfaceUsingException("IRouter.routes"); }
    routeByUrl(url: string): RouteMatch { throw new InterfaceUsingException("IRouter.routeByUrl"); }
    route(current: RouteMatch) { throw new InterfaceUsingException("IRouter.route"); }
    routearea(): string { throw new InterfaceUsingException("IRouter.routearea"); }
}