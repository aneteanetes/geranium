import { IValidatingReporter } from "../interfaces/ivalidatatingreporter";
import { ValidationResult } from "../../contracts/validationresult";

export class JQueryViewValidatingReporter implements IValidatingReporter {
    report(viewDOM: ViewDOM, validatingResult: ValidationResult) {
        var errContainer = viewDOM.getViewDOM<JQuery>().findAndfilter('div.validating.error.container');
        if (errContainer.length > 0) {
            errContainer.remove();
        }
        errContainer = $('<div>', { class: 'validating error container' });
        viewDOM.getViewDOM<JQuery>().findAndfilter('.errors').append(errContainer);

        validatingResult.errors.forEach(x => {
            errContainer.append($('<p>').html(x.pure));
        });
    }
}