import { InterfaceUsingException } from "../../exceptions/coherence/InterfaceUsingException";
import { View } from "../abstract/view";
import { Constructor } from "../../structures/Constructor";
import { ViewDOM } from "../../viewDOM/abstract/ViewDOM";

export class IViewable {
    view(): string | Constructor<View> | Constructor<ViewDOM> { throw new InterfaceUsingException("IViewable.view"); }
}