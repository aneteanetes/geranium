import { ValidationResult } from "../../contracts/ValidationResult";

export interface IValidatingReporter {
    report(viewDOM: ViewDOM, validatingResult: ValidationResult);
}