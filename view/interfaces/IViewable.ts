import { InterfaceUsingException } from "../../exceptions/coherence/InterfaceUsingException";
import { View } from "../abstract/view";
import { ViewDOM } from "../../viewDOM/abstract/viewdom";

export class IViewable {
    view(): string | ViewDOM { throw new InterfaceUsingException("IViewable.view"); }
}