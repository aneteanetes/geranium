import { IValidatingReporter } from "../interfaces/IValidatatingReporter";
import { ValidationResult } from "../../contracts/validationresult";
import { ViewDOM } from "../../../viewDOM/abstract/viewdom";
import { findAndFilter } from "../../../extensions/HtmlElementExtensions";

export class BaseViewValidatingReporter extends IValidatingReporter {
    async report(viewDOM: ViewDOM, validatingResult: ValidationResult) {
        const DOM = await viewDOM.DOM();
        var errContainer = findAndFilter(DOM, 'div.validating.error.container');
        if (errContainer.length > 0) {
            errContainer.forEach(el => el.remove());
        }

        const newErrContainer = new HTMLDivElement();
        newErrContainer.classList.add("validating error container");
        findAndFilter(DOM, ".errors").forEach(element => element.appendChild(newErrContainer));

        validatingResult.errors.forEach(x => {
            let p = new HTMLParagraphElement();
            p.innerHTML = x.pure;
            newErrContainer.appendChild(p);
        });
    }
}