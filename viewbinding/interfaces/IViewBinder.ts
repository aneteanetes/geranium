import { IInjected } from "../../coherence/interfaces/IInjected";
import { InterfaceUsingException } from "../../exceptions/coherence/InterfaceUsingException";
import { ICoherenceContainer } from "../../coherence/interfaces/ICoherenceContainer";
import { BindContext } from "../contracts/BindContext";
import { View } from "../../view/abstract/view";

export class IViewBinder implements IInjected {
    ["`container"]: ICoherenceContainer;
    bind(context: BindContext): Promise<View> { throw new InterfaceUsingException("IViewBinder.bind"); }
}