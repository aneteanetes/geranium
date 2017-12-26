import { InterfaceUsingException } from "../../exceptions/coherence/InterfaceUsingException";
import { IInjected } from "../../coherence/interfaces/IInjected";
import { ICoherenceContainer } from "../../coherence/interfaces/ICoherenceContainer";
import { Model } from "../../models/Model";

export class IViewRenderer implements IInjected {
    ["`container"]: ICoherenceContainer;
    render<T extends Model>(elements: HTMLElement[], model: T): HTMLElement[] { throw new InterfaceUsingException("IViewRenderer.render"); }
}