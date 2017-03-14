class RangeValidator implements IValidator {
	constructor(prop: string, min: number, max: number, strict: boolean) {
		this.validatedPropertyName = prop;
		this.min = min;
		this.max = max;
		this.strict = strict;
	}
	private strict: boolean;
	private min: number;
	private max: number;
	validatedPropertyName: string;
	validate(value: number): ValidationResult {
		var result = new ValidationResult();
		result.success = this.strict
			? (value > this.min && value < this.max)
			: (value >= this.min && value <= this.max);
		if (!result.success) {
			result.errors = [];
			if (value < this.min)
				result.errors.push(new Exception('Value must be greater ' + (!this.strict ? 'or equals' : 'then') + ' ' + this.min));
			if (value > this.max)
				result.errors.push(new Exception('Value must be less ' + (!this.strict ? 'or equals' : 'then') + ' ' + this.max));				
		}
		return result;
	}
}