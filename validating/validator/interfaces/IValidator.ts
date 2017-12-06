import { InterfaceUsingException } from "../../../exceptions/coherence/InterfaceUsingException";
import { ValidationResult } from "../../contracts/validationresult";

export class IValidator {
    readonly validatedPropertyName: string;
    validate(value: any, shallowcopy: any): ValidationResult { throw new InterfaceUsingException("IValidator.validate"); }
}