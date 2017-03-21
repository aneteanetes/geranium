namespace geranium.validating.reporter {
    export class NotifyValidatingReporter implements reporter.interfaces.IValidatingReporter {
        report(viewDOM: viewDOM.abstract.ViewDOM, validatingResult: validating.contracts.ValidationResult) {
            validatingResult.errors.forEach(x => {
                console.error('VALLIDATING_ERR [' + x.name + ']:' + x.message);
            });
        }
    }
}