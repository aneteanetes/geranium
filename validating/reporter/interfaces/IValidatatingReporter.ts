import { ValidationResult } from "../../contracts/ValidationResult";
import { ViewDOM } from "../../../viewDOM/abstract/viewdom";
import { InterfaceUsingException } from "../../../exceptions/coherence/InterfaceUsingException";

export class IValidatingReporter {
    report(viewDOM: ViewDOM, validatingResult: ValidationResult) { throw new InterfaceUsingException("IValidatingReporter.report"); }
}