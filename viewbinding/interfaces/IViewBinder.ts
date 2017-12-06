import { ViewDOM } from "../../viewDOM/abstract/viewdom";
import { IInjected } from "../../coherence/interfaces/IInjected";
import { InterfaceUsingException } from "../../exceptions/coherence/InterfaceUsingException";
import { ICoherenceContainer } from "../../coherence/interfaces/ICoherenceContainer";
import { BindContext } from "../contracts/BindContext";

export class IViewBinder implements IInjected {
    ["`container"]: ICoherenceContainer;
    bind(context: BindContext): Promise<ViewDOM> { throw new InterfaceUsingException("IViewBinder.bind"); }
}