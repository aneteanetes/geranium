import { InterfaceUsingException } from "../../../exceptions/coherence/InterfaceUsingException";

export class IInheritanceImpartor {
	inherit(derived: any, base: any) { throw new InterfaceUsingException("IInheritanceImpartor.inherit"); }
}