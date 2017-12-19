import { ViewPublishContext } from "../contracts/ViewPublishContext";
import { InterfaceUsingException } from "../../exceptions/coherence/InterfaceUsingException";
import { IInjected } from "../../coherence/interfaces/IInjected";
import { ICoherenceContainer } from "../../coherence/interfaces/ICoherenceContainer";

export class IViewPublisher implements IInjected {
    ["`container"]: ICoherenceContainer;
    publish(viewDOM: ViewPublishContext): Promise<void> { throw new InterfaceUsingException("IViewPublisher.publish"); }
}