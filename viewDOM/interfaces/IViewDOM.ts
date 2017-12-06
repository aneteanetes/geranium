import { InterfaceUsingException } from "../../exceptions/coherence/InterfaceUsingException";

export class IViewDOM {
    getViewDOM<T>(): T { throw new InterfaceUsingException("IViewDOM.getViewDOM"); }
}