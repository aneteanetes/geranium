module geranium.validating.reporter {
    export class JQueryViewValidatingReporter implements reporter.interfaces.IValidatingReporter {
        report(viewDOM: viewDOM.abstract.ViewDOM, validatingResult: validating.contracts.ValidationResult) {
            debugger;
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
}