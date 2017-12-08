import { InterfaceUsingException } from "../../../exceptions/coherence/InterfaceUsingException";
import { IInjected } from "../../../coherence/interfaces/IInjected";
import { ICoherenceContainer } from "../../../coherence/interfaces/ICoherenceContainer";

export class IInheritanceImpartor implements IInjected {
	["`container"]: ICoherenceContainer;
	inherit(derived: any, base: any) { throw new InterfaceUsingException("IInheritanceImpartor.inherit"); }
}