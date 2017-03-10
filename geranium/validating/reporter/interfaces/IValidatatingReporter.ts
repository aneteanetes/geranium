module geranium.validating.reporter.interfaces {
    export interface IValidatingReporter {
        report(viewDOM: viewDOM.abstract.ViewDOM, validatingResult: validating.contracts.ValidationResult);
    }
}