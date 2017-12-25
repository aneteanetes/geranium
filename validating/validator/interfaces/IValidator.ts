import { InterfaceUsingException } from "../../../exceptions/coherence/InterfaceUsingException";
import { ValidationResult } from "../../contracts/ValidationResult";
import { ViewModel } from "../../../viewmodels/abstract/ViewModel";

export class IValidator {
    readonly validatedPropertyName: string;
    validate(value: any, shallowcopy: ViewModel): ValidationResult { throw new InterfaceUsingException("IValidator.validate"); }
}