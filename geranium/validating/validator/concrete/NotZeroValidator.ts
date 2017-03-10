module geranium.validating.validator {
    export class NotZeroValidator implements validator.interfaces.IValidator {
        readonly validatedPropertyName: string;
        constructor(propName: string) {
            this.validatedPropertyName = propName;
        }
        validate(value: number): contracts.ValidationResult {
            var result = new contracts.ValidationResult();
            result.success = value >= 0;
            if (!result.success)
                result.errors = [new exceptions.Exception('Value must greater or equals zero!')];
            return result;
        }
    }
}