import { InterfaceUsingException } from "../../exceptions/coherence/InterfaceUsingException";
import { Template } from "../contracts/template";
import { IInjected } from "../../coherence/interfaces/IInjected";
import { ICoherenceContainer } from "../../coherence/interfaces/ICoherenceContainer";

export class ITemplateEngine implements IInjected {
    ["`container"]: ICoherenceContainer;
    parse<TTemplate extends Template>(template: TTemplate): Promise<string> { throw new InterfaceUsingException("ITemplateEngine.parse"); }
}