import { IInjected } from "../../coherence/interfaces/IInjected";
import { InterfaceUsingException } from "../../exceptions/coherence/InterfaceUsingException";
import { ICoherenceContainer } from "../../coherence/interfaces/ICoherenceContainer";
import { BindContext } from "../contracts/BindContext";
import { ViewDOM } from "../../viewDOM/abstract/ViewDOM";

export class IViewBinder implements IInjected {
    ["`container"]: ICoherenceContainer;
    bind(context: BindContext): Promise<ViewDOM> { throw new InterfaceUsingException("IViewBinder.bind"); }
}