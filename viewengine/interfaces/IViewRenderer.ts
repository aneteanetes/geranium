import { ViewModel } from "../../viewmodels/abstract/ViewModel";
import { InterfaceUsingException } from "../../exceptions/coherence/InterfaceUsingException";

export class IViewRenderer {
    render<T extends ViewModel>(elements: HTMLElement[], model: T): HTMLElement[] { throw new InterfaceUsingException("IViewRenderer.render"); }
}