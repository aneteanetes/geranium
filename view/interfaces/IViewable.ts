import { InterfaceUsingException } from "../../exceptions/coherence/InterfaceUsingException";
import { View } from "../abstract/view";

export class IViewable {
    view(): { new(selector: string): View } | string { throw new InterfaceUsingException("IViewable.view"); }
}