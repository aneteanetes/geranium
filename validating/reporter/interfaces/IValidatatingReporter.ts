import { ValidationResult } from "../../contracts/ValidationResult";
import { ViewDOM } from "../../../viewDOM/abstract/viewdom";
import { InterfaceUsingException } from "../../../exceptions/coherence/InterfaceUsingException";
import { IInjected } from "../../../coherence/interfaces/IInjected";
import { ICoherenceContainer } from "../../../coherence/interfaces/ICoherenceContainer";

export class IValidatingReporter implements IInjected {
    ["`container"]: ICoherenceContainer;
    report(viewDOM: ViewDOM, validatingResult: ValidationResult): Promise<void> { throw new InterfaceUsingException("IValidatingReporter.report"); }
}