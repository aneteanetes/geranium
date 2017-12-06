import { IInjected } from "../../coherence/interfaces/IInjected";
import { ViewDOM } from "../../viewdom/abstract/viewdom";
import { ICoherenceContainer } from "../../coherence/interfaces/ICoherenceContainer";
import { ViewExecutingContext } from "../contracts/viewexecutingcontext";
import { InterfaceUsingException } from "../../exceptions/coherence/InterfaceUsingException";

export class IViewEngine implements IInjected {
    ["`container"]: ICoherenceContainer;
    execute(context: ViewExecutingContext): Promise<ViewDOM> { throw new InterfaceUsingException("IViewEngine.execute"); }
}