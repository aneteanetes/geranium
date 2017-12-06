import { InterfaceUsingException } from "../../../exceptions/coherence/InterfaceUsingException";

export class ICloner {
    clone<T>(sample: T): T { throw new InterfaceUsingException("ICloner.clone"); }
}