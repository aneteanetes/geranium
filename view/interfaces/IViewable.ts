import { InterfaceUsingException } from "../../exceptions/coherence/InterfaceUsingException";
import { View } from "../abstract/view";
import { Constructor } from "../../structures/Constructor";

export class IViewable {
    view(): string | Constructor<View> { throw new InterfaceUsingException("IViewable.view"); }
}