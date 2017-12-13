import { InterfaceUsingException } from "../../exceptions/coherence/InterfaceUsingException";

export class IViewDOM {
    DOM(): Promise<HTMLElement> { throw new InterfaceUsingException("IViewDOM.getViewDOM"); }
}