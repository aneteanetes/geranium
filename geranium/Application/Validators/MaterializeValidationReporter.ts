import IValidatingReporter = geranium.validating.reporter.interfaces.IValidatingReporter;
declare var Materialize: any;
class MaterializeValidationRepoter implements IValidatingReporter {
	report(viewDOM: geranium.viewDOM.abstract.ViewDOM, validatingResult: geranium.validating.contracts.ValidationResult) {
		validatingResult.errors.forEach(x => {
			Materialize.toast(x.message, 1500, 'red');
		});
	}
}