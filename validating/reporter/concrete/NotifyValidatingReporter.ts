import { IValidatingReporter } from "../interfaces/IValidatatingReporter";
import { ValidationResult } from "../../contracts/ValidationResult";
import { ViewDOM } from "../../../viewDOM/abstract/viewdom";

export class NotifyValidatingReporter extends IValidatingReporter {
    async report(DOM: HTMLElement[], validatingResult: ValidationResult) {
        validatingResult.errors.forEach(x => {
            console.error('VALLIDATING_ERR [' + x.name + ']:' + x.message);
        });
    }
}