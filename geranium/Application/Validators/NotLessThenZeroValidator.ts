class NotLessThenZeroValidator implements IValidator {
	constructor(prop: string) {
		this.validatedPropertyName = prop;
	}
	validatedPropertyName: string;
    validate(value: number): ValidationResult {
		var result = new ValidationResult();
		result.success = value >= 0;
		if (!result.success)
			result.errors = [
				new Exception('Value must be greater or equals zero!')
			];
		return result;
	}
}