import { IValidatingReporter } from "../interfaces/IValidatatingReporter";
import { ValidationResult } from "../../contracts/validationresult";
import { ViewDOM } from "../../../viewDOM/abstract/viewdom";
import { findAndFilter } from "../../../extensions/HtmlElementExtensions";

export class BaseViewValidatingReporter extends IValidatingReporter {
    report(viewDOM: ViewDOM, validatingResult: ValidationResult) {
        var errContainer = findAndFilter(viewDOM.getViewDOM<HTMLElement>(), 'div.validating.error.container');
        if (errContainer.length > 0) {
            errContainer.forEach(el => el.remove());
        }
        let newErrContainer = new HTMLDivElement();
        newErrContainer.classList.add("validating error container");
        findAndFilter(viewDOM.getViewDOM<HTMLElement>(), ".errors").forEach(element => element.appendChild(newErrContainer));

        validatingResult.errors.forEach(x => {
            let p = new HTMLParagraphElement();
            p.innerHTML = x.pure;
            newErrContainer.appendChild(p);
        });
    }
}